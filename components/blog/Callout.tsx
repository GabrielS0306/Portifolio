import type { ReactNode } from "react";
import { FaCircleInfo, FaTriangleExclamation } from "react-icons/fa6";
import styles from "./Callout.module.css";

interface CalloutProps {
    type?: "info" | "warning";
    children: ReactNode;
}

export default function Callout({ type = "info", children }: CalloutProps) {
    const Icon = type === "warning" ? FaTriangleExclamation : FaCircleInfo;

    return (
        <aside className={styles.callout} data-type={type}>
            <Icon className={styles.icon} size={16} aria-hidden="true" />
            <div className={styles.body}>{children}</div>
        </aside>
    );
}
