/**
 * CastingManager.js
 * Manages Three.js scene and Cannon.js physics for 3D coin casting.
 */

import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class CastingManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.coins = [];
        this.isCasting = false;
        this.onResult = null; // Callback for result

        this.initThree();
        this.initPhysics();
        this.createEnvironment();
        this.createCoins();
        this.animate();
    }

    initThree() {
        this.scene = new THREE.Scene();

        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.set(0, 15, 12);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        // Lighting for premium look
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1.5);
        spotLight.position.set(5, 20, 10);
        spotLight.angle = Math.PI / 4;
        spotLight.penumbra = 0.5;
        spotLight.decay = 2;
        spotLight.distance = 200;
        spotLight.castShadow = true;
        this.scene.add(spotLight);

        // Add a back-light to catch edges
        const backLight = new THREE.PointLight(0xffd700, 0.8);
        backLight.position.set(-5, 5, -5);
        this.scene.add(backLight);

        window.addEventListener('resize', () => this.onResize());
    }

    initPhysics() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -25, 0); // Slightly stronger gravity for better containment
        this.world.allowSleep = true;
    }

    createEnvironment() {
        // Transparent physics ground
        const groundShape = new CANNON.Plane();
        const groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.world.addBody(groundBody);

        // Invisible Walls for containment
        const wallShape = new CANNON.Plane();
        const wallMaterial = new CANNON.Material();

        // Back Wall
        const wallBack = new CANNON.Body({ mass: 0, material: wallMaterial });
        wallBack.addShape(wallShape);
        wallBack.position.set(0, 0, -8);
        this.world.addBody(wallBack);

        // Front Wall
        const wallFront = new CANNON.Body({ mass: 0, material: wallMaterial });
        wallFront.addShape(wallShape);
        wallFront.quaternion.setFromEuler(0, Math.PI, 0);
        wallFront.position.set(0, 0, 8);
        this.world.addBody(wallFront);

        // Left Wall
        const wallLeft = new CANNON.Body({ mass: 0, material: wallMaterial });
        wallLeft.addShape(wallShape);
        wallLeft.quaternion.setFromEuler(0, Math.PI / 2, 0);
        wallLeft.position.set(-10, 0, 0);
        this.world.addBody(wallLeft);

        // Right Wall
        const wallRight = new CANNON.Body({ mass: 0, material: wallMaterial });
        wallRight.addShape(wallShape);
        wallRight.quaternion.setFromEuler(0, -Math.PI / 2, 0);
        wallRight.position.set(10, 0, 0);
        this.world.addBody(wallRight);

        // Visual floor (decorative)
        const floorGeo = new THREE.PlaneGeometry(20, 20);
        const floorMat = new THREE.MeshStandardMaterial({
            color: 0x1a1b26,
            roughness: 0.8,
            metalness: 0.2
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
    }

    createCoins() {
        const loader = new THREE.TextureLoader();
        const frontTex = loader.load('/assets/coins/coin_front.png');
        const backTex = loader.load('/assets/coins/coin_back.png');
        const edgeTex = loader.load('/assets/coins/coin_edge.png');
        edgeTex.wrapS = THREE.RepeatWrapping;
        edgeTex.repeat.set(8, 1); // Tile horizontally for the edge

        // Thinner geometry for more realistic feel
        const coinGeometry = new THREE.CylinderGeometry(0.85, 0.85, 0.1, 64);

        // Materials that match the weathered bronze look
        const sideMat = new THREE.MeshStandardMaterial({
            color: 0x3d2e1f, // Darker, aged bronze to blend with the textures
            metalness: 0.5,
            roughness: 0.7,
            emissive: 0x1a1510,
            emissiveIntensity: 0.02
        });
        const faceMatYang = new THREE.MeshStandardMaterial({
            map: backTex,
            metalness: 0.6,
            roughness: 0.45,
            bumpMap: backTex,
            bumpScale: 0.02
        });
        const faceMatYin = new THREE.MeshStandardMaterial({
            map: frontTex,
            metalness: 0.6,
            roughness: 0.45,
            bumpMap: frontTex,
            bumpScale: 0.02
        });

        const materials = [sideMat, faceMatYang, faceMatYin];

        for (let i = 0; i < 3; i++) {
            const coinMesh = new THREE.Mesh(coinGeometry, materials);
            coinMesh.castShadow = true;
            this.scene.add(coinMesh);

            // Refined physics shape (matching thinner geometry)
            // height in CANNON Cylinder is total height, same as THREE
            const coinShape = new CANNON.Cylinder(0.85, 0.85, 0.1, 32);
            const coinBody = new CANNON.Body({
                mass: 1.2,
                shape: coinShape,
                material: new CANNON.Material({ friction: 0.1, restitution: 0.6 })
            });

            // Initial spread - slightly lower to stay in view
            coinBody.position.set((i - 1) * 2, 4, 0);
            this.world.addBody(coinBody);

            this.coins.push({ mesh: coinMesh, body: coinBody });
        }
    }

    cast() {
        if (this.isCasting) return;
        this.isCasting = true;

        this.coins.forEach((coin, idx) => {
            coin.body.wakeUp();
            coin.body.position.set((idx - 1) * 2, 8 + Math.random() * 2, 0);

            // Random spin and force - reduced Y impulse to prevent flying out of view
            const forceX = (Math.random() - 0.5) * 4;
            const forceZ = (Math.random() - 0.5) * 4;
            coin.body.applyImpulse(
                new CANNON.Vec3(forceX, 8, forceZ),
                new CANNON.Vec3(Math.random(), Math.random(), Math.random())
            );

            coin.body.angularVelocity.set(
                Math.random() * 20,
                Math.random() * 20,
                Math.random() * 20
            );
        });

        this.checkResults();
    }

    checkResults() {
        let stableCount = 0;

        // UX Improvement: 3-second maximum wait time
        const maxWaitTimeout = setTimeout(() => {
            if (this.isCasting) {
                console.log("UX: Forcing result after 3s timeout");
                clearInterval(checkInterval);
                this.finishCasting();
            }
        }, 3000);

        const checkInterval = setInterval(() => {
            let allStable = true;
            this.coins.forEach(coin => {
                // Check if velocity is low enough to be "mostly" stable
                if (coin.body.velocity.length() > 0.2 || coin.body.angularVelocity.length() > 0.2) {
                    allStable = false;
                }
            });

            if (allStable) {
                stableCount++;
                if (stableCount > 5) { // Reduced from 10 to speed up natural stop
                    clearInterval(checkInterval);
                    clearTimeout(maxWaitTimeout);
                    this.finishCasting();
                }
            } else {
                stableCount = 0;
            }
        }, 100);
    }

    finishCasting() {
        if (!this.isCasting) return;

        const results = this.coins.map(coin => {
            // Update mesh from body one last time just in case
            coin.mesh.position.copy(coin.body.position);
            coin.mesh.quaternion.copy(coin.body.quaternion);

            // Determine result based on up vector
            const up = new THREE.Vector3(0, 1, 0);
            up.applyQuaternion(coin.mesh.quaternion);

            // In Three.js, Cylinder up is Y. If Y > 0, it's face up (Yang=3).
            return up.y > 0 ? 3 : 2;
        });

        const sum = results.reduce((a, b) => a + b, 0);
        this.isCasting = false;
        if (this.onResult) this.onResult(sum);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.world.fixedStep();

        this.coins.forEach(coin => {
            coin.mesh.position.copy(coin.body.position);
            coin.mesh.quaternion.copy(coin.body.quaternion);
        });

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}
