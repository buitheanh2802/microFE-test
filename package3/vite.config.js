import { defineConfig } from "vite";
import path from "path";


export default defineConfig(({ command, ssrBuild, mode}) => {
    const isDevMode = mode === 'development';
    console.log(isDevMode);
    console.log(command);
    return {
        appType: 'spa',
        mode: mode,
        define: {
            __APP_ENV__: JSON.stringify(mode)
        },
        base: '/',
        publicDir: path.resolve(process.cwd(),'./public'),
        build: {
            emptyOutDir: true,
            outDir: path.resolve(process.cwd(),'./build'),
            minify: 'esbuild',
            lib: false,
            target: 'modules'
        },
        root: path.resolve(process.cwd(),'./src'),
        optimizeDeps: {
            disabled: 'build'
        },
        esbuild: {
            // supported: '',
            // target: ''
        },
        server: {
            port: 3000,
            host: '0.0.0.0',
            open: false,
            strictPort: true,
            hmr: true
        }
    }
});