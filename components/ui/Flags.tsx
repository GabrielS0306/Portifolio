// Bandeiras simplificadas em SVG (emojis de bandeira nao aparecem no Windows)

export function FlagBR() {
    return (
        <svg viewBox="0 0 30 30" aria-hidden="true">
            <rect width="30" height="30" fill="#009b3a" />
            <polygon points="2,15 15,5 28,15 15,25" fill="#fedf00" />
            <circle cx="15" cy="15" r="6" fill="#002776" />
            <path d="M9.3 13.6 Q15 12.2 20.8 15.6" stroke="#fff" strokeWidth="1.1" fill="none" />
        </svg>
    );
}

export function FlagUS() {
    const stripeHeight = 30 / 13;

    return (
        <svg viewBox="0 0 30 30" aria-hidden="true">
            <rect width="30" height="30" fill="#fff" />
            {Array.from({ length: 7 }, (_, i) => (
                <rect key={i} y={i * 2 * stripeHeight} width="30" height={stripeHeight} fill="#b22234" />
            ))}
            <rect width="14" height={stripeHeight * 7} fill="#3c3b6e" />
            {[3, 7, 11].map((cx) =>
                [3.5, 8, 12.5].map((cy) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.9" fill="#fff" />
                )),
            )}
        </svg>
    );
}
