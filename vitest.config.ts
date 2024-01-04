// vitest.config.ts
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true, // allows us to use vitest library methods in unit test without explicit imports
        environment: 'jsdom',
        setupFiles: './tests/setup.ts', // path to setup file
        coverage: {
            include: ['src/**/*.{js,jsx,ts,tsx}'], // specify files to include
            exclude: ['src/generated/**/*.ts', 'src/components/ui/**/*'], // specify files to exclude
            reporter: ['text', 'html'], // customize reporters. don't forget to include 'html' if you use vitest-ui
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
