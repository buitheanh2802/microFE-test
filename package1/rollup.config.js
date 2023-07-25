const { defineConfig } = require('rollup');
const path = require('path');
const packageJson = require('./package.json');
const pluginCleaner = require('rollup-plugin-cleaner');
const pluginCommonJs = require('@rollup/plugin-commonjs');  
const pluginServe = require('rollup-plugin-serve');
const pluginHtml = require('@rollup/plugin-html');
const { babel: pluginBabel } = require('@rollup/plugin-babel');

module.exports = defineConfig((context) => {
    const isDevMode = context.environment === 'development';
    return {
        input: {
            index: path.resolve(process.cwd(),'./src/index.tsx'),
            // main: path.resolve(process.cwd(),'./src/main.js')
        },
        output: {
            dir: path.resolve(process.cwd(),'./build'),
            esModule: 'if-default-prop',
            entryFileNames: 'assets/js/[name].[hash:6].bundle.js',
            assetFileNames: 'assets/css/[name].[hash:6].bundle.[ext]',
            chunkFileNames: '[name].chunks.bundle.js',
            format: 'es',
            name: packageJson.name,
            exports: 'auto',
            // inlineDynamicImports: true,
            footer: '/* Power by Bui The Anh. */',
            // preserveModules: true,
            sourcemap: false
        },
        plugins: [
            pluginCleaner({
                targets: [path.resolve(process.cwd(),'./build')]
            }),
            pluginCommonJs(),
            pluginBabel({
                babelrc: false,
                presets: [
                    '@babel/preset-react',
                    '@babel/preset-typescript'
                ]
            }),
            pluginHtml({
                title: 'Package rollup test'
            }),
            isDevMode && pluginServe({
                historyApiFallback: true,
                port: 3000,
                open: false,
                contentBase: path.resolve(process.cwd(),'./build')
            })
        ],
        external: [],
        preserveEntrySignatures: 'allow-extension'
    }
})