/**
 * EnvService.js
 * Utility to read .env file from the frontend in a local development environment.
 */
export class EnvService {
    static cache = null;

    static async get(key) {
        if (this.cache) return this.cache[key];

        try {
            const response = await fetch('/.env');
            if (!response.ok) {
                console.error(`EnvService: Failed to fetch .env (Status: ${response.status}). Many static servers block dot-files.`);
                return null;
            }
            
            const text = await response.text();
            this.cache = {};
            
            text.split('\n').forEach(line => {
                const [k, ...v] = line.split('=');
                if (k && v) {
                    this.cache[k.trim()] = v.join('=').trim();
                }
            });
            
            return this.cache[key];
        } catch (error) {
            console.warn("EnvService: Failed to load .env, ensure it is served at root.");
            return null;
        }
    }
}
