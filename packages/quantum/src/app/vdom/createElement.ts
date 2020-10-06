import { ICreateElementOpts, vNode } from "./types";

export default (tagName: keyof HTMLElementTagNameMap, { attrs = {}, children = [] }: Partial<ICreateElementOpts>): vNode => {

    const vElem = Object.create(null);

    Object.assign(vElem, {
        tagName,
        attrs,
        children,
    });

    return vElem;
};
