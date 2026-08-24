import { FaLayerGroup, FaServer, FaDatabase, FaCodeBranch } from "react-icons/fa6";
import {
    SiJavascript,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiPhp,
    SiLaravel,
    SiMysql,
    SiPostgresql,
    SiGit,
    SiGithub,
    SiDocker,
} from "react-icons/si";
import { IconType } from "react-icons";

interface SkillItem {
    label: string;
    icon: IconType;
}

interface SkillGroup {
    title: string;
    icon: IconType;
    items: SkillItem[];
}

const skillGroups: SkillGroup[] = [
    {
        title: "Front-End",
        icon: FaLayerGroup,
        items: [
            { label: "JavaScript", icon: SiJavascript },
            { label: "TypeScript", icon: SiTypescript },
            { label: "React", icon: SiReact },
            { label: "Next.js", icon: SiNextdotjs },
            { label: "Tailwind CSS", icon: SiTailwindcss },
        ],
    },
    {
        title: "Back-End",
        icon: FaServer,
        items: [
            { label: "PHP", icon: SiPhp },
            { label: "Laravel", icon: SiLaravel },
        ],
    },
    {
        title: "Banco de Dados",
        icon: FaDatabase,
        items: [
            { label: "MySQL", icon: SiMysql },
            { label: "PostgreSQL", icon: SiPostgresql },
        ],
    },
    {
        title: "Ferramentas",
        icon: FaCodeBranch,
        items: [
            { label: "Git", icon: SiGit },
            { label: "GitHub", icon: SiGithub },
            { label: "Docker", icon: SiDocker },
        ],
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
                            {group.items.map(({ label, icon: Icon }) => (
                                <span key={label} className="skills-chip">
                                    <Icon size={14} />
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}