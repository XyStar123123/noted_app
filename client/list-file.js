import fs from 'fs';
import path from 'path';

function listFiles(dir, indent = '') {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        // Ignore node_modules and hidden folders like .git
        if (file === 'node_modules' || file.startsWith('.')) return;

        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            console.log(`${indent}📁 ${file}/`);
            listFiles(filePath, indent + '  ');
        } else {
            console.log(`${indent}📄 ${file}`);
        }
    });
}

console.log("--- Project Structure ---");
listFiles(process.cwd());
console.log("-------------------------");