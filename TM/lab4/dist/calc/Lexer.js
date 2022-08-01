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
        else if (this.curRemainder.startsWith("+")) {
            this.nextChar(1);
            this.curToken = Token.PLUS;
        }
        else if (this.curRemainder.startsWith("-")) {
            this.nextChar(1);
            this.curToken = Token.MINUS;
        }
        else if (this.curRemainder.startsWith("/")) {
            this.nextChar(1);
            this.curToken = Token.DIV;
        }
        else if (this.curRemainder.startsWith("^")) {
            this.nextChar(1);
            this.curToken = Token.POW;
        }
        else if (this.curRemainder.startsWith("*")) {
            this.nextChar(1);
            this.curToken = Token.MUL;
        }
        else if (this.curRemainder.startsWith("(")) {
            this.nextChar(1);
            this.curToken = Token.LP;
        }
        else if (this.curRemainder.startsWith(")")) {
            this.nextChar(1);
            this.curToken = Token.RP;
        }
        else if (/^\d+(\.\d+)?/.test(this.curRemainder)) {
            //@ts-ignore
            const matched = /^\d+(\.\d+)?/.exec(this.curRemainder)[0];
            this.nextChar(matched.length);
            this.curToken = Token.NUM;
        }
        else {
            throw new Error(`Can't execute nextToken(): got illegal character at ${this.curPos}`);
        }
    }
}
//# sourceMappingURL=Lexer.js.map