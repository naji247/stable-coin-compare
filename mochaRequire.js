// Babel extensions cannot be configured from the .babelrc, which means that we need an explicit require of @babel/register
// here that Mocha can use to transpile Typescript files.
require('@babel/register')({
  "extensions": ['.js']
});
require('@babel/polyfill');
