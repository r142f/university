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
        let val;
        const _res = new Tree("e");
        switch (this.lex?.curToken) {
            case Token.MINUS:
            case Token.NUM:
            case Token.LP:
                {
                    const t = this.T();
                    _res._addChild(t);
                    const e1 = this.E1(t.val);
                    _res._addChild(e1);
                    val = e1.val;
                    break;
                }
            default:
                throw new Error(`Can't execute E(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        _res.val = val;
        return _res;
    }
    E1(i) {
        let val;
        const _res = new Tree("e1");
        switch (this.lex?.curToken) {
            case Token.PLUS:
                {
                    const PLUS = this.consume(Token.PLUS);
                    _res._addChild(new Tree(PLUS));
                    const t = this.T();
                    _res._addChild(t);
                    const e1 = this.E1(i + t.val);
                    _res._addChild(e1);
                    val = e1.val;
                    break;
                }
            case Token.MINUS:
                {
                    const MINUS = this.consume(Token.MINUS);
                    _res._addChild(new Tree(MINUS));
                    const t = this.T();
                    _res._addChild(t);
                    const e1 = this.E1(i - t.val);
                    _res._addChild(e1);
                    val = e1.val;
                    break;
                }
            case Token.$:
            case Token.RP:
                _res._addChild(new Tree(EPSILON));
                val = i;
                break;
            default:
                throw new Error(`Can't execute E1(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        _res.val = val;
        return _res;
    }
    T() {
        let val;
        const _res = new Tree("t");
        switch (this.lex?.curToken) {
            case Token.MINUS:
            case Token.NUM:
            case Token.LP:
                {
                    const p = this.P();
                    _res._addChild(p);
                    const t1 = this.T1(p.val);
                    _res._addChild(t1);
                    val = t1.val;
                    break;
                }
            default:
                throw new Error(`Can't execute T(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        _res.val = val;
        return _res;
    }
    T1(i) {
        let val;
        const _res = new Tree("t1");
        switch (this.lex?.curToken) {
            case Token.MUL:
                {
                    const MUL = this.consume(Token.MUL);
                    _res._addChild(new Tree(MUL));
                    const p = this.P();
                    _res._addChild(p);
                    const t1 = this.T1(i * p.val);
                    _res._addChild(t1);
                    val = t1.val;
                    break;
                }
            case Token.DIV:
                {
                    const DIV = this.consume(Token.DIV);
                    _res._addChild(new Tree(DIV));
                    const p = this.P();
                    _res._addChild(p);
                    const t1 = this.T1(i / p.val);
                    _res._addChild(t1);
                    val = t1.val;
                    break;
                }
            case Token.PLUS:
            case Token.MINUS:
            case Token.$:
            case Token.RP:
                _res._addChild(new Tree(EPSILON));
                val = i;
                break;
            default:
                throw new Error(`Can't execute T1(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        _res.val = val;
        return _res;
    }
    P() {
        let val;
        const _res = new Tree("p");
        switch (this.lex?.curToken) {
            case Token.MINUS:
            case Token.NUM:
            case Token.LP:
                {
                    const f = this.F();
                    _res._addChild(f);
                    const p1 = this.P1(f.val);
                    _res._addChild(p1);
                    val = p1.val;
                    break;
                }
            default:
                throw new Error(`Can't execute P(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        _res.val = val;
        return _res;
    }
    P1(i) {
        let val;
        const _res = new Tree("p1");
        switch (this.lex?.curToken) {
            case Token.POW:
                {
                    const POW = this.consume(Token.POW);
                    _res._addChild(new Tree(POW));
                    const p = this.P();
                    _res._addChild(p);
                    val = i ** p.val;
                    break;
                }
            case Token.MUL:
            case Token.DIV:
            case Token.PLUS:
            case Token.MINUS:
            case Token.$:
            case Token.RP:
                _res._addChild(new Tree(EPSILON));
                val = i;
                break;
            default:
                throw new Error(`Can't execute P1(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        _res.val = val;
        return _res;
    }
    F() {
        let val;
        const _res = new Tree("f");
        switch (this.lex?.curToken) {
            case Token.MINUS:
                {
                    const MINUS = this.consume(Token.MINUS);
                    _res._addChild(new Tree(MINUS));
                    const NUM = this.consume(Token.NUM);
                    _res._addChild(new Tree(NUM));
                    val = Number.parseFloat(NUM) * (-1);
                    break;
                }
            case Token.NUM:
                {
                    const NUM = this.consume(Token.NUM);
                    _res._addChild(new Tree(NUM));
                    val = Number.parseFloat(NUM);
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
                    val = e.val;
                    break;
                }
            default:
                throw new Error(`Can't execute F(): got unexpected token ${this.lex?.curToken}${this.lex ? ` at ${this.lex?.curPos - 1}` : ``}`);
        }
        _res.val = val;
        return _res;
    }
}
//# sourceMappingURL=Parser.js.map