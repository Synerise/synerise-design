import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  managerEntries: (entry) => [...entry, join(__dirname, './manager.tsx')],
};
