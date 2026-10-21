"use client";

import { useActionState } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { HONEYPOT_FIELD, contactLimits, type ContactField } from "@/lib/contact";
import { useLocale } from "../LocaleProvider";
import buttonStyles from "./Button.module.css";
import styles from "./ContactForm.module.css";

const initialState: ContactState = { status: "idle" };

export default function ContactForm() {
    const t = useLocale().dict.contact.form;
    const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

    // Depois do envio o React limpa o formulario; em caso de erro os valores voltam pelo estado
    const values = state.status === "invalid" || state.status === "error" ? state.values : undefined;
    const errors = state.status === "invalid" ? state.errors : {};

    const fieldProps = (field: ContactField) => ({
        id: `contact-${field}`,
        name: field,
        defaultValue: values?.[field],
        "aria-invalid": errors[field] ? true : undefined,
        "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    });

    const fieldError = (field: ContactField) =>
        errors[field] && (
            <p id={`contact-${field}-error`} className={styles.fieldError}>
                {t.errors[errors[field]]}
            </p>
        );

    return (
        // noValidate: a validacao fica com o servidor, para as mensagens sairem no idioma da pagina
        <form action={formAction} className={styles.form} aria-label={t.label} noValidate>
            <div className={styles.row}>
                <div className={styles.field}>
                    <label htmlFor="contact-name">{t.name}</label>
                    <input
                        {...fieldProps("name")}
                        type="text"
                        autoComplete="name"
                        placeholder={t.namePlaceholder}
                        maxLength={contactLimits.name.max}
                        required
                    />
                    {fieldError("name")}
                </div>

                <div className={styles.field}>
                    <label htmlFor="contact-email">{t.email}</label>
                    <input
                        {...fieldProps("email")}
                        type="email"
                        autoComplete="email"
                        placeholder={t.emailPlaceholder}
                        maxLength={contactLimits.email.max}
                        required
                    />
                    {fieldError("email")}
                </div>
            </div>

            <div className={styles.field}>
                <label htmlFor="contact-message">{t.message}</label>
                <textarea
                    {...fieldProps("message")}
                    rows={5}
                    placeholder={t.messagePlaceholder}
                    maxLength={contactLimits.message.max}
                    required
                />
                {fieldError("message")}
            </div>

            <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor={`contact-${HONEYPOT_FIELD}`}>{t.honeypot}</label>
                <input
                    id={`contact-${HONEYPOT_FIELD}`}
                    name={HONEYPOT_FIELD}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            <div className={styles.footer}>
                <button
                    type="submit"
                    className={`${buttonStyles.btn} ${buttonStyles.primary}`}
                    disabled={pending}
                >
                    <FaPaperPlane size={14} aria-hidden="true" />
                    {pending ? t.sending : t.submit}
                </button>

                <p className={styles.status} data-status={state.status} role="status">
                    {state.status === "success" && t.success}
                    {state.status === "error" && t.error}
                </p>
            </div>
        </form>
    );
}
