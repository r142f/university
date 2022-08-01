import { digraph } from 'graphviz';
import { renderGraphFromSource } from 'graphviz-cli';
import { createDirectory, getAttrs } from './util.js';
export default class Tree {
    constructor(node, ...children) {
        this.value = node;
        this.children = children;
    }
    addChild(child) {
        this.children.push(child);
    }
    buildGraph() {
        const graph = digraph('G');
        const nodeToId = new Map();
        let nodeId = 0;
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
            u.children.forEach((v) => {
                const vNode = addNode(v);
                graph.addEdge(uNode, vNode);
                stack.push(v);
            });
        }
        return graph;
    }
    async visualizeTree(imageName) {
        createDirectory('images');
        await renderGraphFromSource({
            input: this.buildGraph().to_dot(),
        }, { format: 'png', name: `./images/${imageName}.png` });
    }
}
//# sourceMappingURL=Tree.js.map