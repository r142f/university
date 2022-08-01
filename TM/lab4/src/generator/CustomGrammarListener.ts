import { GrammarListener } from "./generated/GrammarListener.js";
import {
  Ignore_ruleContext,
  Lexer_ruleContext,
  Parser_ruleContext,
} from "./generated/GrammarParser.js";
import { Attr, RuleEntry, RuleList, Token } from "./Types.js";
import { EPSILON } from "./Utils.js";

export default class CustomGrammarListener implements GrammarListener {
  tokens: { [name: string]: Token };
  ruleList: RuleList;
  treeFields: { [name: string]: string };
  ignore: Token[];

  constructor() {
    this.tokens = { $: { name: "$", type: "string", value: "$" } };
    this.ruleList = {};
    this.treeFields = {};
    this.ignore = [];
  }

  exitLexer_rule(ctx: Lexer_ruleContext): void {
    const tokenName = ctx.TOKEN_NAME().text;
    const tokenValue = ctx.value().text;
    const tokenType = tokenValue.startsWith("'") ? "regexp" : "string";

    this.tokens[tokenName] = {
      name: tokenName,
      type: tokenType,
      value: tokenValue.slice(1, -1),
    };
  }

  exitIgnore_rule(ctx: Ignore_ruleContext): void {
    const ignoreValue = ctx.value().text;
    const ignoreType = ignoreValue.startsWith("'") ? "regexp" : "string";

    this.ignore.push({
      name: "",
      type: ignoreType,
      value: ignoreValue.slice(1, -1),
    });
  }

  exitParser_rule(ctx: Parser_ruleContext): void {
    const nonterminal = ctx.NAME().text;
    const inheritedAttrs: Attr[] =
      ctx.inherited_attrs()?._list.map((attr) => ({
        name: attr.NAME().text,
        type: attr.attr_type().text,
      })) || [];

    if (ctx.synthesized_attr()) {
      //@ts-ignore
      let synthesizedAttr: Attr = ctx.synthesized_attr()
        ? {
            name: ctx.synthesized_attr()?.attr().NAME().text,
            type: ctx.synthesized_attr()?.attr().attr_type().text,
          }
        : undefined;
      this.treeFields[synthesizedAttr.name] = synthesizedAttr.type;
      this.ruleList[nonterminal] = {
        ...this.ruleList[nonterminal],
        synthesizedAttr,
      };
    }

    this.ruleList[nonterminal] = {
      ...this.ruleList[nonterminal],
      inheritedAttrs,
      rules: [],
    };

    for (const expressionCtx of ctx.parser_rule_rp()._list) {
      let rule: RuleEntry[] = [];

      let isEPSILON = true;
      for (const entryCtx of expressionCtx._list) {
        if (entryCtx.TOKEN_NAME()) {
          isEPSILON = false;
          rule.push({
            type: "terminal",
            //@ts-ignore
            value: entryCtx.TOKEN_NAME()?.text,
            inheritedAttrs: [],
          });
        } else if (entryCtx.NAME()) {
          isEPSILON = false;
          rule.push({
            type: "nonterminal",
            //@ts-ignore
            value: entryCtx.NAME()?.text,
            //@ts-ignore
            inheritedAttrs:
              entryCtx
                .rule_args()
                ?._list.map(({ text }) =>
                  text?.slice(2, text.length - 2).trim()
                ) || [],
          });
        } else if (entryCtx.CODE()) {
          const code = entryCtx.CODE()?.text;
          rule.push({
            type: "code",
            //@ts-ignore
            value: code
              //@ts-ignore
              .slice(2, code?.length - 2)
              .trim()
              .split(";")
              .map((line) => line.trim())
              .filter(({ length }) => length > 0)
              .map((line) => `        ${line};`)
              .join("\n"),
            inheritedAttrs: [],
          });
        }
      }

      if (isEPSILON) {
        rule = [
          { type: "epsilon", value: EPSILON, inheritedAttrs: [] },
          ...rule,
        ];
      }

      this.ruleList[nonterminal].rules.push(rule);
    }
  }
}
