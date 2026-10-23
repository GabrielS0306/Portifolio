"use client";

import { useRef, useState, type ComponentProps } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa6";
import { useLocale } from "../LocaleProvider";
import styles from "./CodeBlock.module.css";

// Substitui o <pre> gerado pelo rehype-pretty-code, acrescentando o botao de copiar
export default function CodeBlock(props: ComponentProps<"pre">) {
    const t = useLocale().dict.blog;
    const preRef = useRef<HTMLPreElement>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const text = preRef.current?.textContent ?? "";
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Sem acesso a area de transferencia (ex.: sem HTTPS), o botao so nao faz nada
        }
    };

    return (
        <div className={styles.wrapper}>
            <pre ref={preRef} {...props} />
            <button
                type="button"
                className={styles.copy}
                onClick={handleCopy}
                data-copied={copied}
                aria-label={copied ? t.codeCopied : t.copyCode}
            >
                {copied ? <FaCheck size={13} /> : <FaRegCopy size={13} />}
            </button>
        </div>
    );
}
