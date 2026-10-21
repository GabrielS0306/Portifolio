"use server";

import { Resend } from "resend";
import {
    HONEYPOT_FIELD,
    readContactForm,
    validateContact,
    type ContactErrorKey,
    type ContactField,
    type ContactValues,
} from "@/lib/contact";
import { siteConfig } from "@/lib/site";

export type ContactState =
    | { status: "idle" }
    | { status: "success" }
    | { status: "invalid"; values: ContactValues; errors: Partial<Record<ContactField, ContactErrorKey>> }
    | { status: "error"; values: ContactValues };

// Sem dominio proprio verificado no Resend, o remetente precisa ser o de testes
// e o destinatario precisa ser o e-mail da conta do Resend (o mesmo do site).
// Quando o dominio for adotado, troque por algo como "Portfolio <contato@seudominio.com>".
const FROM = "Portfólio <onboarding@resend.dev>";

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
    // Finge que deu certo para o bot nao tentar de novo, mas nao envia nada
    if (formData.get(HONEYPOT_FIELD)) return { status: "success" };

    const values = readContactForm(formData);
    const validation = validateContact(values);
    if (!validation.success) return { status: "invalid", values, errors: validation.errors };

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("[contato] RESEND_API_KEY nao configurada");
        return { status: "error", values };
    }

    const { name, email, message } = validation.data;
    const { error } = await new Resend(apiKey).emails.send({
        from: FROM,
        to: siteConfig.email,
        replyTo: email,
        subject: `Nova mensagem de ${name} pelo portfólio`,
        text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
    });

    if (error) {
        console.error("[contato] falha ao enviar pelo Resend:", error.name, error.message);
        return { status: "error", values };
    }

    return { status: "success" };
}
