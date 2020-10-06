import createElement from "./app/vdom/createElement";
import diff from "./app/vdom/diff";
import mount from "./app/vdom/mount";
import render from "./app/vdom/render";

import qElements from './app/vdom/elements';
const {
    div,
    span,
    a,
    button,
} = qElements;

const createVApp = (timer: { hours: number; minutes: number; seconds: number; }) =>
    div(
        ':id=test',
        'Timer : ',
        span(
            String(timer.hours),
            'h '
        ),
        span(
            String(timer.minutes),
            'm '
        ),
        span(
            String(timer.seconds),
            's'
        ),
        div(),
        a(
            span(
                ':style=color: blue;',
                'G'
            ),
            span(
                ':style=color: red;',
                'O'
            ),
            span(
                ':style=color: yellow;',
                'O'
            ),
            span(
                ':style=color: blue;',
                'G'
            ),
            span(
                ':style=color: green;',
                'L'
            ),
            span(
                ':style=color: E;',
                'E'
            ),
            ':href=https://google.fr',
            ':target=_blank'
        ),
        button(
            ':class=btn btn--primary btn--large',
            // ':style',
            'Mon petit bouton'
        ),
    );

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
