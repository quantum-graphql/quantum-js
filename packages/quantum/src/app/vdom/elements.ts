import createElement from "./createElement";
import { TAG_LIST } from "./tag-list";
import { ICreateElementOpts, vNode, vNodeChild } from "./types";

const ATTR_PREFIX = ':';
const ATTR_DELIMITATOR = '=';

export type qElementFn = (tagName: keyof HTMLElementTagNameMap, ...opts: vNodeChild[]) => vNode

const qElement: qElementFn = (tagName: keyof HTMLElementTagNameMap, ...opts: vNodeChild[]): vNode => {
    const children = opts.filter((opt) =>
        typeof opt !== 'string' || typeof opt === 'string' && !opt.startsWith(ATTR_PREFIX)
    );
    const attrs: any = {};
    opts.filter((opt) =>
        typeof opt === 'string' && opt.startsWith(ATTR_PREFIX)
    ).map((opt: string) => {
        const attrStr = opt.substring(1);
        const attr = attrStr.split(ATTR_DELIMITATOR);
        attrs[attr.shift()] = attr.join(ATTR_DELIMITATOR);
    });

    return createElement(tagName, {
        attrs,
        children,
    });
};

function qElementsGenerator() {
    const qElements: { [k in keyof HTMLElementTagNameMap]: (...opts: vNodeChild[]) => vNode } = {} as any;
    for (let tag of TAG_LIST) {
        qElements[tag] = (...opts: vNodeChild[]) => qElement(tag, ...opts);
    }
    return qElements;
} 

export default qElementsGenerator();

