import { FaGithub, FaCodeBranch } from "react-icons/fa6";
import Reveal from "../ui/Reveal";
import button from "../ui/Button.module.css";
import styles from "./GitHubActivity.module.css";
import { formatRelativeDate, getGitHubSummary, getLanguageColor } from "@/lib/github";
import { siteConfig } from "@/lib/site";
import type { Dictionary, Locale } from "@/lib/i18n";

interface GitHubActivityProps {
    lang: Locale;
    dict: Dictionary;
}

export default async function GitHubActivity({ lang, dict }: GitHubActivityProps) {
    const t = dict.github;
    const summary = await getGitHubSummary();

    if (!summary || summary.recent.length === 0) return null;

    const profileUrl = `https://github.com/${siteConfig.githubUser}`;

    return (
        <section id="github" className={`container ${styles.github}`} aria-labelledby="github-title">
            <div className={styles.head}>
                <h2 id="github-title">{t.title}</h2>
                <p>{t.subtitle}</p>
            </div>

            <Reveal>
                <div className={styles.overview}>
                    <dl className={styles.stats}>
                        <div className={styles.stat}>
                            <dt>{t.publicRepos}</dt>
                            <dd>{summary.totalRepos}</dd>
                        </div>
                        <div className={styles.stat}>
                            <dt>{t.languages}</dt>
                            <dd>{summary.languages.length}</dd>
                        </div>
                    </dl>

                    {summary.languages.length > 0 && (
                        <div className={styles.languages}>
                            <div className={styles.bar} role="img" aria-label={t.languagesChart}>
                                {summary.languages.map((lang) => (
                                    // flex pela contagem (e nao pelo percentual arredondado) para a barra fechar 100%
                                    <span
                                        key={lang.name}
                                        style={{ flex: lang.count, background: lang.color }}
                                    />
                                ))}
                            </div>
                            <ul className={styles.legend}>
                                {summary.languages.map((lang) => (
                                    <li key={lang.name}>
                                        <span className={styles.dot} style={{ background: lang.color }} />
                                        {lang.name}
                                        <span className={styles.percent}>{lang.percent}%</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Reveal>

            <ul className={styles.repos}>
                {summary.recent.map((repo, i) => (
                    <li key={repo.name}>
                        <Reveal delay={i * 0.08} className={styles.revealFill}>
                            <a
                                href={repo.html_url}
                                className={styles.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className={styles.repoName}>
                                    <FaCodeBranch size={13} />
                                    {repo.name}
                                </span>
                                {repo.description && (
                                    <span className={styles.repoDescription}>{repo.description}</span>
                                )}
                                <span className={styles.repoMeta}>
                                    {repo.language && (
                                        <span className={styles.repoLanguage}>
                                            <span
                                                className={styles.dot}
                                                style={{ background: getLanguageColor(repo.language) }}
                                            />
                                            {repo.language}
                                        </span>
                                    )}
                                    <span>
                                        {t.updated} {formatRelativeDate(repo.pushed_at, lang)}
                                    </span>
                                </span>
                            </a>
                        </Reveal>
                    </li>
                ))}
            </ul>

            <a
                href={profileUrl}
                className={`${button.btn} ${button.ghost} ${styles.profileLink}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaGithub size={16} />
                {t.viewProfile}
            </a>
        </section>
    );
}
