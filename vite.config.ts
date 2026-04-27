import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Is line ko add karein, ye batayega ke files 'saylanitoken' folder mein hain
  base: '/saylanitoken/', 
})