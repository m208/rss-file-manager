import { os, getHomeDir } from './libs/os.js';
import { listFiles, setWorkingDir, goUpper } from './libs/nwd.js';

const commands = {
    'up' : goUpper,
    'cd' : setWorkingDir,
    'ls' : listFiles,
    'cat' : temp,
    'add' : temp,
    'rn' : temp,
    'cp' : temp,
    'mv' : temp,
    'rm' : temp,
    'os' : os,
    'hash' : temp,
    'compress' : temp,
    'decompress' : temp,
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

process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
});


process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    const command = input.split(' ')[0];

    if (command === '.exit') process.exit();

    if (Object.keys(commands).includes(command)){
        const args = input.split(' ').slice(1).filter(el => el !== '');
        commands[command](...args);
    }
})

function temp(...args) {
    console.log(args);
}