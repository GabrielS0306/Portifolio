import { expect, test } from "@playwright/test";

test.describe("pagina 404", () => {
    test("responde 404 e mostra a pagina personalizada", async ({ page }) => {
        const response = await page.goto("/pt/pagina-que-nao-existe");

        expect(response?.status()).toBe(404);
        await expect(page).toHaveTitle("404 | Gabriel dev");
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página não encontrada.");
    });

    test("URL sem idioma e redirecionada e tambem da 404", async ({ page }) => {
        const response = await page.goto("/pagina-que-nao-existe");

        expect(page.url()).toMatch(/\/pt\/pagina-que-nao-existe$/);
        expect(response?.status()).toBe(404);
    });

    test("mostra a 404 em ingles dentro de /en", async ({ page }) => {
        await page.goto("/en/page-that-does-not-exist");

        await expect(page.locator("html")).toHaveAttribute("lang", "en");
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found.");
    });

    test("volta para a home", async ({ page }) => {
        await page.goto("/pt/pagina-que-nao-existe");

        await page.getByRole("link", { name: "Voltar ao início" }).click();

        await expect(page).toHaveURL(/\/pt$/);
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Eu desenvolvo");
    });

    test("leva ate a pagina de projetos", async ({ page }) => {
        await page.goto("/pt/pagina-que-nao-existe");

        await page.getByRole("link", { name: "Ver projetos" }).click();

        await expect(page).toHaveURL(/\/pt\/projetos$/);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projetos");
    });
});
