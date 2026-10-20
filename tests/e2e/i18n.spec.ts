import { expect, test } from "@playwright/test";

test.describe("idiomas", () => {
    test("navegador em portugues abre /pt", async ({ page }) => {
        await page.goto("/");

        await expect(page).toHaveURL(/\/pt$/);
        await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Eu desenvolvo");
    });

    test.describe("navegador em ingles", () => {
        test.use({ locale: "en-US" });

        test("abre /en", async ({ page }) => {
            await page.goto("/");

            await expect(page).toHaveURL(/\/en$/);
            await expect(page.locator("html")).toHaveAttribute("lang", "en");
            await expect(page.getByRole("heading", { level: 1 })).toContainText("I build");
            await expect(page).toHaveTitle("Gabriel — Full-Stack Developer");
        });
    });

    test("botao troca para ingles e volta para portugues", async ({ page }) => {
        await page.goto("/pt");

        await page.getByRole("button", { name: "Switch to English" }).filter({ visible: true }).click();
        await expect(page).toHaveURL(/\/en$/);
        await expect(page.locator("html")).toHaveAttribute("lang", "en");
        await expect(page.getByRole("heading", { level: 2, name: "Featured projects" })).toBeVisible();

        await page.getByRole("button", { name: "Mudar para português" }).filter({ visible: true }).click();
        await expect(page).toHaveURL(/\/pt$/);
        await expect(page.getByRole("heading", { level: 2, name: "Projetos em destaque" })).toBeVisible();
    });

    test("lembra o idioma escolhido nas proximas visitas", async ({ page }) => {
        // Navegador em portugues, mas a pessoa escolheu ingles no botao
        await page.goto("/pt");
        await page.getByRole("button", { name: "Switch to English" }).filter({ visible: true }).click();
        await expect(page).toHaveURL(/\/en$/);

        await page.goto("/");

        await expect(page).toHaveURL(/\/en$/);
    });

    test("mantem a secao atual ao trocar de idioma", async ({ page }) => {
        await page.goto("/pt#contato");

        await page.getByRole("button", { name: "Switch to English" }).filter({ visible: true }).click();

        await expect(page).toHaveURL(/\/en#contato$/);
    });
});
