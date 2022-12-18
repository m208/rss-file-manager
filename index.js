import { os, getHomeDir } from './libs/os.js';
import { listFiles, setWorkingDir, goUpper } from './libs/nwd.js';
import { calculateHash } from './libs/hash.js';
import { compress } from './libs/zlib/compress.js';
import { decompress } from './libs/zlib/decompress.js';
import { 
    readFile, 
    addFile, 
    renameFile, 
    copyFile, 
    moveFile, 
    removeFile 
} from './libs/fs.js';

const commands = {
    'up' : goUpper,
    'cd' : setWorkingDir,
    'ls' : listFiles,
    'cat' : readFile,
    'add' : addFile,
    'rn' : renameFile,
    'cp' : copyFile,
    'mv' : moveFile,
    'rm' : removeFile,
    'os' : os,
    'hash' : calculateHash,
    'compress' : compress,
    'decompress' : decompress,
}

let userName = 
    (process.argv.length > 2 && process.argv[2].includes('--username='))
    ? process.argv[2].replace('--username=', '')
    : 'Anonymus';

export const store = {
    workingDir: getHomeDir(),
};

console.log(`Welcome to the File Manager, ${userName}!`);
console.log(`You are currently in ${store.workingDir}`);

const closeApp = () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit();
}

process.on('SIGINT', () => {
    closeApp();
});

const parseArgs = (input) => {

    const dquotes = input.match(/\".+?\"/g);
    if (!dquotes) return input.split(' ').filter(el => el !== '');
    if (dquotes.length >= 2) return dquotes.map(el=>el.replaceAll('"', ''));

    const rest = input.replaceAll(dquotes[0], '').split(' ').filter(el => el !== '');

    return (input.indexOf('"') === 0) 
            ? [dquotes[0].replaceAll('"', ''), ...rest] 
            : [...rest, dquotes[0].replaceAll('"', '')];
}

process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    const command = input.split(' ')[0];

    if (command === '.exit') closeApp();

    if (Object.keys(commands).includes(command)){
        const args = parseArgs(input.slice(command.length).trim());
        commands[command](...args);
    }
})
