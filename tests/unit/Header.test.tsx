import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/layout/Header";
import { navItems } from "@/lib/site";
import { getDictionary } from "@/lib/i18n";
import { routerPush } from "../setup";
import { renderWithLocale } from "../utils";

const dict = getDictionary("pt");

function getMobileMenu() {
    return document.getElementById("mobile-menu")!;
}

describe("<Header />", () => {
    it("tem um link para a pagina de cada item do menu", () => {
        renderWithLocale(<Header />);

        for (const { path, key } of navItems) {
            const links = screen.getAllByRole("link", { name: dict.nav[key], hidden: true });
            expect(links.every((link) => link.getAttribute("href") === `/pt/${path}`)).toBe(true);
        }
    });

    it("so mostra o link do blog quando existe post publicado", () => {
        const { unmount } = renderWithLocale(<Header />);
        expect(screen.queryByRole("link", { name: "Blog", hidden: true })).toBeNull();
        unmount();

        renderWithLocale(<Header showBlog />);
        const links = screen.getAllByRole("link", { name: "Blog", hidden: true });
        expect(links).toHaveLength(2);
        expect(links.every((link) => link.getAttribute("href") === "/pt/blog")).toBe(true);
    });

    it("menu mobile comeca fechado e inerte", () => {
        renderWithLocale(<Header />);

        const toggle = screen.getByRole("button", { name: "Abrir menu" });
        expect(toggle).toHaveAttribute("aria-expanded", "false");
        expect(getMobileMenu()).toHaveAttribute("inert");
    });

    it("abre o menu ao clicar no botao", async () => {
        const user = userEvent.setup();
        renderWithLocale(<Header />);

        await user.click(screen.getByRole("button", { name: "Abrir menu" }));

        expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-expanded", "true");
        expect(getMobileMenu()).not.toHaveAttribute("inert");
    });

    it("fecha o menu com Esc e devolve o foco ao botao", async () => {
        const user = userEvent.setup();
        renderWithLocale(<Header />);

        await user.click(screen.getByRole("button", { name: "Abrir menu" }));
        await user.keyboard("{Escape}");

        const toggle = screen.getByRole("button", { name: "Abrir menu" });
        expect(toggle).toHaveAttribute("aria-expanded", "false");
        expect(toggle).toHaveFocus();
        expect(getMobileMenu()).toHaveAttribute("inert");
    });

    it("fecha o menu ao clicar em um link", async () => {
        const user = userEvent.setup();
        renderWithLocale(<Header />);

        await user.click(screen.getByRole("button", { name: "Abrir menu" }));
        const mobileLink = getMobileMenu().querySelector("a")!;
        await user.click(mobileLink);

        expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveAttribute("aria-expanded", "false");
    });

    it("botao de idioma mostra a opcao de ingles e troca a URL", async () => {
        const user = userEvent.setup();
        renderWithLocale(<Header />);

        const [toggle] = screen.getAllByRole("button", { name: "Switch to English" });
        await user.click(toggle);

        expect(routerPush).toHaveBeenCalledWith("/en");
        expect(document.cookie).toContain("NEXT_LOCALE=en");
    });
});
