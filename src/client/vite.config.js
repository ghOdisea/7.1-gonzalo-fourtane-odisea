import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const ServerHost = "http://localhost:3000" //String(import.meta.env.SERVER_HOST_URL)
const ClientHost = "http://localhost:5000" //String(import.meta.env.SERVER_HOST_URL)
const Port = 5000 //Number(import.meta.env.VITE_CLIENT_PORT)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server:{
      port: Port,
      proxy: {
        "/api":{
          target: ServerHost,
          changeOrigin: true,
        },
        '/socket.io': {
          target: ServerHost,
          ws: true,
        },
      }
    }
})
