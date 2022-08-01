import { HaskellListener } from "./generated/HaskellListener.js";
import {
  Function_declarationContext,
  Function_implementationContext,
  ProgramContext,
} from "./generated/HaskellParser.js";

export default class CustomHaskellListener implements HaskellListener {
  result: string;
  functions: {
    [name: string]: {
      name: string;
      type: string[];
      argNames: (string | undefined)[][];
      implementations: {
        argPattern: (string | undefined)[];
        guard: string | undefined;
        body: string;
      }[];
    };
  };

  constructor() {
    this.result = "";
    this.functions = {};
  }

  exitProgram(ctx: ProgramContext): void {
    for (let key in this.functions) {
      let func = this.functions[key];
      let { name, type, argNames: funcArgNames = [], implementations } = func;

      // Forming function header
      let returnType = type[type.length - 1];
      let argTypes = type.slice(0, type.length - 1);
      let argNames = new Array(argTypes.length).fill(undefined);
      for (let i = 0; i < argTypes.length; ++i) {
        for (let j = 0; j < funcArgNames.length; ++j) {
          if (funcArgNames[j][i]) argNames[i] = funcArgNames[j][i];
        }
      }
      argNames = argNames.map((name, i) => (name ? name : `a${i}`));

      this.result += `${returnType} ${name}(${argTypes
        .map((type, i) => `${type} ${argNames[i]}`)
        .join(", ")}) {`;

      // Forming function body
      let printedMainImplementation = false;
      for (let k = 0; k < implementations.length; ++k) {
        let implementation = implementations[k];

        let argPattern = implementation.argPattern
          .map((pattern, i) =>
            pattern ? `${argNames[i]} == ${pattern}` : undefined
          )
          .filter((v) => v)
          .join(" && ");
        let guard = implementation.guard;
        //@ts-ignore
        if (guard?.length > 0 || argPattern?.length > 0) {
          let ifCondition = [guard, argPattern]
            .filter((s) => s?.length)
            .join(" && ");
          let ifBody = `\n    return ${implementation.body};\n  `;

          this.result += `${
            k === 0 ? "\n  if" : " else if"
          } (${ifCondition}) {${ifBody}}${
            k === implementations.length - 1 ? "\n" : ""
          }`;
        } else if (!printedMainImplementation) {
          printedMainImplementation = true;
          this.result += `\n  return ${implementation.body};\n`;
        }
      }

      this.result += "}\n\n";
    }

    this.result = `#include <bits/stdc++.h>\n\nusing namespace std;\n\n${this.result}`;
    this.result += "int main() {\n  return 0;\n}\n";
    this.result = this.result.replace(/\/=/g, "!=");
  }

  enterFunction_declaration(ctx: Function_declarationContext): void {
    let name = ctx.NAME().text;
    let type = ctx
      .function_type()
      ._type.map(({ text }) => (text ? text.toLowerCase() : ""));

    this.functions[name] = { type, name, argNames: [], implementations: [] };
  }

  exitFunction_implementation(ctx: Function_implementationContext): void {
    let name = ctx.NAME().text;

    let argNames = ctx
      .function_args_list()
      ._list.map(({ text, type }) => (type === 3 ? text : undefined));
    this.functions[name].argNames.push(argNames);

    let body = ctx.expression().text;
    let guard = ctx.function_guard()?.expression()?.text;
    let argPattern = ctx
      .function_args_list()
      ._list.map(({ text, type }) => (type !== 3 ? text : undefined));
    this.functions[name].implementations.push({ argPattern, guard, body });
  }
}
