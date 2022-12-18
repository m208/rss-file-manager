import { store } from '../index.js';
import { join } from 'path';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

export const calculateHash = async (subPath) => {
    if (!subPath) return;
    
    const filePath = join(store.workingDir, subPath);

    const hash = createHash('sha256');
    const readStream = createReadStream(filePath);
    
    readStream.pipe(hash).setEncoding('hex').pipe(process.stdout);

    readStream.on ('error', () => {
        console.log('Operation failed');
    })
    readStream.on ('end', () => {
        console.log('');
    })

};