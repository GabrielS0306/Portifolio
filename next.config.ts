import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {};

// Os posts do blog (content/blog/*.mdx) sao importados pelas paginas, nao viram rotas sozinhos.
// Com Turbopack os plugins precisam ser passados pelo nome, com opcoes serializaveis.
const withMDX = createMDX({
    options: {
        remarkPlugins: ["remark-gfm", "remark-frontmatter"],
        rehypePlugins: [
            "rehype-slug",
            [
                "rehype-pretty-code",
                {
                    theme: { dark: "github-dark-dimmed", light: "github-light" },
                    keepBackground: false,
                },
            ],
        ],
    },
});

export default withMDX(nextConfig);
