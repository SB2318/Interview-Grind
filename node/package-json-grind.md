# Deep Dive: `package.json` in Node.js

`package.json` is the **manifest/configuration file of a Node.js project**. It describes the project and tells npm/yarn/pnpm things such as:

* What the project is called
* Which commands can be run
* Which Node.js version is supported
* Which packages are required
* Which packages are only needed during development
* How the package is published

Example:

```json
{
  "name": "my-server",
  "version": "1.0.0",
  "description": "A Node.js backend service",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "engines": {
    "node": ">=20"
  },
  "dependencies": {
    "express": "^5.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "jest": "^30.0.0"
  }
}
```

---

# 1. `name`

```json
{
  "name": "my-server"
}
```

The `name` is the **identity of the package/project**.

For a public npm package:

```json
{
  "name": "ultimatehealth-backend"
}
```

Someone could install it using:

```bash
npm install ultimatehealth-backend
```

## Rules

Package names generally:

* Should be lowercase
* Cannot contain spaces
* Should be unique on npm if published as a public package
* Can use hyphens

Good:

```text
ultimatehealth-backend
my-api
user-service
```

Bad:

```text
Ultimate Health
My Backend
```

## Scoped packages

You can use a scope:

```json
{
  "name": "@ultimatehealth/backend"
}
```

Installed as:

```bash
npm install @ultimatehealth/backend
```

Scopes are commonly used by organizations to namespace packages.

---

# 2. `scripts` — Very Important

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

Scripts are **named shell commands**.

Instead of typing:

```bash
node src/server.js
```

you can define:

```json
{
  "scripts": {
    "start": "node src/server.js"
  }
}
```

Then run:

```bash
npm start
```

Or:

```bash
npm run start
```

For most custom scripts:

```bash
npm run <script-name>
```

Example:

```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "build": "tsc",
    "lint": "eslint .",
    "test": "jest"
  }
}
```

Run:

```bash
npm run dev
npm run build
npm run lint
npm test
```

---

## Important predefined / convention-based scripts

### `start`

```json
{
  "scripts": {
    "start": "node src/index.js"
  }
}
```

Run:

```bash
npm start
```

Usually used to **start the application in normal/production mode**.

Example:

```json
{
  "scripts": {
    "start": "node dist/index.js"
  }
}
```

---

### `test`

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Run:

```bash
npm test
```

Conventionally used for automated tests.

Example:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

### `stop`

```json
{
  "scripts": {
    "stop": "node stop-server.js"
  }
}
```

Run:

```bash
npm stop
```

Less commonly used in modern applications.

---

### `restart`

```json
{
  "scripts": {
    "restart": "npm stop && npm start"
  }
}
```

Run:

```bash
npm restart
```

---

## Common custom scripts

### `dev`

Not an npm predefined lifecycle command, but an extremely common convention:

```json
{
  "scripts": {
    "dev": "nodemon src/index.js"
  }
}
```

Run:

```bash
npm run dev
```

For TypeScript:

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts"
  }
}
```

Usually enables:

* Watch mode
* Auto restart
* Faster development workflow

---

### `build`

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

Converts:

```text
src/
 └── index.ts
```

into something like:

```text
dist/
 └── index.js
```

Common production flow:

```bash
npm run build
npm start
```

---

### `lint`

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

Checks code quality.

Example:

```bash
npm run lint
```

---

### `format`

```json
{
  "scripts": {
    "format": "prettier --write ."
  }
}
```

Automatically formats code.

---

### `typecheck`

Particularly useful in TypeScript:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

Checks TypeScript types without generating JavaScript.

---

# 3. Pre and Post Script Hooks

This is an important interview topic.

npm supports `pre` and `post` hooks around many scripts.

Example:

```json
{
  "scripts": {
    "prebuild": "npm run lint",
    "build": "tsc",
    "postbuild": "echo Build completed"
  }
}
```

When you run:

```bash
npm run build
```

npm executes:

```text
prebuild
   ↓
build
   ↓
postbuild
```

Equivalent:

```text
npm run lint
tsc
echo Build completed
```

This is useful for:

```text
prebuild
→ Clean old files
→ Run validation

build
→ Compile application

postbuild
→ Generate artifacts
```

Example:

```json
{
  "scripts": {
    "pretest": "npm run lint",
    "test": "jest",
    "posttest": "echo Tests completed"
  }
}
```

---

# 4. Local Binary Resolution — Important

Suppose you install:

```bash
npm install --save-dev nodemon
```

You normally do **not** need:

```bash
./node_modules/.bin/nodemon src/index.js
```

You can write:

```json
{
  "scripts": {
    "dev": "nodemon src/index.js"
  }
}
```

npm automatically adds:

```text
node_modules/.bin
```

to the script's execution environment.

So this works:

```bash
npm run dev
```

### Interview answer

> npm scripts automatically make locally installed package executables available through the script environment, so binaries such as `jest`, `eslint`, `tsc`, or `nodemon` can usually be called directly.

---

# 5. Script Arguments

Suppose:

```json
{
  "scripts": {
    "start": "node src/index.js"
  }
}
```

You can pass arguments:

```bash
npm run start -- --port=5000
```

Conceptually:

```bash
node src/index.js --port=5000
```

The `--` separates npm arguments from arguments intended for your script.

---

# 6. `engines`

```json
{
  "engines": {
    "node": ">=20"
  }
}
```

This declares which runtime versions your project/package supports.

Example:

```json
{
  "engines": {
    "node": ">=20 <23"
  }
}
```

Meaning:

```text
Node.js version 20.x
Node.js version 21.x
Node.js version 22.x

Allowed

Node.js 23+
Not allowed
```

You can also specify npm:

```json
{
  "engines": {
    "node": ">=20",
    "npm": ">=10"
  }
}
```

## Why is this important?

Suppose your project uses:

```js
Array.prototype.toSorted()
```

or a newer Node API.

Older Node versions may fail.

So `engines` communicates the expected runtime environment.

### Important distinction

`engines` **declares compatibility**. It does not universally guarantee that an unsupported version will be blocked; enforcement depends on the package manager and configuration.

That distinction is a good interview point.

---

# 7. `dependencies`

```json
{
  "dependencies": {
    "express": "^5.0.0",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^8.0.0"
  }
}
```

These are packages required for your application to **run in production**.

For example:

```js
import express from "express";
```

If your production application needs Express, then:

```text
express
```

belongs in `dependencies`.

Other examples:

```text
express
mongoose
prisma
jsonwebtoken
bcrypt
kafkajs
axios
zod
```

A simple rule:

> **If removing the package causes the deployed application to fail at runtime, it is usually a production dependency.**

---

# 8. `devDependencies`

```json
{
  "devDependencies": {
    "typescript": "^5.0.0",
    "eslint": "^9.0.0",
    "prettier": "^3.0.0",
    "jest": "^30.0.0",
    "nodemon": "^3.0.0"
  }
}
```

These packages are primarily needed to:

* Develop
* Test
* Compile
* Lint
* Format

the application.

Examples:

```text
typescript
eslint
prettier
jest
vitest
nodemon
ts-node
tsx
```

---

# 9. `dependencies` vs `devDependencies`

| Question                        | `dependencies` | `devDependencies` |
| ------------------------------- | -------------- | ----------------- |
| Needed by running application?  | Yes            | Usually no        |
| Needed in production?           | Yes            | Usually no        |
| Needed for development/testing? | Possibly       | Yes               |
| Example                         | Express        | ESLint            |
| Example                         | Mongoose       | Prettier          |
| Example                         | KafkaJS        | Jest              |

Example:

```json
{
  "dependencies": {
    "express": "^5.0.0",
    "mongoose": "^8.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "eslint": "^9.0.0",
    "nodemon": "^3.0.0"
  }
}
```

---

# 10. The TypeScript Edge Case — Interview Trap

Consider:

```text
typescript → devDependency
```

That is generally correct because TypeScript is a **build-time tool**.

```text
Development / CI
       │
       ▼
TypeScript (.ts)
       │
       │ tsc
       ▼
JavaScript (.js)
       │
       ▼
Production
```

Production runs:

```bash
node dist/index.js
```

Therefore, `typescript` does not necessarily need to exist in production.

However, if your production environment executes:

```bash
ts-node src/index.ts
```

then packages required for that runtime setup may need to be available in the production environment.

### Key principle

> Classify dependencies based on what is required in the environment where the application actually executes—not simply whether a package is called a "development tool."

---

# 11. How npm adds them

Install production dependency:

```bash
npm install express
```

Result:

```json
{
  "dependencies": {
    "express": "^5.0.0"
  }
}
```

Install development dependency:

```bash
npm install --save-dev eslint
```

or:

```bash
npm install -D eslint
```

Result:

```json
{
  "devDependencies": {
    "eslint": "^9.0.0"
  }
}
```

---

# 12. Version Symbols — Very Important

Example:

```json
{
  "dependencies": {
    "express": "^5.0.0"
  }
}
```

The version is based on semantic versioning:

```text
MAJOR.MINOR.PATCH
  5  .  2  .  1
```

Example:

```text
5.2.1
```

### PATCH

```text
5.2.1 → 5.2.2
```

Usually backward-compatible bug fixes.

### MINOR

```text
5.2.1 → 5.3.0
```

Usually backward-compatible features.

### MAJOR

```text
5.2.1 → 6.0.0
```

Potential breaking changes.

---

## `^` — Caret

```json
"express": "^5.2.1"
```

Generally allows compatible updates within the same major version:

```text
5.2.1  ✅
5.3.0  ✅
5.9.2  ✅
6.0.0  ❌
```

---

## `~` — Tilde

```json
"express": "~5.2.1"
```

Generally allows patch updates:

```text
5.2.1  ✅
5.2.5  ✅
5.3.0  ❌
```

---

## Exact Version

```json
"express": "5.2.1"
```

Requests exactly that version range specification.

```text
5.2.1  ✅
5.2.2  ❌
5.3.0  ❌
```

---

## Wildcards and ranges

Examples:

```json
{
  "dependencies": {
    "package-a": "*",
    "package-b": ">=2.0.0",
    "package-c": ">=2.0.0 <3.0.0"
  }
}
```

In production projects, very broad ranges can make dependency resolution and reproducibility less predictable.

---

# 13. `package.json` vs Lock File

This is another common interview question.

## `package.json`

Contains the **desired dependency range**:

```json
{
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

This could potentially resolve to a newer compatible `5.x.x` release.

## `package-lock.json`

Records the **resolved dependency tree**.

Conceptually:

```text
package.json
     ↓
What versions are acceptable?

package-lock.json
     ↓
What versions were actually resolved and locked?
```

Example:

```text
package.json
express: ^5.2.1

package-lock.json
express: 5.2.3
```

This improves reproducibility.

For CI, npm commonly uses:

```bash
npm ci
```

which installs according to the lockfile and is intended for clean, reproducible installs.

---

# 14. A Practical Backend `package.json`

For a Node.js + TypeScript backend:

```json
{
  "name": "ultimatehealth-backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src",
    "test": "jest",
    "test:coverage": "jest --coverage"
  },
  "engines": {
    "node": ">=20"
  },
  "dependencies": {
    "express": "^5.0.0",
    "zod": "^3.0.0",
    "jsonwebtoken": "^9.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tsx": "^4.0.0",
    "eslint": "^9.0.0",
    "jest": "^30.0.0"
  }
}
```

Production lifecycle:

```text
Developer
   │
   ▼
npm install
   │
   ▼
npm run typecheck
npm run lint
npm test
   │
   ▼
npm run build
   │
   ▼
dist/*.js
   │
   ▼
npm start
   │
   ▼
Node.js executes application
```

---

# Most Important Interview Questions

### Q1. What is `package.json`?

> It is the manifest file of a Node.js project. It contains project metadata, scripts, dependency declarations, runtime requirements, and package configuration.

### Q2. What is the difference between `dependencies` and `devDependencies`?

> `dependencies` are packages needed for the application at runtime, while `devDependencies` are primarily needed for development activities such as testing, linting, formatting, and building.

### Q3. Is `devDependencies` installed in production?

> That depends on the package manager and installation configuration. Production installations commonly omit development dependencies, so the application should not rely on them unless the production build/runtime strategy explicitly requires them.

### Q4. Where does npm look for executables such as Jest or ESLint in scripts?

> npm makes locally installed binaries from `node_modules/.bin` available when executing package scripts.

### Q5. What is the difference between `npm install` and `npm ci`?

> `npm install` resolves and installs dependencies and may update the lockfile. `npm ci` is intended for clean, reproducible installs using the existing lockfile and is commonly used in CI.

### Q6. What does `engines` do?

> It declares the Node.js and optionally package-manager versions that the project supports. Enforcement depends on the package manager and configuration.

### Q7. What is `prebuild`?

> npm lifecycle naming allows scripts such as `prebuild`, `build`, and `postbuild` to run around the corresponding lifecycle command.

### Q8. Why is TypeScript usually a `devDependency`?

> Because TypeScript is usually used to compile source code during development or CI, while production runs the generated JavaScript with Node.js.

## Quick Recall Formula

```text
name
→ Package identity

scripts
→ Project commands

engines
→ Supported runtime versions

dependencies
→ Needed to run

devDependencies
→ Needed to develop, test, lint, or build

package-lock.json
→ Exact resolved dependency tree
```

