export type Token = {
  name: string;
  type: "string" | "regexp";
  value: string;
};

export type RuleEntry = {
  type: "terminal" | "nonterminal" | "epsilon" | "code";
  value: string;
  inheritedAttrs: string[];
};

export type Rule = RuleEntry[];

export type Attr = {
  name: string;
  type: string;
};

export type RuleList = {
  [nonterminal: string]: {
    inheritedAttrs: Attr[];
    synthesizedAttr?: Attr;
    rules: Rule[];
  };
};

export const $ = "$";
