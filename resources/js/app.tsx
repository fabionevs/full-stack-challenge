import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import BootstrapLayout from "./Layouts/BootstrapLayout";
import { route } from 'ziggy-js';
import { Ziggy } from './ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

declare global {
    interface Window {
        route: any;
    }
}

window.route = (name: string, params?: any, absolute?: boolean) => route(name, params, absolute, Ziggy);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.tsx", { eager: true });
        let page: any = pages[`./Pages/${name}.tsx`];
        page.default.layout = (page: any) => <BootstrapLayout children={page} />;
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
