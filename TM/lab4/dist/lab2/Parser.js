import Lexer from './Lexer.js';
import { EPSILON, Token } from './Token.js';
import Tree from './Tree.js';
export default class Parser {
    consume(c) {
        if (this.lex?.curToken !== c) {
            throw new Error(`Can't execute consume(): expected ${c}, but got ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        const consumedChar = this.lex?.lastLexed;
        this.lex.nextToken();
        return consumedChar;
    }
    parse(input) {
        this.lex = new Lexer(input);
        this.lex.nextToken();
        return this.E();
    }
    E() {
        const _res = new Tree("e");
        switch (this.lex?.curToken) {
            case Token.VAR:
            case Token.NOT:
            case Token.LP:
                {
                    const o = this.O();
                    _res._addChild(o);
                    const e1 = this.E1();
                    _res._addChild(e1);
                    break;
                }
            default:
                throw new Error(`Can't execute E(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return _res;
    }
    E1() {
        const _res = new Tree("e1");
        switch (this.lex?.curToken) {
            case Token.OR:
                {
                    const OR = this.consume(Token.OR);
                    _res._addChild(new Tree(OR));
                    const e = this.E();
                    _res._addChild(e);
                    break;
                }
            case Token.$:
            case Token.RP:
                _res._addChild(new Tree(EPSILON));
                break;
            default:
                throw new Error(`Can't execute E1(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return _res;
    }
    O() {
        const _res = new Tree("o");
        switch (this.lex?.curToken) {
            case Token.VAR:
            case Token.NOT:
            case Token.LP:
                {
                    const x = this.X();
                    _res._addChild(x);
                    const o1 = this.O1();
                    _res._addChild(o1);
                    break;
                }
            default:
                throw new Error(`Can't execute O(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return _res;
    }
    O1() {
        const _res = new Tree("o1");
        switch (this.lex?.curToken) {
            case Token.XOR:
                {
                    const XOR = this.consume(Token.XOR);
                    _res._addChild(new Tree(XOR));
                    const o = this.O();
                    _res._addChild(o);
                    break;
                }
            case Token.OR:
            case Token.$:
            case Token.RP:
                _res._addChild(new Tree(EPSILON));
                break;
            default:
                throw new Error(`Can't execute O1(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return _res;
    }
    X() {
        const _res = new Tree("x");
        switch (this.lex?.curToken) {
            case Token.VAR:
            case Token.NOT:
            case Token.LP:
                {
                    const a = this.A();
                    _res._addChild(a);
                    const x1 = this.X1();
                    _res._addChild(x1);
                    break;
                }
            default:
                throw new Error(`Can't execute X(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return _res;
    }
    X1() {
        const _res = new Tree("x1");
        switch (this.lex?.curToken) {
            case Token.AND:
                {
                    const AND = this.consume(Token.AND);
                    _res._addChild(new Tree(AND));
                    const x = this.X();
                    _res._addChild(x);
                    break;
                }
            case Token.XOR:
            case Token.OR:
            case Token.$:
            case Token.RP:
                _res._addChild(new Tree(EPSILON));
                break;
            default:
                throw new Error(`Can't execute X1(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return _res;
    }
    A() {
        const _res = new Tree("a");
        switch (this.lex?.curToken) {
            case Token.VAR:
                {
                    const VAR = this.consume(Token.VAR);
                    _res._addChild(new Tree(VAR));
                    break;
                }
            case Token.NOT:
                {
                    const NOT = this.consume(Token.NOT);
                    _res._addChild(new Tree(NOT));
                    const a = this.A();
                    _res._addChild(a);
                    break;
                }
            case Token.LP:
                {
                    const LP = this.consume(Token.LP);
                    _res._addChild(new Tree(LP));
                    const e = this.E();
                    _res._addChild(e);
                    const RP = this.consume(Token.RP);
                    _res._addChild(new Tree(RP));
                    break;
                }
            default:
                throw new Error(`Can't execute A(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        return _res;
    }
}
//# sourceMappingURL=Parser.js.map