import { FaLayerGroup } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaServer } from "react-icons/fa6";
import { FaDatabase } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa6";
import "./Skills.css"

export default function Skills() {
    return (
        <ul className="skills">
            <li>
                <FaLayerGroup />
                JavaScript / TypeScript
            </li>

            <li>
                <FaPlus />
                React / Next.js
            </li>

            <li>
                <FaServer />
                Node.js / Express
            </li>

            <li>
                <FaDatabase />
                SQL / NoSQL
            </li>

            <li>
                <FaCodeBranch />
                Git / GitHub
            </li>
        </ul>
    )
}