import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function BootstrapLayout({ children }: { children: React.ReactNode }) {
    // Pegando o usuário logado (se houver)
    const { auth }: any = usePage().props;

    return (
        <>
            {/* CSS principal do template */}
            <link rel="stylesheet" href="/css/main.css" />

            <header className="header sticky-bar">
                <div className="container">
                    <div className="main-header">
                        <div className="header-left">
                            <div className="header-logo">
                                <a href="/" className="d-flex">
                                    <img
                                        alt="jobhub"
                                        src="/img/logo.png"
                                        style={{ width: '138px', height: '43px' }}
                                    />
                                </a>
                            </div>

                            <div className="header-nav">
                                <nav className="nav-main-menu d-none d-xl-block">
                                    <ul className="main-menu">
                                        <li>
                                            <a className="active" href="/">
                                                Home
                                            </a>
                                        </li>
                                        <li >
                                            <a href="/jobs">Browse Jobs</a>
                                        </li>
                                        <li >
                                            <a href="/jobs">Companies</a>
                                        </li>
                                    </ul>
                                </nav>

                                <div className="burger-icon burger-icon-white">
                                    <span className="burger-icon-top" />
                                    <span className="burger-icon-mid" />
                                    <span className="burger-icon-bottom" />
                                </div>
                            </div>
                        </div>

                        <div className="header-right">
                            <div className="block-signin">

                                {/* Conteúdo visível para TODOS */}
                                <a href="#" className="text-link-bd-btom hover-up">
                                    Apply Now
                                </a>

                                {/* ⬇️ Mostrar apenas se NÃO estiver logado */}
                                {!auth?.user && (
                                    <Link
                                        className="btn btn-default btn-shadow ml-40 hover-up"
                                        href="/login"
                                    >
                                        Sign in
                                    </Link>
                                )}

                                {/* ⬇️ Mostrar apenas se estiver logado */}
                                {auth?.user && (
                                    <Link
                                        className="btn btn-default btn-shadow ml-40 hover-up"
                                        href="/dashboard"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="main">{children}</main>

            <script src="/js/bootstrap.bundle.min.js"></script>
            <script src="/js/main.js"></script>
            <script defer src="/js/vendor/modernizr-3.6.0.min.js"></script>
            <script defer src="/js/vendor/jquery-3.6.0.min.js"></script>
            <script defer src="/js/vendor/bootstrap.bundle.min.js"></script>
            <script defer src="/js/plugins/waypoints.js"></script>
            <script defer src="/js/plugins/magnific-popup.js"></script>
            <script defer src="/js/plugins/perfect-scrollbar.min.js"></script>
            <script defer src="/js/plugins/select2.min.js"></script>
            <script defer src="/js/plugins/swiper-bundle.min.js"></script>
            <script defer src="/js/plugins/jquery.circliful.js"></script>
            <script defer src="/js/main.js?v=1.0"></script>
        </>
    );
}
