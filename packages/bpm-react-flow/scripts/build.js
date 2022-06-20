const esbuild = require('esbuild')
const alias = require('esbuild-plugin-alias')
const path = require('path')

console.log(__dirname);

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outdir: 'lib',
    bundle: true,
    sourcemap: true,
    minify: false,
    splitting: false,
    format: 'esm',
    target: ['esnext'],
    plugins: [
      alias({
        '@': path.resolve(__dirname, '../src'),
      }),
    ],
  })
  .catch((err) => {
    console.error(err)
  })
