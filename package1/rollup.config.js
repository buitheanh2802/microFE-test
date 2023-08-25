const { defineConfig } = require('rollup');
const path = require('path');
const packageJson = require('./package.json');
const pluginCleaner = require('rollup-plugin-cleaner');
const pluginCommonJs = require('@rollup/plugin-commonjs');  
const pluginServe = require('rollup-plugin-serve');
const pluginHtml = require('@rollup/plugin-html');
const pluginBabel = require('@rollup/plugin-babel');
const pluginResolve = require('@rollup/plugin-node-resolve');
const pluginTerser = require('@rollup/plugin-terser');
const pluginReplace = require('@rollup/plugin-replace');
const fs = require('fs');

module.exports = defineConfig((context) => {
    const isDevMode = context.environment === 'development';
    const current_work_directory = process.cwd();
    return {
        input: {
            index: path.resolve(process.cwd(),'./src/index.tsx'),
            // main: path.resolve(process.cwd(),'./src/main.js')
        },
        output: {
            dir: path.resolve(process.cwd(),'./build'),
            esModule: "if-default-prop",
            entryFileNames: 'assets/js/[name].[hash:6].bundle.js',
            assetFileNames: 'assets/css/[name].[hash:6].bundle.[ext]',
            chunkFileNames: '[name].chunks.bundle.js',
            format: 'es',
            name: packageJson.name,
            exports: 'auto',
            // inlineDynamicImports: true,
            footer: '/* Power by Bui The Anh. */',
            // preserveModules: true,
            sourcemap: false,
            generatedCode: {
                arrowFunctions: false,
                constBindings: false,
                objectShorthand: false,
                reservedNamesAsProps: false,
                preset: 'es5',
                symbols: false
            }
        },
        plugins: [
            pluginTerser(),
            pluginCleaner({
                targets: [path.resolve(process.cwd(),'./build')]
            }),
            pluginCommonJs(),
            pluginResolve({
                rootDir: path.resolve(process.cwd()),
                extensions: ['.tsx','.ts','.jsx','.mjs','.js']
            }),
            pluginBabel({
                babelrc: false,
                presets: [
                    ['@babel/preset-react',{
                        runtime: "automatic"
                    }],
                    '@babel/preset-typescript'
                ],
                extensions: ['.tsx','.ts','.jsx','.mjs','.js'],
                babelHelpers: 'bundled',
                sourceType: 'unambiguous'
            }),
            pluginHtml({
                title: 'Package rollup test',
                // template: (context) => {
                //     // console.log(current_work_directory);
                //     for(const file_data in context.bundle){
                //         // console.log(context.bundle[file_data]);
                //         // context.bundle[file_data].imports.forEach(data => {
                //         //     context.bundle[file_data].code.replace('from ')
                //         // })
                //     }
                //     const html_file = fs.readFileSync(path.resolve(process.cwd(),'./src/index.html'),"utf-8");
                //     return html_file;
                // },
                filename: 'index.html',
                publicPath: '/'
            }),
            pluginReplace({
                values: {
                    'process.env.NODE_ENV': JSON.stringify('production')
                },
                preventAssignment: true
            }),
            isDevMode && pluginServe({
                historyApiFallback: true,
                port: 3000,
                open: false,
                contentBase: path.resolve(process.cwd(),'./build')
            })
        ],
        // external: ['react',/react-dom\/*/,'lodash'],
        preserveEntrySignatures: 'allow-extension',
        watch: isDevMode
    }
})