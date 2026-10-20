import { ImageResponse } from "next/og";
import { defaultLocale, getDictionary, hasLocale } from "@/lib/i18n";

export const alt = "Gabriel — Full-Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = getDictionary(hasLocale(lang) ? lang : defaultLocale).hero;

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                background: "#0b0f14",
                padding: "80px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 20px",
                    borderRadius: "999px",
                    background: "rgba(34, 197, 94, 0.12)",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    color: "#4ade80",
                    fontSize: "22px",
                    fontWeight: 600,
                    marginBottom: "36px",
                }}
            >
                {t.status}
            </div>

            <div
                style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    letterSpacing: "3px",
                    color: "#3b82f6",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                }}
            >
                {t.eyebrow}
            </div>

            <div
                style={{
                    fontSize: "72px",
                    fontWeight: 900,
                    color: "#e6edf3",
                    lineHeight: 1.1,
                    maxWidth: "900px",
                }}
            >
                {`${t.titleStart} ${t.taglineWords[0]}.`}
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "48px",
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#e6edf3",
                }}
            >
                gabriel<span style={{ color: "#3b82f6" }}>.</span>
            </div>
        </div>,
        { ...size },
    );
}
