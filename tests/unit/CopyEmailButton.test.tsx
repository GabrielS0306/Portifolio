import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CopyEmailButton from "@/components/ui/CopyEmailButton";

const EMAIL = "teste@exemplo.com";

describe("<CopyEmailButton />", () => {
    it("copia o e-mail e mostra o feedback", async () => {
        const user = userEvent.setup();
        const writeText = vi.spyOn(navigator.clipboard, "writeText");

        render(<CopyEmailButton email={EMAIL} className="btn" labelClassName="label" />);
        const button = screen.getByRole("button", { name: "Copiar e-mail" });
        expect(button).toHaveAttribute("data-copied", "false");

        await user.click(button);

        expect(writeText).toHaveBeenCalledWith(EMAIL);
        expect(screen.getByRole("button", { name: "E-mail copiado" })).toHaveAttribute("data-copied", "true");
        expect(screen.getByText("Copiado!")).toBeInTheDocument();
    });

    it("so mostra o rotulo quando labelClassName e informado", () => {
        render(<CopyEmailButton email={EMAIL} className="btn" />);

        expect(screen.queryByText("E-mail")).not.toBeInTheDocument();
    });
});
