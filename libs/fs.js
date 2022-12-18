import { store } from '../index.js';
import { join } from 'path';
import { stat, rename, unlink } from 'node:fs/promises';
import { createReadStream, createWriteStream, open } from "fs";
import { pipeline } from 'stream/promises';


export const readFile = async (subPath) => {
    const filePath = join(store.workingDir, subPath);

    try {
        await stat(filePath);

        const stream = createReadStream(filePath, 'utf-8');
        stream.on('data', (data) => console.log(data));
    }
    catch (err) {
        console.log('Operation failed');
    }
};

export const addFile = async (fileName) => {
    open(join(store.workingDir, fileName), 'wx', (err, file) => {
        if (err) {
            console.log('Operation failed');
        }
        // else console.log(`File ${fileName} is created`)
    })
};

export const renameFile = async (subPath, newFileName) => {
    if (!subPath || !newFileName) return;

    const oldPath = join(store.workingDir, subPath);
    const newPath = join(store.workingDir, newFileName);

    try {
        const stats = await stat(oldPath);
        rename(oldPath, newPath);
        // console.log('File renamed');
    } catch (err) {
        console.log('Operation failed');
    }

};

export const copyFile = async (subPath, destDir) => {
    if (!subPath || !destDir) return;

    const filePath = join(store.workingDir, subPath);
    const destPath = join(store.workingDir, destDir, subPath);

    try {
        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(destPath);
        
        await pipeline(readStream, writeStream);
    } catch (err) {
        console.log('Operation failed');
    }

};

export const moveFile = async (subPath, destDir) => {
    if (!subPath || !destDir) return;
    const filePath = join(store.workingDir, subPath);

    try {
        await copyFile(subPath, destDir);
        await unlink(filePath);
    } catch (err) {
        console.log('Operation failed');
    }
}

export const removeFile = async (subPath) => {
    if (!subPath) return;
    const filePath = join(store.workingDir, subPath);

    try {
        await unlink(filePath);
    } catch (err) {
        console.log('Operation failed');
    }
}