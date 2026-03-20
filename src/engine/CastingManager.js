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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(5, 20, 10);
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        this.scene.add(spotLight);

        window.addEventListener('resize', () => this.onResize());
    }

    initPhysics() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -20, 0); // Stronger gravity for tactile feel
        this.world.allowSleep = true;
    }

    createEnvironment() {
        // Transparent physics ground
        const groundShape = new CANNON.Plane();
        const groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.world.addBody(groundBody);

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
        const coinGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.2, 32);
        
        // Materials for Yang (3) and Yin (2) sides
        const sideMat = new THREE.MeshStandardMaterial({ color: 0xaa8a2b });
        const faceMatYang = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.8 }); // Gold
        const faceMatYin = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, roughness: 0.3, metalness: 0.8 }); // Silver-ish
        
        const materials = [sideMat, faceMatYang, faceMatYin];

        for (let i = 0; i < 3; i++) {
            const coinMesh = new THREE.Mesh(coinGeometry, materials);
            coinMesh.castShadow = true;
            this.scene.add(coinMesh);

            const coinShape = new CANNON.Cylinder(1.2, 1.2, 0.2, 32);
            const coinBody = new CANNON.Body({
                mass: 1,
                shape: coinShape,
                material: new CANNON.Material({ friction: 0.3, restitution: 0.5 })
            });

            // Initial spread
            coinBody.position.set((i - 1) * 3, 5, 0);
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
            
            // Random spin and force
            const forceX = (Math.random() - 0.5) * 5;
            const forceZ = (Math.random() - 0.5) * 5;
            coin.body.applyImpulse(
                new CANNON.Vec3(forceX, 10, forceZ),
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
        const checkInterval = setInterval(() => {
            let allStable = true;
            this.coins.forEach(coin => {
                if (coin.body.velocity.length() > 0.1 || coin.body.angularVelocity.length() > 0.1) {
                    allStable = false;
                }
            });

            if (allStable) {
                stableCount++;
                if (stableCount > 10) { // Confirmed stability
                    clearInterval(checkInterval);
                    this.finishCasting();
                }
            } else {
                stableCount = 0;
            }
        }, 100);
    }

    finishCasting() {
        const results = this.coins.map(coin => {
            // Determine result based on up vector
            const up = new THREE.Vector3(0, 1, 0);
            up.applyQuaternion(coin.mesh.quaternion);
            return up.y > 0 ? 3 : 2; // 3 for Yang, 2 for Yin
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
