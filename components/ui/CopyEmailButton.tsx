"use client";

import { useState } from "react";
import { FaEnvelope, FaCheck } from "react-icons/fa6";

interface CopyEmailButtonProps {
    email: string;
    className: string;
    labelClassName?: string;
    iconClassName?: string;
}

export default function CopyEmailButton({ email, className, labelClassName, iconClassName }: CopyEmailButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback silencioso: se a API de clipboard falhar (ex: navegador antigo),
            // nao quebra a pagina, apenas nao mostra o feedback de copiado.
        }
    };

    return (
        <button
            type="button"
            className={`${className}${copied ? " is-copied" : ""}`}
            onClick={handleCopy}
            aria-label={copied ? "E-mail copiado" : "Copiar e-mail"}
        >
            <span className={iconClassName}>
                {copied ? <FaCheck size={16} /> : <FaEnvelope size={16} />}
            </span>
            {labelClassName && (
                <span className={labelClassName}>{copied ? "Copiado!" : "E-mail"}</span>
            )}
        </button>
    );
}