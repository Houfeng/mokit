const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

module.exports = function (opts) {
  return async function (next, ctx) {
    let configuration = {
      input: './src/index.js',
      format: 'umd',
      name: 'mokit',
      plugins: [
        resolve(),
        commonjs(),
        babel({
          exclude: 'node_modules/**' // only transpile our source code
        })
      ]
    };
    rollup.rollup(configuration);
  };
};