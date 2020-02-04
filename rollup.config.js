import { terser } from 'rollup-plugin-terser';

function bundleAndMinify(scriptName) {
  /** @type {import('rollup').RollupOptions} */
  const bundle = {
    input: `src/${scriptName}.js`,
    inlineDynamicImports: true,
    output: {
      file: `src/${scriptName}.bundle.js`,
      format: 'iife',
    },
    plugins: [terser()],
  };

  /** @type {import('rollup').RollupOptions} */
  const min = {
    input: `src/${scriptName}.js`,
    inlineDynamicImports: false,
    external: ['./libs.js'],
    output: {
      file: `src/${scriptName}.js`,
      format: 'esm',
    },
    plugins: [terser()],
  };

  return [bundle, min];
}

export default [...bundleAndMinify('clock'), ...bundleAndMinify('settings')];
