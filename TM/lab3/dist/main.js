import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker.js";
import { CommonTokenStream, ANTLRInputStream } from "antlr4ts";
import { HaskellLexer } from "./generated/HaskellLexer.js";
import { HaskellParser } from "./generated/HaskellParser.js";
import CustomHaskellListener from "./CustomHaskellListener.js";
import { readFileSync, writeFileSync } from "fs";
function translate(input) {
    const chars = new ANTLRInputStream(input);
    const lexer = new HaskellLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new HaskellParser(tokens);
    const tree = parser.program();
    const CustomHaskell = new CustomHaskellListener();
    //@ts-ignore
    ParseTreeWalker.DEFAULT.walk(CustomHaskell, tree);
    return CustomHaskell.result;
}
const inputFile = "input.hs";
const outputFile = "output.cpp";
let path = process.cwd();
path = path.includes("src") ? `${path}/` : `${path}/src/`;
const input = readFileSync(path + inputFile, "utf8");
const output = translate(input);
writeFileSync(path + outputFile, output);
//# sourceMappingURL=main.js.map