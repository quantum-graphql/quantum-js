export interface ICreateElementOpts {
    attrs: { [key: string]: any };
    children: vNodeChild[];
}

export type vNode = {
    tagName: keyof HTMLElementTagNameMap;
} & ICreateElementOpts;

export type vNodeChild = vNode | string;
