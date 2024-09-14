import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const config: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  devOptions: {
    enabled: false,
  },
  // set up manifest
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(config)],
  server: {
    port: 3000,
  },
});
