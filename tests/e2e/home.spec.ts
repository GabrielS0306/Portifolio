import { expect, test } from "@playwright/test";

test.describe("home", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("e um resumo com links para as paginas completas", async ({ page }) => {
        await expect(page).toHaveTitle("Gabriel — Desenvolvedor Full-Stack");
        await expect(page.getByRole("heading", { level: 1 })).toContainText("Eu desenvolvo");

        await expect(page.locator("#projetos article")).not.toHaveCount(0);
        await expect(page.getByRole("link", { name: "Ver todos os projetos" })).toHaveAttribute(
            "href",
            "/pt/projetos",
        );
        await expect(page.locator("#contato").getByRole("link", { name: "Falar comigo" })).toHaveAttribute(
            "href",
            "/pt/contato",
        );
        // O formulario completo fica so na pagina de contato
        await expect(page.getByRole("form", { name: "Formulário de contato" })).toHaveCount(0);
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

test.describe("paginas", () => {
    test("projetos, sobre e contato tem titulo proprio", async ({ page }) => {
        const pages = [
            ["/pt/projetos", "Projetos | Gabriel dev", "Projetos"],
            ["/pt/sobre", "Sobre mim | Gabriel dev", "Sobre mim"],
            ["/pt/contato", "Vamos trabalhar juntos? | Gabriel dev", "Vamos trabalhar juntos?"],
            ["/en/projetos", "Projects | Gabriel dev", "Projects"],
        ];

        for (const [path, title, heading] of pages) {
            await page.goto(path);
            await expect(page).toHaveTitle(title);
            await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
        }
    });

    test("sobre inclui a trajetoria", async ({ page }) => {
        await page.goto("/pt/sobre");
        await expect(page.locator("section#trajetoria")).toBeVisible();
    });

    test("links antigos com # redirecionam para a pagina nova", async ({ page }) => {
        await page.goto("/pt#sobre");
        await expect(page).toHaveURL(/\/pt\/sobre$/);

        await page.goto("/en#contato");
        await expect(page).toHaveURL(/\/en\/contato$/);
    });
});

test.describe("navegacao desktop", () => {
    test.skip(({ isMobile }) => isMobile, "menu desktop fica oculto no mobile");

    test("link do menu abre a pagina e fica marcado como atual", async ({ page }) => {
        await page.goto("/");

        const nav = page.getByRole("navigation").first();
        await nav.getByRole("link", { name: "Contato" }).click();

        await expect(page).toHaveURL(/\/pt\/contato$/);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("Vamos trabalhar juntos?");
        await expect(nav.getByRole("link", { name: "Contato" })).toHaveAttribute("aria-current", "page");
    });

    test("pagina de um projeto marca Projetos no menu", async ({ page }) => {
        await page.goto("/pt/projetos/skillflow");

        const nav = page.getByRole("navigation").first();
        await expect(nav.getByRole("link", { name: "Projetos" })).toHaveAttribute("aria-current", "page");
    });
});

test.describe("menu mobile", () => {
    test.skip(({ isMobile }) => !isMobile, "menu mobile so aparece em telas pequenas");

    test("abre, navega e fecha ao escolher um link", async ({ page }) => {
        await page.goto("/");

        await page.getByRole("button", { name: "Abrir menu" }).click();
        const menu = page.getByRole("navigation", { name: "Menu principal" });
        await menu.getByRole("link", { name: "Sobre" }).click();

        await expect(page).toHaveURL(/\/pt\/sobre$/);
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
