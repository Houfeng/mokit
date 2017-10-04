import resolve from 'rollup-plugin-node-resolve';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';

const pkg = require('./package');
const aliasMap = require('./alias');

export default {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'umd'
  },
  name: pkg.name,
  plugins: [
    alias(aliasMap),
    resolve(),
    babel({
      runtimeHelpers: true
    })
  ]
};