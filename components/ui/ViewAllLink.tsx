import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import styles from "./ViewAllLink.module.css";

// Link "Ver todos" usado nos resumos da home para levar a pagina completa
export default function ViewAllLink({ href, children }: { href: string; children: string }) {
    return (
        <Link href={href} className={styles.viewAll}>
            {children}
            <FaArrowRight size={12} aria-hidden="true" />
        </Link>
    );
}
