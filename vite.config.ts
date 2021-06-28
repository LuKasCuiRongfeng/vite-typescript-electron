import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { config } from 'dotenv'
import { join } from 'path'

config()
// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/render",
  plugins: [reactRefresh()],
  build: {
    outDir: join(__dirname, "dist/render")
  },
  server: {
    port: +process.env.PORT
  }
})
