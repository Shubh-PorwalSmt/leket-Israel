import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: true
	},
	resolve: {
		alias: {
			'@' : path.resolve(__dirname, './node_modules')
		}
	},
	plugins: [react()],
	server: {
		host: true,
		staticPort: true,
		port: 8080
	}
})
