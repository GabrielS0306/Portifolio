import { expect, test } from "@playwright/test";

// O build dos testes usa SHOW_DRAFTS=true, entao o post de exemplo (rascunho) aparece
const POST = "/pt/blog/como-escrever-um-post";

test.describe("blog", () => {
    test("lista os posts e abre um post", async ({ page }) => {
        await page.goto("/pt/blog");
        await expect(page).toHaveTitle("Blog | Gabriel dev");

        await page.getByRole("link", { name: "Como escrever um post neste blog" }).click();
        await expect(page).toHaveURL(new RegExp(`${POST}$`));
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("Como escrever um post neste blog");
    });

    test("menu marca so o blog ao sair de uma secao da home", async ({ page, isMobile }) => {
        test.skip(isMobile, "menu desktop");
        await page.goto("/pt#projetos");
        const nav = page.locator("header").first().getByRole("link", { name: "Projetos" }).first();
        await expect(nav).toHaveClass(/active/);

        await page.locator("header").first().getByRole("link", { name: "Blog" }).first().click();
        await expect(page).toHaveURL(/\/pt\/blog$/);
        await expect(nav).not.toHaveClass(/active/);
        await expect(page.getByRole("link", { name: "Blog" }).first()).toHaveAttribute(
            "aria-current",
            "page",
        );
    });

    test("indice leva ate a secao do post", async ({ page }) => {
        await page.goto(POST);

        await page
            .getByRole("navigation", { name: "Neste post" })
            .getByRole("link", { name: "Tabelas" })
            .click();
        await expect(page).toHaveURL(/#tabelas$/);
        await expect(page.getByRole("heading", { name: "Tabelas" })).toBeInViewport();
    });

    test("bloco de codigo tem destaque de sintaxe e botao de copiar", async ({ page, context, isMobile }) => {
        test.skip(isMobile, "permissao de clipboard so no desktop");
        await context.grantPermissions(["clipboard-read", "clipboard-write"]);
        await page.goto(POST);

        const block = page
            .locator("figure[data-rehype-pretty-code-figure]")
            .filter({ hasText: "formatarPreco" });
        await expect(block.locator("pre code span[style*='--shiki']").first()).toBeAttached();

        await block.hover();
        await block.getByRole("button", { name: "Copiar código" }).click();
        await expect(block.getByRole("button", { name: "Código copiado" })).toBeVisible();
        expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("function formatarPreco");
    });

    test("rascunho nao e indexado e a versao em ingles avisa o idioma", async ({ page }) => {
        await page.goto("/en/blog/como-escrever-um-post");

        await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${POST}$`));
        await expect(page.getByText("Posts are currently written in Portuguese only.")).toBeVisible();
        await expect(page.locator("article")).toHaveAttribute("lang", "pt-BR");
    });

    test("post inexistente responde 404", async ({ page }) => {
        const response = await page.goto("/pt/blog/nao-existe");
        expect(response?.status()).toBe(404);
    });
});
