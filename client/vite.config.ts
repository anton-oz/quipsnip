import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

// const config: Partial<VitePWAOptions> = {
//   registerType: "autoUpdate",
//   devOptions: {
//     enabled: false,
//   },
//   includeAssets: ["**/*"], // caches everything, change if neccesary
//   manifest: {
//     name: "slides",
//     short_name: "Sl",
//     description: "new age notes",
//     theme_color: "#599beb",
//     icons: [
//       {
//         src: "/pwa-64x64.png",
//         sizes: "64x64",
//         type: "image/png",
//       },
//       {
//         src: "/pwa-192x192.png",
//         sizes: "192x192",
//         type: "image/png",
//       },
//       {
//         src: "/pwa-512x512.png",
//         sizes: "512x512",
//         type: "image/png",
//         purpose: "any",
//       },
//     ],
//   },
// };

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react(), VitePWA(config)],
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
