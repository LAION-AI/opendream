import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import Unocss from 'unocss/vite';
import solidSvg from "vite-plugin-solid-svg";

import unoConfig from './unocss.config'


export default defineConfig({
  plugins: [
    solidPlugin(),
    solidSvg(),
    Unocss(unoConfig)
  ],
  optimizeDeps: {
    extensions: ['jsx'],
  }
});

