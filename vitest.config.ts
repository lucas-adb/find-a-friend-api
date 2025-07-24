import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths'; // to recognize aliases

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // todo
  },
});