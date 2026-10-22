import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.resolve(import.meta.dirname, '../public/yi_data_enhanced');

/** Loads the 64 hexagram JSONs (read-only), indexed by id - 1. */
export function loadLibrary() {
  return Array.from({ length: 64 }, (_, i) =>
    JSON.parse(fs.readFileSync(path.join(DATA_DIR, `hexagram_${i + 1}.json`), 'utf8'))
  );
}
