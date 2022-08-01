import { digraph } from 'graphviz';
import { renderGraphFromSource } from 'graphviz-cli';
import { createDirectory, getAttrs } from './util.js';

export default class Tree {
  value: string;
  children: Array<Tree>;

  constructor(node: string, ...children: Array<Tree>) {
    this.value = node;
    this.children = children;
  }

  addChild(child: Tree) {
    this.children.push(child);
  }

  buildGraph() {
    const graph = digraph('G');
    const nodeToId = new Map<Tree, string>();
    let nodeId = 0;

    const addNode = (u: Tree) => {
      if (!nodeToId.has(u)) {
        nodeToId.set(u, String(nodeId++));
      }

      //@ts-ignore
      return graph.addNode(nodeToId.get(u), getAttrs(u));
    };

    const stack: Array<Tree> = [this];

    while (stack.length > 0) {
      //@ts-ignore
      const u: Tree = stack.pop();
      const uNode = addNode(u);

      u.children.forEach((v) => {
        const vNode = addNode(v);
        graph.addEdge(uNode, vNode);
        stack.push(v);
      });
    }

    return graph;
  }

  async visualizeTree(imageName: string) {
    createDirectory('images');

    await renderGraphFromSource(
      {
        input: this.buildGraph().to_dot(),
      },
      { format: 'png', name: `./images/${imageName}.png` }
    );
  }
}
