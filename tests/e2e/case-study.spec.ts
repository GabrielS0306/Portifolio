import { expect, test } from "@playwright/test";

test.describe("estudo de caso", () => {
    test("o card leva a pagina do projeto e o link volta para a lista", async ({ page }) => {
        await page.goto("/pt");

        await page.getByRole("link", { name: "Ver detalhes do projeto SkillFlow" }).click();
        await expect(page).toHaveURL(/\/pt\/projetos\/skillflow$/);
        await expect(page).toHaveTitle("SkillFlow | Gabriel dev");
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("SkillFlow");
        await expect(page.getByRole("heading", { name: "Decisões técnicas" })).toBeVisible();

        await page.getByRole("link", { name: "Voltar aos projetos" }).click();
        await expect(page).toHaveURL(/\/pt#projetos$/);
    });

    test("navega entre projetos", async ({ page }) => {
        await page.goto("/pt/projetos/sistema-barbearia");

        const pager = page.getByRole("navigation", { name: "Outros projetos" });
        await pager.getByRole("link", { name: /Próximo projeto/ }).click();
        await expect(page).toHaveURL(/\/pt\/projetos\/skillflow$/);
    });

    test("trocar de idioma mantem o mesmo projeto", async ({ page }) => {
        await page.goto("/pt/projetos/sistema-escolar");

        await page.getByRole("button", { name: "Switch to English" }).filter({ visible: true }).click();
        await expect(page).toHaveURL(/\/en\/projetos\/sistema-escolar$/);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("School Management System");
    });

    test("projeto inexistente responde 404", async ({ page }) => {
        const response = await page.goto("/pt/projetos/nao-existe");
        expect(response?.status()).toBe(404);
    });
});
