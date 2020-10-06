import { vNode, vNodeChild } from "./types"

const renderElem = (vNode: vNode) => {
    const $el = document.createElement(vNode.tagName);

    for (const [k, v] of Object.entries(vNode.attrs)) {
        $el.setAttribute(k, v);
    }

    for (const child of vNode.children) {
        $el.appendChild(render(child));
    }

    return $el;
}

const render = (vNode: vNodeChild): HTMLElement | Text => {
    if (typeof vNode === 'string') {
        return document.createTextNode(vNode);
    }

    return renderElem(vNode);
}

export default render;
