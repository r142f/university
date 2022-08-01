import { Token } from "./Token.js";
export default class LexicalAnalyzer {
    constructor(input) {
        this.input = input;
        this.curRemainder = input;
        this.curPos = 0;
    }
    nextChar(l = 1) {
        if (this.curPos > this.input.length) {
            throw new Error("Can't execute nextChar(): end of input is reached");
        }
        else {
            this.curPos += l;
            this.curRemainder =
                this.curPos === this.input.length ? "$" : this.input.slice(this.curPos);
        }
        //console.log("l: ", l);
        //console.log("pos: ", this.curPos, this.curRemainder);
    }
    nextToken() {
        while (true) {
            //console.log("MOW", this.curRemainder);
            if (/^\s/.test(this.curRemainder)) {
                //console.log("SPACE");
                //@ts-ignore
                const matched = /^\s/.exec(this.curRemainder)[0];
                this.nextChar(matched.length);
            }
            else {
                break;
            }
        }
        if (/^[a-zA-Z]+/.test(this.curRemainder)) {
            //@ts-ignore
            const matched = /^[a-zA-Z]+/.exec(this.curRemainder)[0];
            this.nextChar(matched.length);
            this.curToken = Token.VAR;
        }
        else if (this.curRemainder.startsWith("(")) {
            this.nextChar(1);
            this.curToken = Token.LBR;
        }
        else if (this.curRemainder.startsWith(")")) {
            this.nextChar(1);
            this.curToken = Token.RBR;
        }
        else if (this.curRemainder.startsWith("$")) {
            this.curToken = Token.END;
        }
        else if (this.curRemainder.startsWith("!")) {
            this.nextChar(1);
            this.curToken = Token.NOT;
        }
        else if (this.curRemainder.startsWith("&")) {
            this.nextChar(1);
            this.curToken = Token.AND;
        }
        else if (this.curRemainder.startsWith("^")) {
            this.nextChar(1);
            this.curToken = Token.XOR;
        }
        else if (this.curRemainder.startsWith("|")) {
            this.nextChar(1);
            this.curToken = Token.OR;
        }
        else {
            throw new Error(`Can't execute nextToken(): got illegal character at ${this.curPos}`);
        }
        //console.log("token: ", this.curToken);
    }
}
//# sourceMappingURL=LexicalAnalyzer.js.map