import LexicalAnalyzer from './LexicalAnalyzer.js';
import { Token } from './Token.js';
import Tree from './Tree.js';
export default class Parser {
    consume(c) {
        const consumedChar = this.lex?.input.slice(this.lex?.curPos - 2, c.length);
        if (this.lex?.curToken !== c) {
            throw new Error(`Can't execute consume(): expected ${c}, but got ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        this.lex.nextToken();
        return consumedChar;
    }
    parse(input) {
        this.lex = new LexicalAnalyzer(input);
        this.lex.nextToken();
        return this.E();
    }
    E() {
        const res = new Tree('E');
        switch (this.lex?.curToken) {
            case Token.VAR:
            case Token.NOT:
            case Token.LBR:
                res.addChild(this.O());
                res.addChild(this.E1());
                break;
            default:
                throw new Error(`Can't execute E(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return res;
    }
    E1() {
        const res = new Tree("E'");
        switch (this.lex?.curToken) {
            case Token.OR:
                this.consume('|');
                res.addChild(new Tree('|'));
                res.addChild(this.E());
                break;
            case Token.END:
            case Token.RBR:
                break;
            default:
                throw new Error(`Can't execute E1(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return res;
    }
    O() {
        const res = new Tree('O');
        switch (this.lex?.curToken) {
            case Token.VAR:
            case Token.NOT:
            case Token.LBR:
                res.addChild(this.X());
                res.addChild(this.O1());
                break;
            default:
                throw new Error(`Can't execute O(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return res;
    }
    O1() {
        const res = new Tree("O'");
        switch (this.lex?.curToken) {
            case Token.XOR:
                this.consume('^');
                res.addChild(new Tree('^'));
                res.addChild(this.O());
                break;
            case Token.OR:
            case Token.END:
            case Token.RBR:
                break;
            default:
                throw new Error(`Can't execute O1(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return res;
    }
    X() {
        const res = new Tree('X');
        switch (this.lex?.curToken) {
            case Token.VAR:
            case Token.NOT:
            case Token.LBR:
                res.addChild(this.A());
                res.addChild(this.X1());
                break;
            default:
                throw new Error(`Can't execute X(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return res;
    }
    X1() {
        const res = new Tree("X'");
        switch (this.lex?.curToken) {
            case Token.AND:
                this.consume('&');
                res.addChild(new Tree('&'));
                res.addChild(this.X());
                break;
            case Token.XOR:
            case Token.OR:
            case Token.END:
            case Token.RBR:
                break;
            default:
                throw new Error(`Can't execute X1(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return res;
    }
    A() {
        const res = new Tree('A');
        switch (this.lex?.curToken) {
            case Token.VAR:
                res.addChild(new Tree(this.consume('var') || 'var'));
                break;
            case Token.NOT:
                this.consume('!');
                res.addChild(new Tree('!'));
                res.addChild(this.A());
                break;
            case Token.LBR:
                this.consume('(');
                res.addChild(new Tree('('));
                res.addChild(this.E());
                this.consume(')');
                res.addChild(new Tree(')'));
                break;
            default:
                throw new Error(`Can't execute A(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return res;
    }
}
//# sourceMappingURL=Parser.js.map