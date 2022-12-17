

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
    if (data.toString().trim() === '.exit') process.exit();
})