import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Timeline from "@/components/sections/Timeline";
import { getDictionary, locales } from "@/lib/i18n";

describe("<Timeline />", () => {
    it("lista os marcos em ordem e destaca o atual", () => {
        const dict = getDictionary("pt");
        render(<Timeline dict={dict} />);

        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(dict.timeline.items.length);

        dict.timeline.items.forEach((item, i) => {
            expect(within(items[i]).getByRole("heading", { level: 3 })).toHaveTextContent(item.title);
            expect(items[i].hasAttribute("data-current")).toBe(item.current);
        });

        expect(screen.getAllByText(dict.timeline.current)).toHaveLength(
            dict.timeline.items.filter((item) => item.current).length,
        );
    });

    it("tem os mesmos marcos em todos os idiomas", () => {
        const [base, ...others] = locales.map((locale) => getDictionary(locale).timeline.items);
        for (const items of others) {
            expect(items.map((item) => [item.period, item.current])).toEqual(
                base.map((item) => [item.period, item.current]),
            );
        }
    });
});
