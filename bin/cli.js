#!/usr/bin/env node 

const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const runCommand = command =>{
    try {
        execSync(`${command}`, {stdio: 'inherit'});
    } catch (error) {
        console.error(`Failed to execute ${command}`, error)
       return false;
    }

    return true 
}

const jwtKeyGen = ()=>{
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    let hs=crypto.createHash('sha1').update(current_date + random).digest('hex');
    return hs
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/xtareq/ex-ts-start ${repoName}`;
const installDepsCommand = `cd ${repoName} && yarn`
const copyEnvCommand = `cd ${repoName} && cp -r .env.example .env`

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);

if(!checkedOut)process.exit(-1)

console.log(`Installing dependencies for ${repoName}`)
const installedDeps = runCommand(installDepsCommand)
if(!installedDeps)process.exit(-1)

console.log(`Copy .env in ${repoName}`)
const copyEnv = runCommand(copyEnvCommand)
if(!copyEnv)process.exit(-1)

const updateEnv = (repoName)=>{
    let content = fs.readFileSync(path.join(process.cwd(),`${repoName}/.env`)).toString()
    content = content.replace("JWT_KEY=",`JWT_KEY=${jwtKeyGen()}`)
    fs.writeFileSync(path.join(process.cwd(),`${repoName}/.env`))
    console.log(`Update .env JWT KEY`)
    return;
}
updateEnv(repoName)






console.log("")
console.log("Congratulation 👍! You are almost ready to serve. Just complete following steps to serve.")
console.log("")
console.log(`cd ${repoName}`)
console.log("")
console.log("run cp -r .env.example .env")
console.log("Update .env file like database info, jwt, redis etc.")
console.log("")
console.log(`yarn dev`)
console.log("")
console.log("Thank you.")