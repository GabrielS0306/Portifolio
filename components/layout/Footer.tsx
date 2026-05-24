import "./Footer.css";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
            <p>
                &copy; {new Date().getFullYear()} Gabriel. Feito com carinho e código.</p>
            </div>
        </footer>
    )
}