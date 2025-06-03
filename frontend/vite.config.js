import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({


  // if vite:  "/api/users"
  // then server recieves : "http://localhost:9090/api/users"
  // appended before /api
  
  server:{
    proxy: {
      '/api': "http://localhost:9090"
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
