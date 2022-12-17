import { store } from '../index.js';
import { join, isAbsolute, resolve } from 'path';
import { readdir, stat, access, constants  } from 'node:fs/promises';


export const listFiles = async () => {
  try {
    const files = await readdir(store.workingDir);
    const content = [];

    for (const file of files) {
        const filePath = join(store.workingDir, file);
        try {
            const stats = await stat(filePath);
            content.push({
                Name: file,
                Type: stats.isDirectory() ? 'directory' : 'file',
        });
        } catch (err) {
            // console.log('Operation failed', err);
        }
    }

    content.sort((a, b) => a.Name.localeCompare(b.Name));
    content.sort((a, b) => a.Type.localeCompare(b.Type));

    console.table(content);

  } catch (err) {
    console.log('Operation failed', err);
  }
};

export const setWorkingDir = async (path) => {
    if (!path) return;

    if (isAbsolute(path)) {
        store.workingDir = path;
        messageCurrentDir();
    }
    else {
        try {
            await access(join(store.workingDir, path), constants.R_OK | constants.W_OK);
                store.workingDir = join(store.workingDir, path);
                messageCurrentDir();
            } catch (err) {
                console.error('Operation failed', ' no such file or directory');
            }
        }
}

export const goUpper = async () => {
    await setWorkingDir('..');
}

export const messageCurrentDir = () => {
    console.log(`You are currently in ${store.workingDir}`);
}
