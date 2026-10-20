import { FaLayerGroup, FaServer, FaDatabase, FaCodeBranch } from "react-icons/fa6";
import { IconType } from "react-icons";
import { techIcons } from "@/lib/techIcons";

interface SkillGroup {
    title: string;
    icon: IconType;
    items: string[];
}

const skillGroups: SkillGroup[] = [
    {
        title: "Front-End",
        icon: FaLayerGroup,
        items: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
        title: "Back-End",
        icon: FaServer,
        items: ["PHP", "Laravel"],
    },
    {
        title: "Banco de Dados",
        icon: FaDatabase,
        items: ["MySQL", "PostgreSQL"],
    },
    {
        title: "Ferramentas",
        icon: FaCodeBranch,
        items: ["Git", "GitHub", "Docker"],
    },
];

export default function Skills() {
    return (
        <div className="skills">
            {skillGroups.map((group) => {
                const GroupIcon = group.icon;

                return (
                    <div key={group.title} className="skills-group">
                        <h4 className="skills-group-title">
                            <GroupIcon size={13} />
                            {group.title}
                        </h4>

                        <div className="skills-chips">
                            {group.items.map((label) => {
                                const Icon = techIcons[label];
                                return (
                                    <span key={label} className="skills-chip">
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
