import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Callout from "@/components/blog/Callout";
import CodeBlock from "@/components/blog/CodeBlock";

// Componentes disponiveis em todo arquivo .mdx (obrigatorio para o @next/mdx no App Router)
const components: MDXComponents = {
    a: ({ href = "", ...props }) =>
        href.startsWith("/") || href.startsWith("#") ? (
            <Link href={href} {...props} />
        ) : (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
        ),
    pre: CodeBlock,
    Callout,
};

export function useMDXComponents(): MDXComponents {
    return components;
}
