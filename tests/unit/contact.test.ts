import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readContactForm, validateContact } from "@/lib/contact";
import { siteConfig } from "@/lib/site";
import { getDictionary, locales } from "@/lib/i18n";

const send = vi.fn();

vi.mock("resend", () => ({
    Resend: class {
        emails = { send };
    },
}));

const { sendContactMessage } = await import("@/app/actions/contact");

const valid = { name: "Maria", email: "maria@exemplo.com", message: "Ola, vi seu portfolio e gostei." };

function formData(fields: Record<string, string>) {
    const data = new FormData();
    for (const [key, value] of Object.entries(fields)) data.append(key, value);
    return data;
}

describe("validateContact", () => {
    it("aceita dados validos", () => {
        expect(validateContact(valid)).toEqual({ success: true, data: valid });
    });

    it.each([
        ["name", "", "nameRequired"],
        ["name", "a".repeat(81), "nameTooLong"],
        ["email", "nao-e-email", "emailInvalid"],
        ["message", "curta", "messageTooShort"],
        ["message", "a".repeat(2001), "messageTooLong"],
    ] as const)("%s = %j gera o erro %s", (field, value, expected) => {
        const result = validateContact({ ...valid, [field]: value });
        expect(result).toEqual({ success: false, errors: { [field]: expected } });
    });

    it("toda chave de erro tem traducao", () => {
        const keys = ["nameRequired", "nameTooLong", "emailInvalid", "messageTooShort", "messageTooLong"];
        for (const locale of locales) {
            expect(Object.keys(getDictionary(locale).contact.form.errors).sort()).toEqual(keys.sort());
        }
    });
});

describe("readContactForm", () => {
    it("remove espacos das pontas e trata campos ausentes como vazios", () => {
        expect(readContactForm(formData({ name: "  Maria  ", email: " maria@exemplo.com " }))).toEqual({
            name: "Maria",
            email: "maria@exemplo.com",
            message: "",
        });
    });
});

describe("sendContactMessage", () => {
    beforeEach(() => {
        vi.stubEnv("RESEND_API_KEY", "re_teste");
        send.mockReset().mockResolvedValue({ data: { id: "1" }, error: null });
        vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.restoreAllMocks();
    });

    it("envia para o e-mail do site com resposta para quem escreveu", async () => {
        const state = await sendContactMessage({ status: "idle" }, formData(valid));

        expect(state).toEqual({ status: "success" });
        expect(send).toHaveBeenCalledOnce();
        expect(send.mock.calls[0][0]).toMatchObject({
            to: siteConfig.email,
            replyTo: valid.email,
            subject: expect.stringContaining(valid.name),
            text: expect.stringContaining(valid.message),
        });
    });

    it("devolve os erros e os valores digitados quando os dados sao invalidos", async () => {
        const state = await sendContactMessage({ status: "idle" }, formData({ ...valid, email: "x" }));

        expect(state).toEqual({
            status: "invalid",
            values: { ...valid, email: "x" },
            errors: { email: "emailInvalid" },
        });
        expect(send).not.toHaveBeenCalled();
    });

    it("finge sucesso sem enviar quando o campo anti-spam vem preenchido", async () => {
        const state = await sendContactMessage(
            { status: "idle" },
            formData({ ...valid, website: "spam.com" }),
        );

        expect(state).toEqual({ status: "success" });
        expect(send).not.toHaveBeenCalled();
    });

    it("retorna erro sem chave do Resend configurada", async () => {
        vi.stubEnv("RESEND_API_KEY", "");
        const state = await sendContactMessage({ status: "idle" }, formData(valid));

        expect(state).toEqual({ status: "error", values: valid });
        expect(send).not.toHaveBeenCalled();
    });

    it("retorna erro quando o Resend recusa o envio", async () => {
        send.mockResolvedValue({ data: null, error: { name: "validation_error", message: "falhou" } });
        const state = await sendContactMessage({ status: "idle" }, formData(valid));

        expect(state).toEqual({ status: "error", values: valid });
    });
});
