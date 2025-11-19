import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function BootstrapLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* CSS principal do template */}
            <link rel="stylesheet" href="/css/main.css" />

            {/* Header do template */}
            <header className="header sticky-bar">
                <div className="container">
                    <div className="header-main">
                        <a className="brand-logo" href="/">
                            <img src="/img/logo.png" alt="logo" style={{width: '138px', height: '48px'}} />
                        </a>

                        <nav className="main-menu">
                            <ul>
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/jobs">Jobs</Link></li>
                                <li><Link href="/companies">Companies</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="main">{children}</main>

            {/* JS do template */}
            <script src="/js/bootstrap.bundle.min.js"></script>
            <script src="/js/main.js"></script>
        </>
    );
}
