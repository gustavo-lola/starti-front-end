import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: [
            { find: "@/app", replacement: path.resolve(__dirname, "src/app") },
            { find: "@/modules", replacement: path.resolve(__dirname, "src/modules") },
            { find: "@/shared", replacement: path.resolve(__dirname, "src/shared") },
            { find: "@/components", replacement: path.resolve(__dirname, "src/shared/components") },
            { find: "@/hooks", replacement: path.resolve(__dirname, "src/shared/hooks") },
            { find: "@/lib", replacement: path.resolve(__dirname, "src/shared/lib") },
            { find: "@/mocks", replacement: path.resolve(__dirname, "src/shared/mocks") },
            { find: "@/services", replacement: path.resolve(__dirname, "src/shared/services") },
            { find: "@/types", replacement: path.resolve(__dirname, "src/shared/types") },
            { find: "@/pages", replacement: path.resolve(__dirname, "src/modules") },
            { find: "@", replacement: path.resolve(__dirname, "src") },
        ],
    },
});
