#!/usr/bin/env node 

const {execSync} = require('child_process');

const runCommand = command =>{
    try {
        execSync(`${command}`, {stdio: 'inherit'});
    } catch (error) {
        console.error(`Failed to execute ${command}`, error)
       return false;
    }

    return true 
}


const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/xtareq/ex-ts-start ${repoName}`;
const installDepsCommand = `cd ${repoName} && yarn`

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);

if(!checkedOut)process.exit(-1)

console.log(`Installing dependencies for ${repoName}`)

const installedDeps = runCommand(installDepsCommand)
if(!installedDeps)process.exit(-1)
console.log("")
console.log("Congratulation 👍! You are almost ready to serve. Just complete following steps to serve.")
console.log("")
console.log("")
console.log("cd ${repoName}")
console.log("")
console.log("")
console.log("run cp -r .env.example .env")
console.log("Update .env file like database info, jwt, redis etc.")
console.log("")
console.log(`yarn dev`)
console.log("")
console.log("Thank you.")