import { defineConfig } from 'tsdown'

export default defineConfig({
  // Specify your library entry point
  entry: {
    index: 'src/index.ts',
  },
  // Output both ES Modules and CommonJS formats
  format: ['esm', 'cjs'],
  outDir: 'dist',
  dts: {
    build: false,
  },
  // Clean the dist directory before building
  clean: true,
  // Optional: Generate source maps for debugging
  sourcemap: true,
  treeshake: true,
  minify: true,
  tsconfig: false,
})
