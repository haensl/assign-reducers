import node from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import * as pkg from './package.json';

const copyright = `// ${pkg.homepage} v${pkg.version} Copyright ${(new Date()).getFullYear()} ${pkg.author.name}`;

export default [
  {
    input: 'index',
    output: {
      esModule: false,
      exports: 'named',
      file: pkg.unpkg,
      format: 'umd',
      indent: false,
      name: pkg.name
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        babelrc: false,
        exclude: [
          'node_modules/**',
          '**/*.test.js'
        ],
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false
            }
          ]
        ]
      }),
      node(),
      terser({
        output: {
          preamble: copyright
        }
      })
    ]
  },
  {
    external: [
      /@babel\/runtime/
    ],
    input: 'index',
    output: {
      file: pkg.module,
      format: 'esm',
      indent: false,
      name: pkg.name,
      sourcemap: true
    },
    plugins: [
      babel({
        babelHelpers: 'runtime',
        babelrc: false,
        exclude: [
          'node_modules/**',
          '**/*.test.js'
        ],
        plugins: [
          '@babel/plugin-transform-runtime'
        ],
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                esmodules: true
              }
            }
          ]
        ]
      }),
      node(),
      terser({
        output: {
          preamble: copyright
        }
      })
    ]
  },
  {
    external: [
      /@babel\/runtime/
    ],
    input: 'index',
    output: {
      exports: 'named',
      file: pkg.main,
      format: 'cjs',
      indent: false,
      name: pkg.name,
      sourcemap: true
    },
    plugins: [
      babel({
        babelHelpers: 'runtime',
        babelrc: false,
        exclude: [
          'node_modules/**',
          '**/*.test.js'
        ],
        plugins: [
          '@babel/plugin-transform-runtime'
        ],
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                node: true
              }
            }
          ]
        ]
      }),
      node(),
      terser({
        output: {
          preamble: copyright
        }
      })
    ]
  }
];
