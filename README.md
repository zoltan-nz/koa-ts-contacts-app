# koa-ts-contacts-app

Building a simple contact management application using Node.js, TypeScript, Koa.js, Handlebars.

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

import bodyParser = require('koa-bodyparser');

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

Links:
* [Koa.js](https://github.com/koajs/koa)
* [koa-router](https://github.com/alexmingoia/koa-router)


### Add handlebar templates

```
Our TODO list:
* Install koa-hbs package
* Create views folder and add templates
* Setup handlebar middleware
* Render our template
* Learning about Node.js debugging
```

Install `koa-hbs` packages for html rendering.

```
$ npm i -S koa-hbs@next
$ npm i -D @types/koa-hbs
```

Create templates:
```
$ mkdir -p views/layouts views/pages
$ touch views/layouts/default.hbs
$ touch views/pages/home.hbs
```

`./views/layouts/default.hbs`:

```handlebars
<html>
<head>
  <title>{{#if title}}{{title}}{{else}}Contacts App{{/if}}</title>
</head>
<body>
{{{body}}}
</body>
</html>
```

`./views/pages/home.hbs`:

```handlebars
<h1>{{title}}</h1>
```

Add template management to `server.ts`:

```typescript
import hbs = require('koa-hbs');
```

Setup a few constants:

```typescript
const VIEWS      = path.resolve(__dirname, 'views');
const LAYOUTS        = path.resolve(VIEWS, 'layouts');
const DEFAULT_LAYOUT = 'default';
```

(Import `path`.)

Add `hbs.middleware`:

```typescript
  .use(hbs.middleware({
    defaultLayout: DEFAULT_LAYOUT,
    layoutsPath:   LAYOUTS,
    viewPath:      VIEWS,
  }))
```

Update `router` to render our page:

```typescript
router.get('/', async ctx => {
  // ctx.state = { title: 'title from state' };
  await ctx.render('pages/home', { title: 'Home Page' });
});
```

Please note, we use `async/await` syntax for managing Promise.

A little about debugging:

```
$ nodemon --inspect ./server.js
```

Setup source map: uncomment `sourceMap` option in `tsconfig.json`. 

Links:
* [koa-hbs](https://github.com/koajs/koa-hbs/tree/1.0.0-alpha.1)
* [handlebars](http://handlebarsjs.com/)

### Update directory structure 

**Directory structure:**

* `/dist` for our built and transpiled files, a few examples:

  * `/dist/server.js`
  * `/dist/views`
  * `/dist/routes`
  * `/dist/models`
  * `/dist/controllers`
  * `/dist/assets/styles`
  * `/dist/assets/images`
  * `/dist/assets/fonts`

We never write directly to `dist` folder, all the files will be generated by a transpiler tool.

* `/src` for TypeScript files
* `/src/views` for Views
* `/src/assets/styles` for Sass css files

Let's move our TypeScript file to `src` folder.

* [ ] Create folder and move file
* [ ] Update `tsconfig.json`
* [ ] Update `package.json` scripts

```
$ mkdir ./src
$ mv ./server.ts ./src
```

Setup `outDir` field and add `include` array in `tsconfig.json`:

```
"outDir": "./dist",

include: [
  './src/**/*
]
```

Update `clean` task in our `package.json`:

```
"clean": "rimraf ./dist",
```

Update `package.json` tasks:

```
"clean": "rimraf ./dist",
"watch:server": "nodemon --watch ./dist/server.js",
"start": "npm run build && node ./dist/server.js"
```

If we would try `npm start` now, our server would fail, because we haven't moved our `views` folder in `dist` folder. (You can move it manually now, but we will setup `gulp` to do it for us automatically.)

### Setup assets management - add gulp, copy views, manage sass, and install bootstrap

TODO:
* [ ] Add gulp
* [ ] Add sass
* [ ] Add bootstrap

#### Add gulp

Let's use `Gulp 4`: https://github.com/gulpjs/gulp/tree/4.0

```
$ npm i -g gulp-cli
$ npm i -D gulpjs/gulp#4.0
```

Create `gulpfile.ts`:

```
$ touch gulpfile.ts
```

Add `clean` task to `gulpfile`.

Install `del` package and types.
```
$ npm i -D @types/del del
```

```
import del = require('del');

const DIST_FOLDER = './dist';

const clean = () => del([DIST_FOLDER]);
export { clean };
```

Try it out:

```
$ gulp clean
```

You can update your script in `package.json`.

```
"clean": "gulp clean"
```

#### Copy views

Let's implement a task which would copy our `views` folder in `dist`

```
import del = require('del');
import * as gulp from 'gulp';

const DIST_FOLDER = './dist';

const paths = {
  views: {
    src:  './src/views/**/*',
    dest: `${DIST_FOLDER}/views`
  }
};

const clean = () => del([DIST_FOLDER]);

const views = () => {
  return gulp.src(paths.views.src)
  .pipe(
    gulp.dest(paths.views.dest)
  );
};

export { clean, views };
```

#### Manage sass

'/styles' for our sass source 

`/styles/app.scss` will be our main entry style file

Strategy:
1. Editing styles in `app.scss`
2. Sass compiler compile and copy to `/dist/styles`

#### Add bootstrap

https://v4-alpha.getbootstrap.com/



Links:

* https://github.com/Microsoft/dts-gen
* https://github.com/Microsoft/TypeScript-Node-Starter
