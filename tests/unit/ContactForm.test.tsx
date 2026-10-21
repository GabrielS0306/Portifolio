import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import type { ContactState } from "@/app/actions/contact";
import ContactForm from "@/components/ui/ContactForm";
import { renderWithLocale } from "../utils";

const sendContactMessage = vi.fn<(prev: ContactState, data: FormData) => Promise<ContactState>>();

vi.mock("@/app/actions/contact", () => ({
    sendContactMessage: (prev: ContactState, data: FormData) => sendContactMessage(prev, data),
}));

const submit = () => fireEvent.click(screen.getByRole("button", { name: /enviar mensagem/i }));

describe("<ContactForm />", () => {
    beforeEach(() => {
        sendContactMessage.mockReset();
    });

    it("tem campos acessiveis pelo rotulo", () => {
        renderWithLocale(<ContactForm />);

        expect(screen.getByRole("form", { name: "Formulário de contato" })).toBeInTheDocument();
        expect(screen.getByLabelText("Nome")).toHaveAttribute("autocomplete", "name");
        expect(screen.getByLabelText("E-mail")).toHaveAttribute("type", "email");
        expect(screen.getByLabelText("Mensagem")).toBeInTheDocument();
    });

    it("mostra os erros traduzidos e mantem o que foi digitado", async () => {
        const values = { name: "Maria", email: "x", message: "Ola, tudo bem com voce?" };
        sendContactMessage.mockResolvedValue({
            status: "invalid",
            values,
            errors: { email: "emailInvalid" },
        });
        renderWithLocale(<ContactForm />);

        submit();

        const email = screen.getByLabelText("E-mail");
        await waitFor(() => expect(email).toHaveAttribute("aria-invalid", "true"));
        expect(email).toHaveAccessibleDescription("Informe um e-mail válido.");
        expect(email).toHaveValue("x");
        expect(screen.getByLabelText("Nome")).toHaveValue("Maria");
    });

    it("avisa quando a mensagem foi enviada", async () => {
        sendContactMessage.mockResolvedValue({ status: "success" });
        renderWithLocale(<ContactForm />, "en");

        fireEvent.click(screen.getByRole("button", { name: /send message/i }));

        expect(await screen.findByRole("status")).toHaveTextContent("Message sent!");
    });
});
