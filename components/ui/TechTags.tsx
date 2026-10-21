import { techIcons } from "@/lib/techIcons";
import styles from "./TechTags.module.css";

export default function TechTags({ tech, className }: { tech: string[]; className?: string }) {
    return (
        <div className={`${styles.tags} ${className ?? ""}`}>
            {tech.map((tag) => {
                const Icon = techIcons[tag];
                return (
                    <span key={tag}>
                        {Icon && <Icon size={12} />}
                        {tag}
                    </span>
                );
            })}
        </div>
    );
}
