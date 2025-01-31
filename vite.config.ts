import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { features } from 'process';

export default defineConfig({
    plugins: [react()],
    server: { port: 3000 },
    resolve: {
        alias: {
            lib: path.resolve(__dirname, './src/lib'),
            components: path.resolve(__dirname, './src/components'),
            features: path.resolve(__dirname, './src/features'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-router-dom', 'react-dom'],
                },
            },
        },
    },
});
