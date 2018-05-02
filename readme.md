# Basic Stateless Starter :|

@HyperSprite/basic-stateless-starter is a Basic Stateless Starter repo to help create, test, and publish stateless react components to npm.

Sample readme.md
````md
# Rename Me

Some nice one line description

## Usage

### Install
```npm install --save @hypersprite/rename-me```

### Import
```import RenameMe from '@hypersprite/rename-me';```

### Usage
```js
<RenameMe />
```

### API

#### Receives Props

| prop name | type | values | description |
| --------- | ---- | ------ | ----------- |
|  |  |  |   |
|  |  |  |   |
|  |  |  |   |

#### New Passed Props

| prop name | type | values | description |
| --------- | ---- | ------ | ----------- |
|  |  |  |   |
|  |  |  |   |
|  |  |  |   |
|  |  |  |   |


### Scripts

use `npm run <script>`

* `lint` - runs linter
* `test` - runs test
* `test:dev` - runs test in watch mode
* `build` - runs build
* `build:dev` - runs build in watch mode

`npm version <major | minor | patch>`

````



## Basic Stateless Starter Kit

This is a component builder kit to build and test isolated React and plain ES6 components (for pain ES6, remove React dependencies before publishing).

### Workflow

* Build the component in isolation with tests.
* Use `npm link` to add the isolated component to node_modules of a working dev environment. It could be a vanilla Create React App.
* Work on style using the `npm run build:watch` in one terminal and Create React App's `npm run start` in another and the the component will automatically updated in the browser.
* Deploy using `npm publish`
* Iterate and deploy using `npm version`

### Includes

* Testing includes Jest testing and coverage.
* Linting provided by ESlint with AirBnB presets with some modifications, see the `eslint` and `eslintignore` keys in `package.json`.
* Modern JavaScript and JSX via babel, see `.babelrc` file.
* Git precommit hooks to run npm scripts before commit, see `husky` key in `package.json`.

### Setup

> I am using bash on linux, I assume these instructions work on Mac, sorry Windows, you're on your own.

```bash
git clone https://github.com/HyperSprite/basic-stateless-starter.git name-of-component
cd name-of-component
rm -rf .git && git init
npm install
```
Use `npx hs-utils --package rename --old basic-stateless-starter --new name-of-component` to replace the old names in the package.json file.

Use `npx hs-utils --package rename --old HyperSprite --new Your-GitHub-Name` to replace my user name with yours in the package.json file.

Work through the `renameMe` in src/basic-stateless to something relevant and do the first commit.

When you are ready, clean up this readme.md by removing all of this and updating it to use the template at the top. 

### Using `npm link` to add packages to local app for development

> This will not work if you need to run sudo to to install npm modules, [see this article here](see this http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears) if you need help fixing that.

Note that link symlinks the whole module, src and all so if you are doing anything hacky whacky, your local results may not match your published results. After linking, you can drill down into node_modules and take a look.

A bit about naming. NPM will install the package based on the `name` key in the package.json file regardless of the folder it lives in.

Open package.json and check the `name`, in this case:
  "name": "@hypersprite/basic-stateless-starter",

Assuming you have a flat folder structure e.g.:

 * Documents/
   * code/
     * your-working-app/
     * basic-stateless/

From inside `your-working-app` run the following command:
```bash
npm link ../basic-stateless
```

If you look in node_modules, you will now see a directory that matches the name, e.g.

* @hypersprite
   * basic-stateless-starter

> One nice thing about scoped npm module names is that you don't have to worry about name collisions with modules outside of your own scope. Not that I would recommend creating a scoped `lodash` or 'react' but you could.  

You can use your local version inside your app as if it was a published module
```js
import rename-me from '@hypersprite/basic-stateless';
// or
const rename-me = require('@hypersprite/basic-stateless');

```

#### Things to remember about npm link that are most likely to cause issues.

* Link will overwrite real packages of the same name.
* Linked modules live in your NPM global and act a lot like a global mostly.
* Make sure to remember to run `npm run build` after editing your source or continue running `npm run build:dev`, or the `dst` folder will be out of date.
* If you are running `npm run build:dev`, keep an eye on the output, if you have a failed build, your dst will not be updated.
* If you run npm `install` or `update` on your working app and you still need your link, you will need to rerun the link command. Here's an example of a script you could use to link multiple local packages after an install.

package.json
```json
"scripts": {
  "localmodules": "npm link ../basic-stateless ../some-other-local-project"
}
```

## Testing

Testing provided by Jest, Enzyme and coverage report by Istanbul

* ```npm test``` Runs all tests `/src` with `*.test.*` in the name.
* ```npm run test:dev``` Same but uses watch mode.

## Versions and Publishing to NPM

This setup includes a package called `husky` that will run npm scripts using a git precommit hook. Make sure you `git init` the project before running npm install or the hooks will not be availible.

Publishing a package

### Add+Commit, Version

> The branch must be clean to version and publish

* Add
* Commit, which will:
 * Run linting and tests with pre-commit hooks.

```bash
git commit -am 'some totally useful comment'
```

Next, we need to Version:


#### Initial Publish:
```bash
// manually build your dst
npm run build
// publish your module
// --access public if this is a scoped module and you want it public
// By default this is private, private requires a paid npm subscription
npm publish --access public
// Pick option
npm version <major | minor | patch>
```

Version will:
* Rerun linting and tests
* Updates the package.json version number based on Major, Minor and Patch
* Git add package.json using the version number as the commit message
* Push the changes to Github
* Transpile the JSX to ES5 with babel into the dst/ directory
* Publish to npm
* Delete the dst directory

For subsequent publishing the workflow ends up"
```bash
git add .
git commit -m 'something totally meaningful'
git version
```
