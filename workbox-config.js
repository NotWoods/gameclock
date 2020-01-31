module.exports = {
  cacheId: 'maskable.app',
  globDirectory: '.',
  globPatterns: [
    'index.html',
    'src/**/*.js',
    'web_modules/*.js',
    'style/**/*.css',
    'icons/**/*.{png,svg}',
  ],
  globIgnores: ['**/node_modules/**', '**/sw.js'],
  swDest: 'sw.js',
  ignoreURLParametersMatching: [/fbclid/],
};
