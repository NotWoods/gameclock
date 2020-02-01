import { terser } from 'rollup-plugin-terser';

/** @type {import('rollup').RollupOptions} */
const clockBundle = {
  input: 'src/clock.js',
  inlineDynamicImports: true,
  output: {
    file: 'src/clock.bundle.js',
    format: 'iife',
  },
  plugins: [absolutePath(), terser()],
};

/** @type {import('rollup').RollupOptions} */
const clockMin = {
  input: 'src/clock.js',
  inlineDynamicImports: false,
  external: ['../web_modules/insights-js.js'],
  output: {
    file: 'src/clock.js',
    format: 'esm',
  },
  plugins: [terser()],
};

export default [clockBundle, clockMin];
