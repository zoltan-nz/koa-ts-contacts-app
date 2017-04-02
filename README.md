# koa-ts-contacts-app

Building a simple contact management application using Node.js, TypeScript, Koa.js, Handlebars and Webpack.

## Implementation log

### Initialization

* Create github repo
* Add `README.md`
* Add `.editorconfig`
* Add `.gitignore`

### Hello World from TypeScript

```
Our TODO list:

* Install packages
* Playing with `tsc`, `tslint`, `ts-node`
```

* Init `package.json`

```
$ npm init
```

* Install TypeScript packages:

```
$ npm i -D typescript tslint ts-node
```

* Install utility packages:

```
$ npm i -D nodemon rimraf
```

* Install packages globally:

```
$ npm i -g typescript tslint ts-node nodemon 
```

* Install type declaration files

```
$ npm i -D @types/node
``` 

* TypeScript configuration

```
$ tsc --init
$ tslint --init    
```

* Try `tsc` and `tslint`:

```
$ tsc
$ tslint --project ./tsconfig.json
```

`tsc` returns with an error message `error TS18003: No inputs were found...`, because there is nothing to compile.

* Create our first `server.ts`

```
$ touch server.ts
```

```typescript
// ./server.ts
const message: string = 'hello world';

process.stdout.write(message);
```

* Run compiler

```
$ tsc
```

* It generates a new file: `server.js`

```javascript
"use strict";
var message = 'hello world';
process.stdout.write(message);
```

Notice that the compiler is generated a file with `ES5` syntax, we can see a `var` statement there.

* Run the app

```
$ node server.js
```

* Play with type-checking

Try to assign an integer to `message` variable and run `tslint` and `tsc`. Check the error messages.

``` 
$ tslint --project ./tsconfig.json --type-check
$ tsc
``` 

* Change `target` in `tsconfig.json`

Open `tsconfig.json` and change `"target"` property to `"ES2015"`. Run `tsc`. Check the generated file uses `const` instead of `var`.

* Single quote vs double quote

In TypeScript the default is double quote. You can run your `tslint` with `--fix` param.

```
$ slint --project ./tsconfig.json --type-check --fix
```

Or update `rules` in `./tslint.json`.

```json
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {
      "quotemark": [true, "single", "avoid-escape"]
    },
    "rulesDirectory": []
}
```

* Try following commands, what do you see?

```
$ node server.ts
$ ts-node server.ts
```

`ts-node` can run TypeScript on the fly, great for development, don't use it in production.

Links:

* [TypeScript](http://www.typescriptlang.org/)
* [tslint](https://palantir.github.io/tslint/)
* [ts-node](https://github.com/TypeStrong/ts-node)
* [typescript-book](https://basarat.gitbooks.io/typescript/content/docs/getting-started.html)

### Hello World from browser
 
