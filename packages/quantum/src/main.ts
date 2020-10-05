import createElement from "./app/vdom/createElement";
import diff from "./app/vdom/diff";
import mount from "./app/vdom/mount";
import render from "./app/vdom/render";

import { div, span } from './app/vdom/elements';

const createVApp = (timer: { hours: number; minutes: number; seconds: number; }) => div({
    attrs: {
        id: 'app',
    },
    children: [
        span({
            children: [
                String(timer.hours),
                'h '
            ],
        }),
        span({
            children: [
                String(timer.minutes),
                'm '
            ],
        }),
        span({
            children: [
                String(timer.seconds),
                's'
            ],
        }),
    ]
});

const timer = () => {
    const now = new Date();

    return {
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
    };
};

let vApp = createVApp(timer());
const $app = render(vApp);
const $root = document.getElementById('root');
let $rootEl = mount($app, $root);

function bootstrap(): void {
    setInterval(() => {
        const vNewApp = createVApp(timer());
        const patch = diff(vApp, vNewApp);
        $rootEl = patch($rootEl);

        vApp = vNewApp;
    }, 1000);
}

bootstrap();
