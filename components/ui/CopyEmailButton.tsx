"use client";

import { useState } from "react";
import { FaEnvelope, FaCheck } from "react-icons/fa6";
import { useLocale } from "../LocaleProvider";

interface CopyEmailButtonProps {
    email: string;
    className: string;
    labelClassName?: string;
    iconClassName?: string;
}

export default function CopyEmailButton({
    email,
    className,
    labelClassName,
    iconClassName,
}: CopyEmailButtonProps) {
    const [copied, setCopied] = useState(false);
    const t = useLocale().dict.contact;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Se a API de clipboard falhar (ex: navegador antigo ou sem HTTPS),
            // abre o cliente de e-mail como alternativa.
            window.location.href = `mailto:${email}`;
        }
    };

    return (
        <button
            type="button"
            className={className}
            data-copied={copied}
            onClick={handleCopy}
            aria-label={copied ? t.emailCopied : t.copyEmail}
        >
            <span className={iconClassName}>{copied ? <FaCheck size={16} /> : <FaEnvelope size={16} />}</span>
            {labelClassName && <span className={labelClassName}>{copied ? t.copied : t.email}</span>}
        </button>
    );
}
