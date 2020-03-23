import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import path from 'path';
import postcssModules from 'postcss-modules';

import pkg from './package.json';

const cssExportMap = {};

export default {
    onwarn: function (warning, warn) {
        if (warning.code === 'CIRCULAR_DEPENDENCY') return;
        warn(warning);
    },
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true
        }
    ],
    external: [
        'crypto',
        'styled-components',
        path.resolve(__dirname, '../node_modules/styled-components')
    ],
    plugins: [
        external(),
        postcss({
            plugins: [
                postcssModules({
                    getJSON (id, exportTokens) {
                        cssExportMap[id] = exportTokens;
                    }
                })
            ],
            getExportNamed: false,
            getExport (id) {
                return cssExportMap[id];
            },
            extract: 'dist/styles.css',
        }),
        url(),
        svgr(),
        babel({
            exclude: 'node_modules/**',
        }),
        resolve(),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react/index.js': [
                    'cloneElement',
                    'createContext',
                    'Component',
                    'createElement'
                ],
                'node_modules/react-dom/index.js': ['render', 'hydrate'],
                'node_modules/react-is/index.js': [
                    'isElement',
                    'isValidElementType',
                    'ForwardRef'
                ]
            }
        })
    ]
};