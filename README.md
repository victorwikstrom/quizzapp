# TypeScript Boilerplate

A minimal TypeScript setup with file watching and serving. No bundling!

## Quick Start

```bash
npm install
npm start
```

## Build System

There is no build system other than the TypeScript compiler generating ES2017 `.js` files. This means that only browsers that natively support modules are supported.

The only caveat is that `import` statements should use the `.js` suffix, so that the browser can make sense of them once compiled, e.g.

```ts
import { onReady } from "./onReady.js";
```

## Watchin' and Servin'

All files in `src` (other than `.ts` or `.js`) are watched with [chokidar-cli](https://www.npmjs.com/package/chokidar-cli) and `rsync`'d to `dist` when changed.

Files are served with [Browsersync](https://www.browsersync.io/), serving [options](https://www.browsersync.io/docs/options) can be customised in `bs-config.js`.

Compared to the defaults: `.wasm` files are served with the correct MIME type, and the timeout has been massively increased.

## Commands

- `npm run start` - build, watch and serve the project
- `npm run build` - create a fresh build, no watching or serving
- `npm run lint` - run the linter

Other utility commands can be found in `package.json`
