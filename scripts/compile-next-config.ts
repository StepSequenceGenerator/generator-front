// scripts/compile-next-config.ts
import fs from 'fs';
import path from 'path';
import config from '../next.config';

const file = `const config = ${JSON.stringify(config, null, 2)};\n\nmodule.exports = config;\n`;

fs.writeFileSync(path.resolve(__dirname, '../next.config.js'), file);
