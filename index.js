const commands = {
    'up' : temp,
    'cd' : temp,
    'ls' : temp,
    'cat' : temp,
    'add' : temp,
    'rn' : temp,
    'cp' : temp,
    'mv' : temp,
    'rm' : temp,
    'os' : temp,
    'hash' : temp,
    'compress' : temp,
    'decompress' : temp,
}

function temp(...args) {
    console.log(args);
}

let userName = 
    (process.argv.length > 2 && process.argv[2].includes('--username='))
    ? process.argv[2].replace('--username=', '')
    : 'Anonymus';

const homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

console.log(`Welcome to the File Manager, ${userName}!`);
console.log(`You are currently in ${homeDir}`);

process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
});


process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    const command = input.split(' ')[0];

    if (command === '.exit') process.exit();

    if (Object.keys(commands).includes(command)){
        const args = input.split(' ').slice(1);
        commands[command](...args);
    }
})