# KidsGround frontend

Interactive map of children's playgrounds in Bulgaria. Built with [React](https://react.dev/) and [Vite](https://vite.dev/).

## Setup

```sh
npm install
cp .env.example .env   # then fill in VITE_GOOGLE_MAPS_API_KEY
```

The app reads a Google Maps API key from the environment. Only variables prefixed with `VITE_` are exposed to the client (see `.env.example`).

## Available scripts

### `npm run dev`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000) with hot module replacement.

### `npm run build`

Builds the app for production into the `dist/` folder (minified, hashed filenames).

### `npm run preview`

Serves the production build from `dist/` locally to verify it before deploying.

## Notes

- SVG files under `src/static/icons/` are imported as React components via `vite-plugin-svgr`, e.g. `import { ReactComponent as ChildIcon } from '.../child-solid.svg'`.
