// Generated from Haskell.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ProgramContext } from "./HaskellParser";
import { Function_declarationContext } from "./HaskellParser";
import { Function_typeContext } from "./HaskellParser";
import { Function_implementationContext } from "./HaskellParser";
import { Function_args_listContext } from "./HaskellParser";
import { Function_guardContext } from "./HaskellParser";
import { ExpressionContext } from "./HaskellParser";
import { ValueContext } from "./HaskellParser";
import { Function_callContext } from "./HaskellParser";
import { OperatorContext } from "./HaskellParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `HaskellParser`.
 */
export interface HaskellListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `HaskellParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `HaskellParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `HaskellParser.function_declaration`.
	 * @param ctx the parse tree
	 */
	enterFunction_declaration?: (ctx: Function_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `HaskellParser.function_declaration`.
	 * @param ctx the parse tree
	 */
	exitFunction_declaration?: (ctx: Function_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `HaskellParser.function_type`.
	 * @param ctx the parse tree
	 */
	enterFunction_type?: (ctx: Function_typeContext) => void;
	/**
	 * Exit a parse tree produced by `HaskellParser.function_type`.
	 * @param ctx the parse tree
	 */
	exitFunction_type?: (ctx: Function_typeContext) => void;

	/**
	 * Enter a parse tree produced by `HaskellParser.function_implementation`.
	 * @param ctx the parse tree
	 */
	enterFunction_implementation?: (ctx: Function_implementationContext) => void;
	/**
	 * Exit a parse tree produced by `HaskellParser.function_implementation`.
	 * @param ctx the parse tree
	 */
	exitFunction_implementation?: (ctx: Function_implementationContext) => void;

	/**
	 * Enter a parse tree produced by `HaskellParser.function_args_list`.
	 * @param ctx the parse tree
	 */
	enterFunction_args_list?: (ctx: Function_args_listContext) => void;
	/**
	 * Exit a parse tree produced by `HaskellParser.function_args_list`.
	 * @param ctx the parse tree
	 */
	exitFunction_args_list?: (ctx: Function_args_listContext) => void;

	/**
	 * Enter a parse tree produced by `HaskellParser.function_guard`.
	 * @param ctx the parse tree
	 */
	enterFunction_guard?: (ctx: Function_guardContext) => void;
	/**
	 * Exit a parse tree produced by `HaskellParser.function_guard`.
	 * @param ctx the parse tree
	 */
	exitFunction_guard?: (ctx: Function_guardContext) => void;

	/**
	 * Enter a parse tree produced by `HaskellParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `HaskellParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `HaskellParser.value`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by `HaskellParser.value`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;

	/**
	 * Enter a parse tree produced by `HaskellParser.function_call`.
	 * @param ctx the parse tree
	 */
	enterFunction_call?: (ctx: Function_callContext) => void;
	/**
	 * Exit a parse tree produced by `HaskellParser.function_call`.
	 * @param ctx the parse tree
	 */
	exitFunction_call?: (ctx: Function_callContext) => void;

	/**
	 * Enter a parse tree produced by `HaskellParser.operator`.
	 * @param ctx the parse tree
	 */
	enterOperator?: (ctx: OperatorContext) => void;
	/**
	 * Exit a parse tree produced by `HaskellParser.operator`.
	 * @param ctx the parse tree
	 */
	exitOperator?: (ctx: OperatorContext) => void;
}

