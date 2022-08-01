import { Token } from './Token.js';
export default class Lexer {
    constructor(input) {
        this.input = input;
        this.curPos = 0;
        this.curRemainder = input;
        this.lastLexed = "";
    }
    nextChar(l) {
        if (this.curPos > this.input.length) {
            throw new Error("Can't execute nextChar(): end of input is reached");
        }
        else {
            this.lastLexed = this.curRemainder.slice(0, l);
            this.curPos += l;
            this.curRemainder =
                this.curPos === this.input.length ? "$" : this.curRemainder.slice(l);
        }
    }
    nextToken() {
        while (true) {
            if (/^\s/.test(this.curRemainder)) {
                //@ts-ignore
                const matched = /^\s/.exec(this.curRemainder)[0];
                this.nextChar(matched.length);
            }
            else {
                break;
            }
        }
        if (this.curRemainder.startsWith("$")) {
            this.nextChar(1);
            this.curToken = Token.$;
        }
        else if (this.curRemainder.startsWith("(")) {
            this.nextChar(1);
            this.curToken = Token.LP;
        }
        else if (this.curRemainder.startsWith(")")) {
            this.nextChar(1);
            this.curToken = Token.RP;
        }
        else if (/^[a-zA-Z]+/.test(this.curRemainder)) {
            //@ts-ignore
            const matched = /^[a-zA-Z]+/.exec(this.curRemainder)[0];
            this.nextChar(matched.length);
            this.curToken = Token.VAR;
        }
        else if (this.curRemainder.startsWith("|")) {
            this.nextChar(1);
            this.curToken = Token.OR;
        }
        else if (this.curRemainder.startsWith("&")) {
            this.nextChar(1);
            this.curToken = Token.AND;
        }
        else if (this.curRemainder.startsWith("!")) {
            this.nextChar(1);
            this.curToken = Token.NOT;
        }
        else if (this.curRemainder.startsWith("^")) {
            this.nextChar(1);
            this.curToken = Token.XOR;
        }
        else {
            throw new Error(`Can't execute nextToken(): got illegal character at ${this.curPos}`);
        }
    }
}
//# sourceMappingURL=Lexer.js.map