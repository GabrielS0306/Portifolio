import { FaLayerGroup, FaServer, FaDatabase, FaCodeBranch } from "react-icons/fa6";
import { IconType } from "react-icons";
import { techIcons } from "@/lib/techIcons";
import type { Dictionary } from "@/lib/i18n";
import styles from "./Skills.module.css";

type GroupKey = keyof Dictionary["about"]["skillGroups"];

interface SkillGroup {
    key: GroupKey;
    icon: IconType;
    items: string[];
}

const skillGroups: SkillGroup[] = [
    {
        key: "frontend",
        icon: FaLayerGroup,
        items: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
        key: "backend",
        icon: FaServer,
        items: ["PHP", "Laravel"],
    },
    {
        key: "database",
        icon: FaDatabase,
        items: ["MySQL", "PostgreSQL"],
    },
    {
        key: "tools",
        icon: FaCodeBranch,
        items: ["Git", "GitHub", "Docker"],
    },
];

export default function Skills({ groupTitles }: { groupTitles: Record<GroupKey, string> }) {
    return (
        <div className={styles.skills}>
            {skillGroups.map((group) => {
                const GroupIcon = group.icon;

                return (
                    <div key={group.key} className={styles.group}>
                        <h4 className={styles.groupTitle}>
                            <GroupIcon size={13} />
                            {groupTitles[group.key]}
                        </h4>

                        <div className={styles.chips}>
                            {group.items.map((label) => {
                                const Icon = techIcons[label];
                                return (
                                    <span key={label} className={styles.chip}>
                                        {Icon && <Icon size={14} />}
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
