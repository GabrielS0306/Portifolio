import { expect, test } from "@playwright/test";

test.describe("home", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("carrega com titulo e secoes principais", async ({ page }) => {
        await expect(page).toHaveTitle("Gabriel — Desenvolvedor Full-Stack");
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Eu desenvolvo");

        for (const id of ["projetos", "sobre", "contato"]) {
            await expect(page.locator(`section#${id}`)).toBeAttached();
        }
    });

    test("lista os projetos", async ({ page }) => {
        const projects = page.locator("#projetos article");
        await expect(projects).not.toHaveCount(0);
    });

    test("alterna entre tema escuro e claro", async ({ page }) => {
        const html = page.locator("html");
        await expect(html).toHaveClass(/dark/);

        await page.getByRole("button", { name: "Ativar tema claro" }).filter({ visible: true }).click();
        await expect(html).toHaveClass(/light/);

        await page.getByRole("button", { name: "Ativar tema escuro" }).filter({ visible: true }).click();
        await expect(html).toHaveClass(/dark/);
    });
});

test.describe("navegacao desktop", () => {
    test.skip(({ isMobile }) => isMobile, "menu desktop fica oculto no mobile");

    test("link do menu leva ate a secao", async ({ page }) => {
        await page.goto("/");

        await page.getByRole("navigation").first().getByRole("link", { name: "Contato" }).click();

        await expect(page).toHaveURL(/\/#contato$/);
        await expect(page.locator("section#contato")).toBeInViewport();
    });
});

test.describe("menu mobile", () => {
    test.skip(({ isMobile }) => !isMobile, "menu mobile so aparece em telas pequenas");

    test("abre, navega e fecha ao escolher um link", async ({ page }) => {
        await page.goto("/");

        await page.getByRole("button", { name: "Abrir menu" }).click();
        const menu = page.getByRole("navigation", { name: "Menu principal" });
        await menu.getByRole("link", { name: "Sobre" }).click();

        await expect(page).toHaveURL(/\/#sobre$/);
        await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
            "aria-expanded",
            "false",
        );
    });

    test("fecha com Esc", async ({ page }) => {
        await page.goto("/");

        await page.getByRole("button", { name: "Abrir menu" }).click();
        await page.keyboard.press("Escape");

        const toggle = page.getByRole("button", { name: "Abrir menu" });
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await expect(toggle).toBeFocused();
    });
});
