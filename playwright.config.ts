import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

export default defineConfig({
    testDir: "tests/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? "github" : "list",
    use: {
        baseURL: `http://localhost:${PORT}`,
        // Navegador em portugues por padrao; os testes de idioma sobrescrevem quando precisam
        locale: "pt-BR",
        trace: "on-first-retry",
    },
    projects: [
        { name: "desktop", use: { ...devices["Desktop Chrome"] } },
        { name: "mobile", use: { ...devices["Pixel 7"] } },
    ],
    // Roda contra o build de producao, como recomenda a documentacao do Next
    webServer: {
        command: `npm run build && npm run start -- -p ${PORT}`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
        // Inclui os rascunhos do blog no build, para os testes terem um post para abrir
        env: { SHOW_DRAFTS: "true" },
    },
});
