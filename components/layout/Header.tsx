import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
    return (
        <header className="site-header">
            <div className="container nav">
                <a href="#top" className="logo">gabriel<span>.</span></a>
                <nav>
                    <a href="#projetos">Projetos</a>
                    <a href="#sobre">Sobre</a>
                    <a href="#contato">Contato</a>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    )
}