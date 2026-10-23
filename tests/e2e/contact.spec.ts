import { expect, test } from "@playwright/test";

// Nenhum teste aqui chega a enviar e-mail: so os caminhos de validacao e do campo anti-spam
test.describe("formulario de contato", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/pt/contato");
    });

    test("valida no servidor e mostra os erros em portugues", async ({ page }) => {
        const form = page.getByRole("form", { name: "Formulário de contato" });
        await form.getByLabel("Nome").fill("Maria");
        await form.getByLabel("E-mail").fill("nao-e-email");
        await form.getByRole("button", { name: "Enviar mensagem" }).click();

        await expect(form.getByLabel("E-mail")).toHaveAccessibleDescription("Informe um e-mail válido.");
        await expect(form.getByLabel("Mensagem")).toHaveAccessibleDescription(
            "Escreva pelo menos 10 caracteres.",
        );
        // O que a pessoa digitou continua no formulario
        await expect(form.getByLabel("Nome")).toHaveValue("Maria");
        await expect(form.getByLabel("Nome")).not.toHaveAttribute("aria-invalid");
    });

    test("bot que preenche o campo escondido recebe sucesso sem envio", async ({ page }) => {
        const form = page.getByRole("form", { name: "Formulário de contato" });
        await form.locator('input[name="website"]').evaluate((input: HTMLInputElement) => {
            input.value = "https://spam.example";
        });
        await form.getByRole("button", { name: "Enviar mensagem" }).click();

        await expect(form.getByRole("status")).toHaveText(/Mensagem enviada!/);
    });

    test("em ingles as mensagens saem em ingles", async ({ page }) => {
        await page.goto("/en/contato");
        const form = page.getByRole("form", { name: "Contact form" });
        await form.getByRole("button", { name: "Send message" }).click();

        await expect(form.getByLabel("Name")).toHaveAccessibleDescription("Please enter your name.");
    });
});
