import { Token } from './Token.js';

export default class LexicalAnalyzer {
  input: string;
  curChar: string;
  curPos: number;
  curToken: Token | undefined;

  constructor(input: string) {
    this.input = input;
    this.curChar = '';
    this.curPos = 0;
    this.nextChar();
  }

  nextChar() {
    if (this.curPos === this.input.length) {
      this.curChar = '$';
      this.curPos++;
    } else if (this.curPos > this.input.length) {
      throw new Error("Can't execute nextChar(): end of input is reached");
    } else {
      this.curChar = this.input[this.curPos++];
    }
  }

  nextToken() {
    while (/\s/.test(this.curChar)) {
      this.nextChar();
    }

    if (/[a-zA-Z]/.test(this.curChar)) {
      this.nextChar();
      this.curToken = Token.VAR;
    } else {
      switch (this.curChar) {
        case '(':
          this.nextChar();
          this.curToken = Token.LBR;
          break;

        case ')':
          this.nextChar();
          this.curToken = Token.RBR;
          break;

        case '$':
          this.curToken = Token.END;
          break;

        case '!':
          this.nextChar();
          this.curToken = Token.NOT;
          break;

        case '&':
          this.nextChar();
          this.curToken = Token.AND;
          break;

        case '^':
          this.nextChar();
          this.curToken = Token.XOR;
          break;

        case '|':
          this.nextChar();
          this.curToken = Token.OR;
          break;

        default:
          throw new Error(
            `Can't execute nextToken(): got illegal character at ${this.curPos}`
          );
      }
    }
  }
}
