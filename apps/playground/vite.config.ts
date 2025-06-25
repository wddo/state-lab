import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const isGitHub = process.env.VITE_DEPLOY_TARGET === "github";

// https://vite.dev/config/
export default defineConfig({
  base: isGitHub ? "/state-lab/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@repo/ui",
        replacement: path.resolve(__dirname, "../../packages/ui/src"),
      },
      {
        find: "@repo/store",
        replacement: path.resolve(__dirname, "../../packages/store"),
      },
      {
        find: "@repo/data",
        replacement: path.resolve(__dirname, "../../packages/data"),
      },
      {
        find: "@repo/api",
        replacement: path.resolve(__dirname, "../../packages/api"),
      },
      {
        find: "@repo/hooks",
        replacement: path.resolve(__dirname, "../../packages/hooks"),
      },
    ],
  },
});
