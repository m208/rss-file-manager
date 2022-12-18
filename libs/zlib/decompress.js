import { store } from '../../index.js';
import { join } from 'path';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from "fs";

export const decompress = async (subPath, dest) => {
    if (!subPath || !dest) return;

    const filePath = join(store.workingDir, subPath);
    const destPath = join(store.workingDir, dest);

    const zipStream = createBrotliDecompress();

    try {
        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(destPath);

        await pipeline(readStream, zipStream, writeStream);

    } catch (err) {
        console.log('Operation failed', err);
    }

}