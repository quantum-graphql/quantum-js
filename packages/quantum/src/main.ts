console.log('Hello World!');

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const element = (type: keyof HTMLElementTagNameMap) => (...args: any[]): HTMLElement => {
    const node = document.createElement(type);
    
    for (let arg of args) {
        if (arg instanceof HTMLElement) {
            node.appendChild(arg);
        }

        if (typeof arg === 'string') {
            node.textContent = arg;
        }
    }
  
    return node;
}

function quantum() {
    const qmKey: (keyof HTMLElementTagNameMap)[] = [
        'a',
        'div',
        'h1',
        'button',
        'p',
        'b',
        'span',
    ];
    const qm: any = {} as any;
    for (let key of qmKey) {
        qm[key] = element(key) as any;
    }
    return qm;
}

const { div, h1, p, button, b, span } = quantum();

const template = (name) => div(
    h1('Mon titre H1'),
    div(
        p(
            span(
                'Hello '
            ),
            b(name)
        )
    ),
    div(
        button('Increment'),
        button('Decrement'),
    )
);

function bootstrap(): void {
    const root = document.getElementById('root');
    let tmp = template('Flo') 
    root.appendChild(tmp);

    setTimeout(() => {
        tmp = template('John Doe');
        removeAllChildNodes(root);
        root.appendChild(tmp);
    }, 5000);
}

bootstrap();
