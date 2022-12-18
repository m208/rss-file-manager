import { EOL, cpus, userInfo, arch } from 'os';

export const os = (option) => {

    const osCommands = {
        '--EOL' : getEol,
        '--cpus' : getCpus,
        '--homedir' : getHomeDir,
        '--username' : getUserName,
        '--architecture' : getArch,
    }

    if (Object.keys(osCommands).includes(option)){
        console.log(osCommands[option]());
    }
}

const getEol = () => JSON.stringify(EOL);

const getCpus = () => {
    const cpuInfo = cpus().map((el, i) => {
        return `${i+1}: ${el.model.trim()}, ${el.speed/1000} GHz`;
    });
    return `Amount of CPUs: ${cpuInfo.length}\n${cpuInfo.join('\n')}`;
}

export const getHomeDir = () => userInfo().homedir;

const getUserName = () => userInfo().username;

const getArch = () => arch();
