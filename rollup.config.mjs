import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const externals = [
  '@angular/core',
  '@angular/common',
  '@angular/common/http',
  '@angular/router',
  '@angular/forms',
  '@angular/platform-browser',
  '@angular/material/dialog',
  '@angular/material/snackbar',
  'rxjs',
  'rxjs/operators',
  'vitest'
];

const config = [
  // ES Modules Build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true
      })
    ],
    external: externals
  },
  
  // CommonJS Build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true
      })
    ],
    external: externals
  },
  
  // Types Bundle
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];

export default config;
