// Shared by playwright.config.js and the fixtures

// Not Vite preview's default 4173, so a running `npm run preview` doesn't block the suite
export const PORT = 4317;

// Built into the e2e bundle, so a VITE_BACKEND_URL set elsewhere can't point tests at a real backend
export const BACKEND_URL = 'http://localhost:8000';

// Separate from dist/, so running the suite never replaces a developer's own build
export const OUT_DIR = 'dist-e2e';
