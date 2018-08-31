import ascii from 'rollup-plugin-ascii';
import node from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import * as pkg from './package.json';

const copyright = `// ${pkg.homepage} v${pkg.version} Copyright ${(new Date()).getFullYear()} ${pkg.author.name}`;

export default [
  {
    input: 'index',
    plugins: [
      node(),
      ascii()
    ],
    output: {
      extend: true,
      banner: copyright,
      file: 'dist/assign-reducers.js',
      format: 'umd',
      indent: false,
      name: pkg.name
    }
  },
  {
    input: 'index',
    plugins: [
      node(),
      ascii(),
      terser({
        output: {
          preamble: copyright
        }
      })
    ],
    output: {
      extend: true,
      file: 'dist/assign-reducers.min.js',
      format: 'umd',
      indent: false,
      name: pkg.name
    }
  }
];