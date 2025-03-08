import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(),svgr()],
  server: {
    port: 3000,
  },
  base: "./", 
  build: {
    chunkSizeWarningLimit: 1000, // Increase the warning limit (optional)
    rollupOptions: {
      output: {
        // manualChunks(id) {
        //   if (id.includes("node_modules")) {
        //     if (id.includes("react")) return "react-vendor"; // React-related libraries
        //     if (id.includes("ag-grid")) return "ag-grid-vendor"; // AG-Grid
        //     if (id.includes("chart.js") || id.includes("recharts")) return "charts-vendor"; // Charting libraries
        //     return "vendor"; // Other dependencies
          // }
        // },
      },
    },
  },
});
