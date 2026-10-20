import { expect, test } from "@playwright/test";

test.describe("pagina 404", () => {
    test("responde 404 e mostra a pagina personalizada", async ({ page }) => {
        const response = await page.goto("/pagina-que-nao-existe");

        expect(response?.status()).toBe(404);
        await expect(page).toHaveTitle("Página não encontrada | Gabriel dev");
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página não encontrada.");
    });

    test("volta para a home", async ({ page }) => {
        await page.goto("/pagina-que-nao-existe");

        await page.getByRole("link", { name: "Voltar ao início" }).click();

        await expect(page).toHaveURL(/\/$/);
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Eu desenvolvo");
    });

    test("leva ate a secao de projetos", async ({ page }) => {
        await page.goto("/pagina-que-nao-existe");

        await page.getByRole("link", { name: "Ver projetos" }).click();

        await expect(page).toHaveURL(/\/#projetos$/);
        await expect(page.locator("section#projetos")).toBeInViewport();
    });
});
