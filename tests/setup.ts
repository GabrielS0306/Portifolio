import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
    cleanup();
});

// Fora do App Router nao existe roteador; simula o necessario para o Header e o LanguageToggle
export const routerPush = vi.fn();

vi.mock("next/navigation", () => ({
    usePathname: () => "/pt",
    useRouter: () => ({ push: routerPush }),
}));

// O jsdom nao implementa IntersectionObserver (usado pelo framer-motion e pelo useActiveSection)
class IntersectionObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// O jsdom nao implementa matchMedia (usado pelo next-themes e pelo framer-motion)
vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
);
