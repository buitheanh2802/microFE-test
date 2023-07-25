const { defineConfig } = require('rollup');
const path = require('path');
const packageJson = require('./package.json');
const pluginCleaner = require('rollup-plugin-cleaner');
const pluginHtml = require('@rollup/plugin-html');
const pluginCommonJs = require('@rollup/plugin-commonjs');

module.exports = defineConfig((context) => {
    const isDevMode = context.environment === 'development';
    // console.log(isDevMode);
    return {
        input: {
            index: path.resolve(process.cwd(),'./src/index.js'),
            main: path.resolve(process.cwd(),'./src/main.js')
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
            footer: '/* follow me on Twitter! @rich_harris */',
            // preserveModules: true,
            sourcemap: false
        },
        plugins: [
            pluginCleaner({
                targets: [path.resolve(process.cwd(),'./build')]
            }),
            pluginHtml(),
            pluginCommonJs()
        ],
        external: [],
        preserveEntrySignatures: 'allow-extension'
    }
})