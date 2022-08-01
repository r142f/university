import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker.js";
import { ANTLRInputStream, CommonTokenStream } from "antlr4ts";
import { existsSync, mkdirSync, readFileSync } from "fs";
import CustomGrammarListener from "./CustomGrammarListener";
import { GrammarLexer } from "./generated/GrammarLexer";
import { GrammarParser } from "./generated/GrammarParser";
import { generateFiles, isLL1 } from "./Generation";

export const EPSILON = "ε";

export const srcPath = `${process.cwd()}/src`;
export const path = `${process.cwd()}/src/generated`;

export function createDirectory(name: string) {
  if (!existsSync(`${path}/${name}`)) {
    mkdirSync(`${path}/${name}`);
  }
}

export function unite(A: Set<any>, B: Set<any>) {
  return new Set([...A, ...B]);
}

export function diff(A: Set<any>, B: Set<any>) {
  return new Set([...A].filter((val) => !B.has(val)));
}

export function intersect(A: Set<any>, B: Set<any>) {
  return new Set([...A].filter((val) => B.has(val)));
}

export function runAntlr(inputFile: string) {
  const input = readFileSync(srcPath + inputFile, "utf8");
  const chars = new ANTLRInputStream(input);
  const lexer = new GrammarLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new GrammarParser(tokens);
  const tree = parser.grammar_file();
  const CustomGrammar = new CustomGrammarListener();
  //@ts-ignore
  ParseTreeWalker.DEFAULT.walk(CustomGrammar, tree);

  return CustomGrammar;
}

export function runCustomGenerator(
  grammarFile: string,
  alternativePath: string = path
) {
  if (!existsSync(alternativePath)) {
    mkdirSync(alternativePath);
  }

  const CustomGrammar = runAntlr(grammarFile);
  console.log("is LL1(1):", isLL1(CustomGrammar.ruleList));
  generateFiles(CustomGrammar, alternativePath);

  return CustomGrammar;
}
