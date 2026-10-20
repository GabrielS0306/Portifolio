import type { ComponentProps } from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import Card from "@/components/ui/Card";
import { renderWithLocale } from "../utils";

const baseProject: ComponentProps<typeof Card> = {
    title: "Projeto Teste",
    description: "Descricao do projeto teste.",
    tech: ["React", "TypeScript"],
};

describe("<Card />", () => {
    it("mostra titulo, descricao e tecnologias", () => {
        renderWithLocale(<Card {...baseProject} />);

        expect(screen.getByRole("heading", { name: "Projeto Teste" })).toBeInTheDocument();
        expect(screen.getByText("Descricao do projeto teste.")).toBeInTheDocument();
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    it("mostra placeholder quando nao ha imagem", () => {
        const { container } = renderWithLocale(<Card {...baseProject} />);

        expect(screen.getByText("Preview em construção")).toBeInTheDocument();
        // Os icones SVG das tecnologias tambem tem role "img", entao busca a tag <img> diretamente
        expect(container.querySelector("img")).toBeNull();
    });

    it("mostra a imagem quando informada", () => {
        renderWithLocale(<Card {...baseProject} image="/images/teste.png" />);

        expect(screen.getByAltText("Imagem do projeto Projeto Teste")).toBeInTheDocument();
    });

    it("so mostra os links que existem", () => {
        renderWithLocale(<Card {...baseProject} codeUrl="https://github.com/exemplo" />);

        expect(screen.getByRole("link", { name: "Código Projeto Teste" })).toHaveAttribute(
            "href",
            "https://github.com/exemplo",
        );
        expect(screen.queryByRole("link", { name: "Demo Projeto Teste" })).not.toBeInTheDocument();
    });

    it("abre links externos em nova aba com rel seguro", () => {
        renderWithLocale(<Card {...baseProject} demoUrl="https://exemplo.com" />);

        const link = screen.getByRole("link", { name: "Demo Projeto Teste" });
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("mostra o selo de projeto em desenvolvimento", () => {
        renderWithLocale(<Card {...baseProject} status="em-desenvolvimento" />);

        expect(screen.getByText("Em Desenvolvimento")).toBeInTheDocument();
    });

    it("usa os textos em ingles na versao /en", () => {
        renderWithLocale(<Card {...baseProject} codeUrl="https://github.com/exemplo" />, "en");

        expect(screen.getByText("Preview coming soon")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Code Projeto Teste" })).toBeInTheDocument();
    });
});
