import { store } from '../../index.js';
import { join } from 'path';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from "fs";

export const compress = async (subPath, dest) => {
    if (!subPath || !dest) return;

    const filePath = join(store.workingDir, subPath);
    const destPath = join(store.workingDir, dest);

    const zipStream = createBrotliCompress();

    try {
        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(destPath);

        await pipeline(readStream, zipStream, writeStream);

    } catch (err) {
        console.log('Operation failed', err);
    }

}