"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["aplicações completas", "APIs escaláveis", "interfaces intuitivas"];

export default function AnimatedTagline() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % words.length);
        }, 2500);

        return () => clearInterval(id);
    }, []);

    return (
        <span className="tagline-word">
            <AnimatePresence mode="wait">
                <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                style={{ display: "inline-block" }}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}