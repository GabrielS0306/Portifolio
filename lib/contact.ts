import { z } from "zod";
import type { Dictionary } from "@/lib/i18n";

export type ContactField = "name" | "email" | "message";
export type ContactErrorKey = keyof Dictionary["contact"]["form"]["errors"];
export type ContactValues = Record<ContactField, string>;

// Campo escondido que pessoas nao veem; se vier preenchido, quem enviou foi um bot
export const HONEYPOT_FIELD = "website";

export const contactLimits = {
    name: { min: 2, max: 80 },
    email: { max: 254 },
    message: { min: 10, max: 2000 },
} as const;

// As mensagens de erro sao chaves do dicionario; o formulario traduz no idioma da pagina
const error = (key: ContactErrorKey) => ({ error: key });

export const contactSchema = z.object({
    name: z
        .string()
        .min(contactLimits.name.min, error("nameRequired"))
        .max(contactLimits.name.max, error("nameTooLong")),
    email: z.email(error("emailInvalid")).max(contactLimits.email.max, error("emailInvalid")),
    message: z
        .string()
        .min(contactLimits.message.min, error("messageTooShort"))
        .max(contactLimits.message.max, error("messageTooLong")),
});

export function readContactForm(formData: FormData): ContactValues {
    const read = (field: ContactField) => {
        const value = formData.get(field);
        return typeof value === "string" ? value.trim() : "";
    };

    return { name: read("name"), email: read("email"), message: read("message") };
}

export type ContactValidation =
    | { success: true; data: ContactValues }
    | { success: false; errors: Partial<Record<ContactField, ContactErrorKey>> };

export function validateContact(values: ContactValues): ContactValidation {
    const result = contactSchema.safeParse(values);
    if (result.success) return { success: true, data: result.data };

    const errors: Partial<Record<ContactField, ContactErrorKey>> = {};
    for (const issue of result.error.issues) {
        const field = issue.path[0] as ContactField;
        // Mostra so o primeiro erro de cada campo
        errors[field] ??= issue.message as ContactErrorKey;
    }
    return { success: false, errors };
}
