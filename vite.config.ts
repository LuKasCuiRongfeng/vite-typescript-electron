import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { config } from 'dotenv'
import { join } from 'path'

config()
// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/renderer",
  plugins: [reactRefresh()],
  base: "./",
  build: {
    outDir: join(__dirname, "dist/renderer")
  },
  server: {
    port: +process.env.PORT
  },
  resolve: {
    alias: {
      "@": join(__dirname),
      src: join(__dirname, "src"),
      main: join(__dirname, "src/main"),
      renderer: join(__dirname, "src/renderer")
    }
  }
})
