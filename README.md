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
 
```
Our TODO list:
* Install Koa packages
* Implement router
* Implement middlewares
* Update our development scripts
```

* Install koa packages

```
$ npm i -S koa koa-bodyparser koa-router  
```

* Install type definition packages

```
$ npm i -D @types/koa @types/koa-bodyparser @types/koa-router
```

* Update `server.ts`

```typescript
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

const app    = new Koa();
const router = new Router();
const port   = process.env.PORT || 4000;

router.get('/', ctx => {
  ctx.type = 'html';
  ctx.body = '<h1>Hello World</h1>';
});

app
  .use(bodyParser())
  .use(router.routes())
  .listen(port);

process.stdout.write(`Contacts App listening on port ${port}`);
```

* Check with linter, compile and run

```
$ tslint --project ./tsconfig.json --type-check --fix
$ tsc
$ node server.js
$ open http://localhost:4000
```

* You can update your `tslint.json` if you prefer arrow function without parenthesis in case of one argument.
```json
    "rules": {
      "quotemark": [true, "single", "avoid-escape"],
      "arrow-parens": [true, "ban-single-arg-parens"]
    },
```

* Setup node scripts

Run the following commands in separate terminals and update your `server.ts` content.

```
$ tsc --watch
$ nodemon server.js
```

Update `scripts` in `package.json`.

```json
  "scripts": {
    "clean": "rimraf *.js",
    "lint": "tslint --project ./tsconfig.json --type-check --fix",
    "build": "tsc",
    "watch:build": "npm run clean; npm run build -- --watch",
    "watch:server": "nodemon --watch server.js",
    "start": "npm run build && node server.js"
  },
```  

Now, you can use:

```
$ npm run watch:build
$ npm run watch:server
```

Run them in separate terminals.

### Move our app in `src` folder and add views

