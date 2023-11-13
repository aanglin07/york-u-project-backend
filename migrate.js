import fs from 'fs/promises'
import path from 'path'
import { db } from "./index.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrate = async () => {
    const migrations = await fs.readdir(path.join(__dirname, 'migrations'));

    for (const migration of migrations) {
        const fileContent = await fs.readFile(path.join(__dirname, 'migrations', migration), 'utf-8');
        await db.query(fileContent);
    }
}

migrate().then(() => {
    console.log('Migrations done!')
    process.exit(0)
}).catch(err => {
    console.error(err)
    process.exit(1)
})