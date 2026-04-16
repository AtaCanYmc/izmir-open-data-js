import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    testTimeout: 30000, // 30 saniye global timeout (canlı API testleri için)
    setupFiles: ["dotenv/config", "./tests/setup.ts"],
    typecheck: {
      tsconfig: "./tsconfig.test.json"
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/index.ts"]
    }
  }
});
