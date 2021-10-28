# Express-Typescript Starter
Ex-ts is a basic typescript based express application generator with basic authentication.Just follow the 
installation process and your authentication part is almost 80% done by default.

## Installation

``` sh
    npx ex-ts-start {project}
    cd {project}
```

Now it's time to copy and update .env

``` sh
    cp -r .env.example .env 
```
Open project in your favorite code editor. if you using Visual studio code you can just run: 
``` sh
    code .
```
Update .env file for database configuration and others.

For development run following command

``` sh
    yarn dev
```
For Production run following in your terminal
``` sh
    yarn build
    yarn start
```
### Thank you