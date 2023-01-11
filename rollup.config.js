const node = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const babel = require('@rollup/plugin-babel');
const pkg = require('./package.json');

const copyright = `// ${pkg.homepage} v${pkg.version} Copyright ${(new Date()).getFullYear()} ${pkg.author.name}`;

module.exports = [
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
      exports: 'default',
      file: pkg.main,
      format: 'cjs',
      indent: false,
      name: pkg.name,
      sourcemap: true
    },
    plugins: [
      node(),
      terser({
        output: {
          preamble: copyright
        }
      })
    ]
  }
];
