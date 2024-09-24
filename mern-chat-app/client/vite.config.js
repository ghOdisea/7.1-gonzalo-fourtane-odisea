import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const httpServerHost = "http://localhost:3000" 
const wsServerHost = "ws://localhost:3000" 
const devServerPort = 5000 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server:{
      port: devServerPort,
      proxy: {
        "/api":{
          target: httpServerHost,
          changeOrigin: true,
          secure: false,
  
        }
      }
    }
})
