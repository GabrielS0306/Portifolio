import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/layout/Header";
import { navItems } from "@/lib/site";

function getMobileMenu() {
    return document.getElementById("mobile-menu")!;
}

describe("<Header />", () => {
    it("tem um link para cada secao do menu", () => {
        render(<Header />);

        for (const { id, label } of navItems) {
            const links = screen.getAllByRole("link", { name: label, hidden: true });
            expect(links.every((link) => link.getAttribute("href") === `/#${id}`)).toBe(true);
        }
    });

    it("menu mobile comeca fechado e inerte", () => {
        render(<Header />);

        const toggle = screen.getByRole("button", { name: "Abrir menu" });
        expect(toggle).toHaveAttribute("aria-expanded", "false");
        expect(getMobileMenu()).toHaveAttribute("inert");
    });

    it("abre o menu ao clicar no botao", async () => {
        const user = userEvent.setup();
        render(<Header />);

        await user.click(screen.getByRole("button", { name: "Abrir menu" }));

        expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-expanded", "true");
        expect(getMobileMenu()).not.toHaveAttribute("inert");
    });

    it("fecha o menu com Esc e devolve o foco ao botao", async () => {
        const user = userEvent.setup();
        render(<Header />);

        await user.click(screen.getByRole("button", { name: "Abrir menu" }));
        await user.keyboard("{Escape}");

        const toggle = screen.getByRole("button", { name: "Abrir menu" });
        expect(toggle).toHaveAttribute("aria-expanded", "false");
        expect(toggle).toHaveFocus();
        expect(getMobileMenu()).toHaveAttribute("inert");
    });

    it("fecha o menu ao clicar em um link", async () => {
        const user = userEvent.setup();
        render(<Header />);

        await user.click(screen.getByRole("button", { name: "Abrir menu" }));
        const mobileLink = getMobileMenu().querySelector("a")!;
        await user.click(mobileLink);

        expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveAttribute("aria-expanded", "false");
    });
});
