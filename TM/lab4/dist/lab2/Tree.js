import { digraph } from "graphviz";
import { renderGraphFromSource } from "graphviz-cli";
import { EPSILON, createDirectory, path } from "./Utils.js";
class BaseTree {
    constructor(node, ...children) {
        this._label = node;
        this._children = children;
    }
    _addChild(child) {
        this._children.push(child);
    }
    _buildGraph() {
        const graph = digraph("G");
        const nodeToId = new Map();
        let nodeId = 0;
        const getAttrs = (u) => {
            let attrs = {
                label: ` ${u?._label} `,
            };
            if (u._children.length === 0) {
                if (u._label === EPSILON) {
                    attrs = {
                        ...attrs,
                        style: "filled",
                        fillcolor: "grey",
                    };
                }
                else {
                    attrs = {
                        ...attrs,
                        style: "filled",
                        fillcolor: "green",
                    };
                }
            }
            return attrs;
        };
        const addNode = (u) => {
            if (!nodeToId.has(u)) {
                nodeToId.set(u, String(nodeId++));
            }
            //@ts-ignore
            return graph.addNode(nodeToId.get(u), getAttrs(u));
        };
        const stack = [this];
        while (stack.length > 0) {
            //@ts-ignore
            const u = stack.pop();
            const uNode = addNode(u);
            u._children.forEach((v) => {
                const vNode = addNode(v);
                graph.addEdge(uNode, vNode);
                stack.push(v);
            });
        }
        return graph;
    }
    async _visualizeTree(imageName, alternativePath = path) {
        createDirectory("images");
        await renderGraphFromSource({
            input: this._buildGraph().to_dot(),
        }, { format: "png", name: `${path}/images/${imageName.replace(/\//g, "div")}.png` });
    }
}
export default class Tree extends BaseTree {
}
//# sourceMappingURL=Tree.js.map