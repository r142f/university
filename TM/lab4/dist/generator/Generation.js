import { $ } from "./Types.js";
import { readFileSync, writeFileSync } from "fs";
import { EPSILON, diff, path, srcPath, unite, intersect } from "./Utils.js";
function generateClassMethod(name, parameters, body) {
    return (`  ${name}(${parameters
        .map(([name, type, value]) => value ? `${name}: ${type} = ${value}` : `${name}: ${type}`)
        .join(", ")}) {` +
        "\n" +
        body +
        "  }\n");
}
function generateTokenMatch({ name, type, value }, isIgnore, isNext) {
    let lines = [];
    if (type === "regexp") {
        lines.push(`${isNext ? " else if " : "    if "}(/^${value}/.test(this.curRemainder)) {`);
        lines.push("      //@ts-ignore");
        lines.push(`      const matched = /^${value}/.exec(this.curRemainder)[0];`);
        lines.push(`      this.nextChar(matched.length);`);
    }
    else {
        lines.push(`${isNext ? " else if " : "    if "}(this.curRemainder.startsWith("${value}")) {`);
        lines.push(`      this.nextChar(${value.length});`);
    }
    if (!isIgnore) {
        lines.push(`      this.curToken = Token.${name};`);
    }
    lines.push(`    }`);
    if (isIgnore) {
        lines = lines.map((line) => `  ${line}`);
    }
    return lines.join("\n");
}
export function generateLexerFileContent(tokens, ignore) {
    const imports = "import { Token } from './Token.js'\n";
    const fieldsList = [
        ["input", "string", "input"],
        ["curPos", "number", "0"],
        ["curToken", "Token | undefined", undefined],
        ["curRemainder", "string", "input"],
        ["lastLexed", "string", '""'],
    ];
    const fields = fieldsList
        .map(([name, type]) => `  ${name}: ${type};\n`)
        .join("");
    const constructorBody = fieldsList
        .filter(([_, __, value]) => value)
        .map(([name, _, value]) => `    this.${name} = ${value};\n`)
        .join("");
    const constructor = generateClassMethod("constructor", [["input", "string"]], constructorBody);
    const nextCharBody = [
        "    if (this.curPos > this.input.length) {",
        '      throw new Error("Can\'t execute nextChar(): end of input is reached");',
        "    } else {",
        "      this.lastLexed = this.curRemainder.slice(0, l);",
        "      this.curPos += l;",
        "      this.curRemainder =",
        '        this.curPos === this.input.length ? "$" : this.curRemainder.slice(l);',
        "    }",
    ].join("\n") + "\n";
    const nextChar = generateClassMethod("nextChar", [["l", "number"]], nextCharBody);
    const ignorePart = ignore.length > 0
        ? [
            "    while (true) {",
            ignore
                .map((token, i) => generateTokenMatch(token, true, i > 0))
                .concat([" else {\n        break;\n      }"])
                .join(""),
            "    }",
        ].join("\n") + "\n\n"
        : "";
    const matchPart = tokens.length > 0
        ? tokens
            .map((token, i) => generateTokenMatch(token, false, i > 0))
            .concat([
            " else {",
            "      throw new Error(",
            "        `Can't execute nextToken(): got illegal character at ${this.curPos}`",
            "      );",
            "    }",
        ].join("\n"))
            .join("") + "\n"
        : "";
    const nextTokenBody = ignorePart + matchPart;
    const nextToken = generateClassMethod("nextToken", [], nextTokenBody);
    const content = [
        imports,
        "export default class Lexer {",
        fields,
        constructor,
        nextChar,
        nextToken + "}",
    ].join("\n");
    return content;
}
export function generateLexerFile(CustomGrammar, alternativePath = path) {
    const content = generateLexerFileContent(Object.values(CustomGrammar.tokens), CustomGrammar.ignore);
    writeFileSync(`${alternativePath}/Lexer.ts`, content);
}
export function generateTokenFileContent(tokens) {
    let content = "";
    const tokensDeclarationList = tokens
        .map(({ name, value, type }) => `  ${name} = '${type === "regexp" ? name : value}',\n`)
        .join("");
    content = `export enum Token {\n${tokensDeclarationList}}\n\nexport const EPSILON = "ε";\n`;
    return content;
}
export function generateTokenFile(CustomGrammar, alternativePath = path) {
    const content = generateTokenFileContent(Object.values(CustomGrammar.tokens));
    writeFileSync(`${alternativePath}/Token.ts`, content);
}
export function isLL1(rules) {
    const FIRST = generateFIRST(rules), FOLLOW = generateFOLLOW(rules);
    let isLL1 = true;
    for (const nonterminal in rules) {
        const nonterminalRules = rules[nonterminal].rules;
        for (let i = 0; i < nonterminalRules.length; ++i) {
            for (let j = i + 1; j < nonterminalRules.length; ++j) {
                const first_i = first(FIRST, nonterminalRules[i]);
                const first_j = first(FIRST, nonterminalRules[j]);
                if (intersect(first_i, first_j).size !== 0) {
                    isLL1 = false;
                }
                if (first_i.has(EPSILON) &&
                    intersect(FOLLOW[nonterminal], first_j).size !== 0) {
                    isLL1 = false;
                }
            }
        }
    }
    return isLL1;
}
function first(FIRST, rule) {
    if (rule.length === 0) {
        return new Set([EPSILON]);
    }
    else if (rule[0].type === "epsilon" || rule[0].type === "terminal") {
        return new Set([rule[0].value]);
    }
    else if (rule[0].type === "code") {
        return first(FIRST, rule.slice(1));
    }
    else if (rule[0].type === "nonterminal") {
        return unite(diff(FIRST[rule[0].value], new Set([EPSILON])), FIRST[rule[0].value].has(EPSILON)
            ? first(FIRST, rule.slice(1))
            : new Set());
    }
    return new Set();
}
export function generateFIRST(rules) {
    const nonterminals = Object.keys(rules);
    const FIRST = {};
    for (const nonterminal of nonterminals) {
        FIRST[nonterminal] = new Set();
    }
    let changed = true;
    while (changed) {
        changed = false;
        for (const nonterminal in rules) {
            for (const rule of rules[nonterminal].rules) {
                const sizeBefore = FIRST[nonterminal].size;
                FIRST[nonterminal] = unite(FIRST[nonterminal], first(FIRST, rule));
                if (sizeBefore !== FIRST[nonterminal].size) {
                    changed = true;
                }
            }
        }
    }
    return FIRST;
}
export function generateFOLLOW(rules) {
    const FIRST = generateFIRST(rules);
    const nonterminals = Object.keys(rules);
    const FOLLOW = {};
    for (const nonterminal of nonterminals) {
        FOLLOW[nonterminal] = new Set();
    }
    FOLLOW[nonterminals[0]].add($);
    let changed = true;
    while (changed) {
        changed = false;
        for (const nonterminal in rules) {
            for (const rule of rules[nonterminal].rules) {
                for (let i = 0; i < rule.length; ++i) {
                    const { type, value } = rule[i];
                    if (type !== "nonterminal") {
                        continue;
                    }
                    const sizeBefore = FOLLOW[value].size;
                    FOLLOW[value] = unite(FOLLOW[value], diff(first(FIRST, rule.slice(i + 1)), new Set([EPSILON])));
                    if (first(FIRST, rule.slice(i + 1)).has(EPSILON)) {
                        FOLLOW[value] = unite(FOLLOW[value], FOLLOW[nonterminal]);
                    }
                    if (sizeBefore !== FOLLOW[value].size) {
                        changed = true;
                    }
                }
            }
        }
    }
    return FOLLOW;
}
export function generateParserFileContent(ruleList) {
    const FIRST = generateFIRST(ruleList), FOLLOW = generateFOLLOW(ruleList);
    const imports = [
        "import Lexer from './Lexer.js';",
        "import { EPSILON, Token } from './Token.js'",
        "import Tree from './Tree.js'",
    ].join("\n") + "\n";
    const fields = "  lex: Lexer | undefined;\n";
    const consumeBody = [
        "    if (this.lex?.curToken !== c) {",
        "      throw new Error(",
        "        `Can't execute consume(): expected ${c}, but got ${this.lex?.curToken}${",
        "          this.lex ? ` at ${this.lex?.curPos - 1}` : ``",
        "        }`",
        "      );",
        "    }\n",
        "    const consumedChar = this.lex?.lastLexed;",
        "    this.lex.nextToken();\n",
        "    return consumedChar;\n",
    ].join("\n");
    const consume = generateClassMethod("consume", [["c", "string"]], consumeBody);
    const parseBody = [
        "    this.lex = new Lexer(input);",
        "    this.lex.nextToken();",
        "    return this.E();\n",
    ].join("\n");
    const parse = generateClassMethod("parse", [["input", "string"]], parseBody);
    const nonterminalsMethods = [];
    for (const nonterminal in ruleList) {
        const { inheritedAttrs, synthesizedAttr, rules } = ruleList[nonterminal];
        const name = nonterminal.toUpperCase();
        const parameters = inheritedAttrs.map(({ name, type }) => [`${name}`, `${type} | undefined`]);
        let body = [];
        if (synthesizedAttr) {
            body.push(`    let ${synthesizedAttr.name}: ${synthesizedAttr.type} | undefined;`);
        }
        body.push(...[
            `    const _res = new Tree("${nonterminal}");\n`,
            "    switch (this.lex?.curToken) {",
        ]);
        let hasEPSILON = false;
        let ruleEPSILON = [];
        for (const rule of rules) {
            const ruleFIRST = first(FIRST, rule);
            if (ruleFIRST.delete(EPSILON)) {
                hasEPSILON = true;
            }
            if (ruleFIRST.size === 0) {
                ruleEPSILON = rule;
                continue;
            }
            body.push(...[...ruleFIRST].map((TOKEN) => `      case Token.${TOKEN}:`));
            body.push("      {");
            for (const { type, value, inheritedAttrs } of rule) {
                switch (type) {
                    case "terminal":
                        body.push(...[
                            `        const ${value} = this.consume(Token.${value});`,
                            `        _res._addChild(new Tree(${value}));`,
                        ]);
                        break;
                    case "nonterminal":
                        body.push(...[
                            `        const ${value} = this.${value.toUpperCase()}(${inheritedAttrs.join(", ")});`,
                            `        _res._addChild(${value});`,
                        ]);
                        break;
                    case "code":
                        body.push(value);
                        break;
                }
            }
            body.push("        break;");
            body.push("      }");
        }
        if (hasEPSILON) {
            body.push(...[...FOLLOW[nonterminal]].map((TOKEN) => `      case Token.${TOKEN}:`), "        _res._addChild(new Tree(EPSILON));");
            for (const { type, value, inheritedAttrs } of ruleEPSILON.slice(1)) {
                if (type === "code") {
                    body.push(value);
                }
                else {
                    throw new Error(`EPSILON rule appears to have an entry of non-code type! Type: ${type}`);
                }
            }
            body.push("        break;");
        }
        body.push(...[
            "      default:",
            "        throw new Error(",
            "          `Can't execute " +
                name +
                "(): got unexpected token ${this.lex?.curToken}${",
            "            this.lex ? ` at ${this.lex?.curPos - 1}` : ``",
            "          }`",
            "        );",
            "    }",
        ]);
        if (synthesizedAttr) {
            body.push(`\n    _res.${synthesizedAttr.name} = ${synthesizedAttr.name};`);
        }
        body.push("    return _res;");
        body = body.join("\n") + "\n";
        nonterminalsMethods.push(generateClassMethod(name, parameters, body));
    }
    const content = [
        imports,
        "export default class Parser {",
        fields,
        consume,
        parse,
        ...nonterminalsMethods,
        "}\n",
    ].join("\n");
    return content;
}
export function generateParserFile(CustomGrammar, alternativePath = path) {
    const content = generateParserFileContent(CustomGrammar.ruleList);
    writeFileSync(`${alternativePath}/Parser.ts`, content);
}
export function generateTreeFileContent(treeFields) {
    const baseTree = readFileSync(`${srcPath}/generator/BaseTree.ts`, "utf8");
    const content = [
        baseTree,
        "export default class Tree extends BaseTree {",
        ...treeFields.map(([name, type]) => `  ${name}?: ${type};`),
        "}\n",
    ].join("\n");
    return content;
}
export function generateTreeFile(CustomGrammar, alternativePath = path) {
    writeFileSync(`${alternativePath}/Tree.ts`, generateTreeFileContent(Object.entries(CustomGrammar.treeFields)));
}
export function generateUtilsFile(alternativePath = path) {
    writeFileSync(`${alternativePath}/Utils.ts`, [
        "import { existsSync, mkdirSync } from 'fs';\n",
        `export const EPSILON = '${EPSILON}';\n`,
        `export const path = "${alternativePath}";\n`,
        "export function createDirectory(name: string) {",
        "  if (!existsSync(`${path}/${name}`)) {",
        "    mkdirSync(`${path}/${name}`);",
        "  }",
        "}\n",
    ].join("\n"));
}
export function generateFiles(CustomGrammar, alternativePath = path) {
    generateUtilsFile(alternativePath);
    generateTreeFile(CustomGrammar, alternativePath);
    generateTokenFile(CustomGrammar, alternativePath);
    generateLexerFile(CustomGrammar, alternativePath);
    generateParserFile(CustomGrammar, alternativePath);
}
//# sourceMappingURL=Generation.js.map