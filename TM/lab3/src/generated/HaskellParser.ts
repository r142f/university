// Generated from Haskell.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { HaskellListener } from "./HaskellListener";

export class HaskellParser extends Parser {
	public static readonly TYPE = 1;
	public static readonly LITERAL = 2;
	public static readonly NAME = 3;
	public static readonly STRING = 4;
	public static readonly DOUBLE = 5;
	public static readonly INT = 6;
	public static readonly BOOL = 7;
	public static readonly LP = 8;
	public static readonly RP = 9;
	public static readonly COMMA = 10;
	public static readonly PLUS = 11;
	public static readonly MINUS = 12;
	public static readonly DIV = 13;
	public static readonly MUL = 14;
	public static readonly MOD = 15;
	public static readonly OR = 16;
	public static readonly AND = 17;
	public static readonly LT = 18;
	public static readonly LTE = 19;
	public static readonly GT = 20;
	public static readonly GTE = 21;
	public static readonly EQ = 22;
	public static readonly NEQ = 23;
	public static readonly DCOLON = 24;
	public static readonly IMPLIES = 25;
	public static readonly VBAR = 26;
	public static readonly EQUALS = 27;
	public static readonly NEWLINE = 28;
	public static readonly WHITESPACE = 29;
	public static readonly RULE_program = 0;
	public static readonly RULE_function_declaration = 1;
	public static readonly RULE_function_type = 2;
	public static readonly RULE_function_implementation = 3;
	public static readonly RULE_function_args_list = 4;
	public static readonly RULE_function_guard = 5;
	public static readonly RULE_expression = 6;
	public static readonly RULE_value = 7;
	public static readonly RULE_function_call = 8;
	public static readonly RULE_operator = 9;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "function_declaration", "function_type", "function_implementation", 
		"function_args_list", "function_guard", "expression", "value", "function_call", 
		"operator",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "'('", "')'", "','", "'+'", "'-'", "'/'", "'*'", "'%'", "'||'", 
		"'&&'", "'<'", "'<='", "'>'", "'>='", "'=='", "'/='", "'::'", "'->'", 
		"'|'", "'='",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "TYPE", "LITERAL", "NAME", "STRING", "DOUBLE", "INT", "BOOL", 
		"LP", "RP", "COMMA", "PLUS", "MINUS", "DIV", "MUL", "MOD", "OR", "AND", 
		"LT", "LTE", "GT", "GTE", "EQ", "NEQ", "DCOLON", "IMPLIES", "VBAR", "EQUALS", 
		"NEWLINE", "WHITESPACE",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(HaskellParser._LITERAL_NAMES, HaskellParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return HaskellParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Haskell.g4"; }

	// @Override
	public get ruleNames(): string[] { return HaskellParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return HaskellParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(HaskellParser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, HaskellParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 31;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === HaskellParser.NAME || _la === HaskellParser.NEWLINE) {
				{
				{
				this.state = 27;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 0, this._ctx) ) {
				case 1:
					{
					this.state = 20;
					this.function_implementation();
					this.state = 21;
					this.match(HaskellParser.NEWLINE);
					}
					break;

				case 2:
					{
					this.state = 23;
					this.function_declaration();
					this.state = 24;
					this.match(HaskellParser.NEWLINE);
					}
					break;

				case 3:
					{
					this.state = 26;
					this.match(HaskellParser.NEWLINE);
					}
					break;
				}
				}
				}
				this.state = 33;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 34;
			this.match(HaskellParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_declaration(): Function_declarationContext {
		let _localctx: Function_declarationContext = new Function_declarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, HaskellParser.RULE_function_declaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 36;
			this.match(HaskellParser.NAME);
			this.state = 40;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === HaskellParser.WHITESPACE) {
				{
				{
				this.state = 37;
				this.match(HaskellParser.WHITESPACE);
				}
				}
				this.state = 42;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 43;
			this.match(HaskellParser.DCOLON);
			this.state = 47;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === HaskellParser.WHITESPACE) {
				{
				{
				this.state = 44;
				this.match(HaskellParser.WHITESPACE);
				}
				}
				this.state = 49;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 50;
			this.function_type();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_type(): Function_typeContext {
		let _localctx: Function_typeContext = new Function_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, HaskellParser.RULE_function_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 52;
			_localctx._TYPE = this.match(HaskellParser.TYPE);
			_localctx._type.push(_localctx._TYPE);
			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === HaskellParser.IMPLIES || _la === HaskellParser.WHITESPACE) {
				{
				{
				this.state = 56;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === HaskellParser.WHITESPACE) {
					{
					{
					this.state = 53;
					this.match(HaskellParser.WHITESPACE);
					}
					}
					this.state = 58;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 59;
				this.match(HaskellParser.IMPLIES);
				this.state = 63;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === HaskellParser.WHITESPACE) {
					{
					{
					this.state = 60;
					this.match(HaskellParser.WHITESPACE);
					}
					}
					this.state = 65;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 66;
				_localctx._TYPE = this.match(HaskellParser.TYPE);
				_localctx._type.push(_localctx._TYPE);
				}
				}
				this.state = 71;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_implementation(): Function_implementationContext {
		let _localctx: Function_implementationContext = new Function_implementationContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, HaskellParser.RULE_function_implementation);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 72;
			this.match(HaskellParser.NAME);
			this.state = 73;
			this.function_args_list();
			this.state = 75;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				{
				this.state = 74;
				this.function_guard();
				}
				break;
			}
			this.state = 80;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === HaskellParser.WHITESPACE) {
				{
				{
				this.state = 77;
				this.match(HaskellParser.WHITESPACE);
				}
				}
				this.state = 82;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 83;
			this.match(HaskellParser.EQUALS);
			this.state = 87;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === HaskellParser.WHITESPACE) {
				{
				{
				this.state = 84;
				this.match(HaskellParser.WHITESPACE);
				}
				}
				this.state = 89;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 90;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_args_list(): Function_args_listContext {
		let _localctx: Function_args_listContext = new Function_args_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, HaskellParser.RULE_function_args_list);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 104;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 95;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === HaskellParser.WHITESPACE) {
						{
						{
						this.state = 92;
						this.match(HaskellParser.WHITESPACE);
						}
						}
						this.state = 97;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 100;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case HaskellParser.LITERAL:
						{
						this.state = 98;
						_localctx._LITERAL = this.match(HaskellParser.LITERAL);
						_localctx._list.push(_localctx._LITERAL);
						}
						break;
					case HaskellParser.NAME:
						{
						this.state = 99;
						_localctx._NAME = this.match(HaskellParser.NAME);
						_localctx._list.push(_localctx._NAME);
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 106;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_guard(): Function_guardContext {
		let _localctx: Function_guardContext = new Function_guardContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, HaskellParser.RULE_function_guard);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 110;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === HaskellParser.WHITESPACE) {
				{
				{
				this.state = 107;
				this.match(HaskellParser.WHITESPACE);
				}
				}
				this.state = 112;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 113;
			this.match(HaskellParser.VBAR);
			this.state = 117;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === HaskellParser.WHITESPACE) {
				{
				{
				this.state = 114;
				this.match(HaskellParser.WHITESPACE);
				}
				}
				this.state = 119;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 120;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 12;
		this.enterRecursionRule(_localctx, 12, HaskellParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 128;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case HaskellParser.LP:
				{
				this.state = 123;
				this.match(HaskellParser.LP);
				this.state = 124;
				this.expression(0);
				this.state = 125;
				this.match(HaskellParser.RP);
				}
				break;
			case HaskellParser.LITERAL:
			case HaskellParser.NAME:
				{
				this.state = 127;
				this.value();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 148;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new ExpressionContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, HaskellParser.RULE_expression);
					this.state = 130;
					if (!(this.precpred(this._ctx, 3))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
					}
					this.state = 134;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === HaskellParser.WHITESPACE) {
						{
						{
						this.state = 131;
						this.match(HaskellParser.WHITESPACE);
						}
						}
						this.state = 136;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 137;
					this.operator();
					this.state = 141;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === HaskellParser.WHITESPACE) {
						{
						{
						this.state = 138;
						this.match(HaskellParser.WHITESPACE);
						}
						}
						this.state = 143;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 144;
					this.expression(4);
					}
					}
				}
				this.state = 150;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, HaskellParser.RULE_value);
		try {
			this.state = 154;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 151;
				this.function_call();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 152;
				this.match(HaskellParser.LITERAL);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 153;
				this.match(HaskellParser.NAME);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_call(): Function_callContext {
		let _localctx: Function_callContext = new Function_callContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, HaskellParser.RULE_function_call);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 156;
			this.match(HaskellParser.NAME);
			this.state = 157;
			this.match(HaskellParser.LP);
			this.state = 170;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << HaskellParser.LITERAL) | (1 << HaskellParser.NAME) | (1 << HaskellParser.LP))) !== 0)) {
				{
				{
				this.state = 158;
				this.expression(0);
				this.state = 166;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === HaskellParser.COMMA) {
					{
					this.state = 159;
					this.match(HaskellParser.COMMA);
					this.state = 163;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === HaskellParser.WHITESPACE) {
						{
						{
						this.state = 160;
						this.match(HaskellParser.WHITESPACE);
						}
						}
						this.state = 165;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				}
				}
				this.state = 172;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 173;
			this.match(HaskellParser.RP);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operator(): OperatorContext {
		let _localctx: OperatorContext = new OperatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, HaskellParser.RULE_operator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 175;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << HaskellParser.PLUS) | (1 << HaskellParser.MINUS) | (1 << HaskellParser.DIV) | (1 << HaskellParser.MUL) | (1 << HaskellParser.MOD) | (1 << HaskellParser.OR) | (1 << HaskellParser.AND) | (1 << HaskellParser.LT) | (1 << HaskellParser.LTE) | (1 << HaskellParser.GT) | (1 << HaskellParser.GTE) | (1 << HaskellParser.EQ) | (1 << HaskellParser.NEQ))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 6:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1F\xB4\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02\x1E\n\x02\x07\x02 \n\x02\f\x02" +
		"\x0E\x02#\v\x02\x03\x02\x03\x02\x03\x03\x03\x03\x07\x03)\n\x03\f\x03\x0E" +
		"\x03,\v\x03\x03\x03\x03\x03\x07\x030\n\x03\f\x03\x0E\x033\v\x03\x03\x03" +
		"\x03\x03\x03\x04\x03\x04\x07\x049\n\x04\f\x04\x0E\x04<\v\x04\x03\x04\x03" +
		"\x04\x07\x04@\n\x04\f\x04\x0E\x04C\v\x04\x03\x04\x07\x04F\n\x04\f\x04" +
		"\x0E\x04I\v\x04\x03\x05\x03\x05\x03\x05\x05\x05N\n\x05\x03\x05\x07\x05" +
		"Q\n\x05\f\x05\x0E\x05T\v\x05\x03\x05\x03\x05\x07\x05X\n\x05\f\x05\x0E" +
		"\x05[\v\x05\x03\x05\x03\x05\x03\x06\x07\x06`\n\x06\f\x06\x0E\x06c\v\x06" +
		"\x03\x06\x03\x06\x05\x06g\n\x06\x07\x06i\n\x06\f\x06\x0E\x06l\v\x06\x03" +
		"\x07\x07\x07o\n\x07\f\x07\x0E\x07r\v\x07\x03\x07\x03\x07\x07\x07v\n\x07" +
		"\f\x07\x0E\x07y\v\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x05\b\x83\n\b\x03\b\x03\b\x07\b\x87\n\b\f\b\x0E\b\x8A\v\b\x03\b\x03" +
		"\b\x07\b\x8E\n\b\f\b\x0E\b\x91\v\b\x03\b\x03\b\x07\b\x95\n\b\f\b\x0E\b" +
		"\x98\v\b\x03\t\x03\t\x03\t\x05\t\x9D\n\t\x03\n\x03\n\x03\n\x03\n\x03\n" +
		"\x07\n\xA4\n\n\f\n\x0E\n\xA7\v\n\x05\n\xA9\n\n\x07\n\xAB\n\n\f\n\x0E\n" +
		"\xAE\v\n\x03\n\x03\n\x03\v\x03\v\x03\v\x02\x02\x03\x0E\f\x02\x02\x04\x02" +
		"\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x02\x03\x03" +
		"\x02\r\x19\x02\xC2\x02!\x03\x02\x02\x02\x04&\x03\x02\x02\x02\x066\x03" +
		"\x02\x02\x02\bJ\x03\x02\x02\x02\nj\x03\x02\x02\x02\fp\x03\x02\x02\x02" +
		"\x0E\x82\x03\x02\x02\x02\x10\x9C\x03\x02\x02\x02\x12\x9E\x03\x02\x02\x02" +
		"\x14\xB1\x03\x02\x02\x02\x16\x17\x05\b\x05\x02\x17\x18\x07\x1E\x02\x02" +
		"\x18\x1E\x03\x02\x02\x02\x19\x1A\x05\x04\x03\x02\x1A\x1B\x07\x1E\x02\x02" +
		"\x1B\x1E\x03\x02\x02\x02\x1C\x1E\x07\x1E\x02\x02\x1D\x16\x03\x02\x02\x02" +
		"\x1D\x19\x03\x02\x02\x02\x1D\x1C\x03\x02\x02\x02\x1E \x03\x02\x02\x02" +
		"\x1F\x1D\x03\x02\x02\x02 #\x03\x02\x02\x02!\x1F\x03\x02\x02\x02!\"\x03" +
		"\x02\x02\x02\"$\x03\x02\x02\x02#!\x03\x02\x02\x02$%\x07\x02\x02\x03%\x03" +
		"\x03\x02\x02\x02&*\x07\x05\x02\x02\')\x07\x1F\x02\x02(\'\x03\x02\x02\x02" +
		"),\x03\x02\x02\x02*(\x03\x02\x02\x02*+\x03\x02\x02\x02+-\x03\x02\x02\x02" +
		",*\x03\x02\x02\x02-1\x07\x1A\x02\x02.0\x07\x1F\x02\x02/.\x03\x02\x02\x02" +
		"03\x03\x02\x02\x021/\x03\x02\x02\x0212\x03\x02\x02\x0224\x03\x02\x02\x02" +
		"31\x03\x02\x02\x0245\x05\x06\x04\x025\x05\x03\x02\x02\x026G\x07\x03\x02" +
		"\x0279\x07\x1F\x02\x0287\x03\x02\x02\x029<\x03\x02\x02\x02:8\x03\x02\x02" +
		"\x02:;\x03\x02\x02\x02;=\x03\x02\x02\x02<:\x03\x02\x02\x02=A\x07\x1B\x02" +
		"\x02>@\x07\x1F\x02\x02?>\x03\x02\x02\x02@C\x03\x02\x02\x02A?\x03\x02\x02" +
		"\x02AB\x03\x02\x02\x02BD\x03\x02\x02\x02CA\x03\x02\x02\x02DF\x07\x03\x02" +
		"\x02E:\x03\x02\x02\x02FI\x03\x02\x02\x02GE\x03\x02\x02\x02GH\x03\x02\x02" +
		"\x02H\x07\x03\x02\x02\x02IG\x03\x02\x02\x02JK\x07\x05\x02\x02KM\x05\n" +
		"\x06\x02LN\x05\f\x07\x02ML\x03\x02\x02\x02MN\x03\x02\x02\x02NR\x03\x02" +
		"\x02\x02OQ\x07\x1F\x02\x02PO\x03\x02\x02\x02QT\x03\x02\x02\x02RP\x03\x02" +
		"\x02\x02RS\x03\x02\x02\x02SU\x03\x02\x02\x02TR\x03\x02\x02\x02UY\x07\x1D" +
		"\x02\x02VX\x07\x1F\x02\x02WV\x03\x02\x02\x02X[\x03\x02\x02\x02YW\x03\x02" +
		"\x02\x02YZ\x03\x02\x02\x02Z\\\x03\x02\x02\x02[Y\x03\x02\x02\x02\\]\x05" +
		"\x0E\b\x02]\t\x03\x02\x02\x02^`\x07\x1F\x02\x02_^\x03\x02\x02\x02`c\x03" +
		"\x02\x02\x02a_\x03\x02\x02\x02ab\x03\x02\x02\x02bf\x03\x02\x02\x02ca\x03" +
		"\x02\x02\x02dg\x07\x04\x02\x02eg\x07\x05\x02\x02fd\x03\x02\x02\x02fe\x03" +
		"\x02\x02\x02gi\x03\x02\x02\x02ha\x03\x02\x02\x02il\x03\x02\x02\x02jh\x03" +
		"\x02\x02\x02jk\x03\x02\x02\x02k\v\x03\x02\x02\x02lj\x03\x02\x02\x02mo" +
		"\x07\x1F\x02\x02nm\x03\x02\x02\x02or\x03\x02\x02\x02pn\x03\x02\x02\x02" +
		"pq\x03\x02\x02\x02qs\x03\x02\x02\x02rp\x03\x02\x02\x02sw\x07\x1C\x02\x02" +
		"tv\x07\x1F\x02\x02ut\x03\x02\x02\x02vy\x03\x02\x02\x02wu\x03\x02\x02\x02" +
		"wx\x03\x02\x02\x02xz\x03\x02\x02\x02yw\x03\x02\x02\x02z{\x05\x0E\b\x02" +
		"{\r\x03\x02\x02\x02|}\b\b\x01\x02}~\x07\n\x02\x02~\x7F\x05\x0E\b\x02\x7F" +
		"\x80\x07\v\x02\x02\x80\x83\x03\x02\x02\x02\x81\x83\x05\x10\t\x02\x82|" +
		"\x03\x02\x02\x02\x82\x81\x03\x02\x02\x02\x83\x96\x03\x02\x02\x02\x84\x88" +
		"\f\x05\x02\x02\x85\x87\x07\x1F\x02\x02\x86\x85\x03\x02\x02\x02\x87\x8A" +
		"\x03\x02\x02\x02\x88\x86\x03\x02\x02\x02\x88\x89\x03\x02\x02\x02\x89\x8B" +
		"\x03\x02\x02\x02\x8A\x88\x03\x02\x02\x02\x8B\x8F\x05\x14\v\x02\x8C\x8E" +
		"\x07\x1F\x02\x02\x8D\x8C\x03\x02\x02\x02\x8E\x91\x03\x02\x02\x02\x8F\x8D" +
		"\x03\x02\x02\x02\x8F\x90\x03\x02\x02\x02\x90\x92\x03\x02\x02\x02\x91\x8F" +
		"\x03\x02\x02\x02\x92\x93\x05\x0E\b\x06\x93\x95\x03\x02\x02\x02\x94\x84" +
		"\x03\x02\x02\x02\x95\x98\x03\x02\x02\x02\x96\x94\x03\x02\x02\x02\x96\x97" +
		"\x03\x02\x02\x02\x97\x0F\x03\x02\x02\x02\x98\x96\x03\x02\x02\x02\x99\x9D" +
		"\x05\x12\n\x02\x9A\x9D\x07\x04\x02\x02\x9B\x9D\x07\x05\x02\x02\x9C\x99" +
		"\x03\x02\x02\x02\x9C\x9A\x03\x02\x02\x02\x9C\x9B\x03\x02\x02\x02\x9D\x11" +
		"\x03\x02\x02\x02\x9E\x9F\x07\x05\x02\x02\x9F\xAC\x07\n\x02\x02\xA0\xA8" +
		"\x05\x0E\b\x02\xA1\xA5\x07\f\x02\x02\xA2\xA4\x07\x1F\x02\x02\xA3\xA2\x03" +
		"\x02\x02\x02\xA4\xA7\x03\x02\x02\x02\xA5\xA3\x03\x02\x02\x02\xA5\xA6\x03" +
		"\x02\x02\x02\xA6\xA9\x03\x02\x02\x02\xA7\xA5\x03\x02\x02\x02\xA8\xA1\x03" +
		"\x02\x02\x02\xA8\xA9\x03\x02\x02\x02\xA9\xAB\x03\x02\x02\x02\xAA\xA0\x03" +
		"\x02\x02\x02\xAB\xAE\x03\x02\x02\x02\xAC\xAA\x03\x02\x02\x02\xAC\xAD\x03" +
		"\x02\x02\x02\xAD\xAF\x03\x02\x02\x02\xAE\xAC\x03\x02\x02\x02\xAF\xB0\x07" +
		"\v\x02\x02\xB0\x13\x03\x02\x02\x02\xB1\xB2\t\x02\x02\x02\xB2\x15\x03\x02" +
		"\x02\x02\x19\x1D!*1:AGMRYafjpw\x82\x88\x8F\x96\x9C\xA5\xA8\xAC";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!HaskellParser.__ATN) {
			HaskellParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(HaskellParser._serializedATN));
		}

		return HaskellParser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(HaskellParser.EOF, 0); }
	public function_implementation(): Function_implementationContext[];
	public function_implementation(i: number): Function_implementationContext;
	public function_implementation(i?: number): Function_implementationContext | Function_implementationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Function_implementationContext);
		} else {
			return this.getRuleContext(i, Function_implementationContext);
		}
	}
	public NEWLINE(): TerminalNode[];
	public NEWLINE(i: number): TerminalNode;
	public NEWLINE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.NEWLINE);
		} else {
			return this.getToken(HaskellParser.NEWLINE, i);
		}
	}
	public function_declaration(): Function_declarationContext[];
	public function_declaration(i: number): Function_declarationContext;
	public function_declaration(i?: number): Function_declarationContext | Function_declarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Function_declarationContext);
		} else {
			return this.getRuleContext(i, Function_declarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return HaskellParser.RULE_program; }
	// @Override
	public enterRule(listener: HaskellListener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: HaskellListener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
}


export class Function_declarationContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(HaskellParser.NAME, 0); }
	public DCOLON(): TerminalNode { return this.getToken(HaskellParser.DCOLON, 0); }
	public function_type(): Function_typeContext {
		return this.getRuleContext(0, Function_typeContext);
	}
	public WHITESPACE(): TerminalNode[];
	public WHITESPACE(i: number): TerminalNode;
	public WHITESPACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.WHITESPACE);
		} else {
			return this.getToken(HaskellParser.WHITESPACE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return HaskellParser.RULE_function_declaration; }
	// @Override
	public enterRule(listener: HaskellListener): void {
		if (listener.enterFunction_declaration) {
			listener.enterFunction_declaration(this);
		}
	}
	// @Override
	public exitRule(listener: HaskellListener): void {
		if (listener.exitFunction_declaration) {
			listener.exitFunction_declaration(this);
		}
	}
}


export class Function_typeContext extends ParserRuleContext {
	public _TYPE!: Token;
	public _type: Token[] = [];
	public TYPE(): TerminalNode[];
	public TYPE(i: number): TerminalNode;
	public TYPE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.TYPE);
		} else {
			return this.getToken(HaskellParser.TYPE, i);
		}
	}
	public IMPLIES(): TerminalNode[];
	public IMPLIES(i: number): TerminalNode;
	public IMPLIES(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.IMPLIES);
		} else {
			return this.getToken(HaskellParser.IMPLIES, i);
		}
	}
	public WHITESPACE(): TerminalNode[];
	public WHITESPACE(i: number): TerminalNode;
	public WHITESPACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.WHITESPACE);
		} else {
			return this.getToken(HaskellParser.WHITESPACE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return HaskellParser.RULE_function_type; }
	// @Override
	public enterRule(listener: HaskellListener): void {
		if (listener.enterFunction_type) {
			listener.enterFunction_type(this);
		}
	}
	// @Override
	public exitRule(listener: HaskellListener): void {
		if (listener.exitFunction_type) {
			listener.exitFunction_type(this);
		}
	}
}


export class Function_implementationContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(HaskellParser.NAME, 0); }
	public function_args_list(): Function_args_listContext {
		return this.getRuleContext(0, Function_args_listContext);
	}
	public EQUALS(): TerminalNode { return this.getToken(HaskellParser.EQUALS, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public function_guard(): Function_guardContext | undefined {
		return this.tryGetRuleContext(0, Function_guardContext);
	}
	public WHITESPACE(): TerminalNode[];
	public WHITESPACE(i: number): TerminalNode;
	public WHITESPACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.WHITESPACE);
		} else {
			return this.getToken(HaskellParser.WHITESPACE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return HaskellParser.RULE_function_implementation; }
	// @Override
	public enterRule(listener: HaskellListener): void {
		if (listener.enterFunction_implementation) {
			listener.enterFunction_implementation(this);
		}
	}
	// @Override
	public exitRule(listener: HaskellListener): void {
		if (listener.exitFunction_implementation) {
			listener.exitFunction_implementation(this);
		}
	}
}


export class Function_args_listContext extends ParserRuleContext {
	public _LITERAL!: Token;
	public _list: Token[] = [];
	public _NAME!: Token;
	public WHITESPACE(): TerminalNode[];
	public WHITESPACE(i: number): TerminalNode;
	public WHITESPACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.WHITESPACE);
		} else {
			return this.getToken(HaskellParser.WHITESPACE, i);
		}
	}
	public LITERAL(): TerminalNode[];
	public LITERAL(i: number): TerminalNode;
	public LITERAL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.LITERAL);
		} else {
			return this.getToken(HaskellParser.LITERAL, i);
		}
	}
	public NAME(): TerminalNode[];
	public NAME(i: number): TerminalNode;
	public NAME(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.NAME);
		} else {
			return this.getToken(HaskellParser.NAME, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return HaskellParser.RULE_function_args_list; }
	// @Override
	public enterRule(listener: HaskellListener): void {
		if (listener.enterFunction_args_list) {
			listener.enterFunction_args_list(this);
		}
	}
	// @Override
	public exitRule(listener: HaskellListener): void {
		if (listener.exitFunction_args_list) {
			listener.exitFunction_args_list(this);
		}
	}
}


export class Function_guardContext extends ParserRuleContext {
	public VBAR(): TerminalNode { return this.getToken(HaskellParser.VBAR, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public WHITESPACE(): TerminalNode[];
	public WHITESPACE(i: number): TerminalNode;
	public WHITESPACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.WHITESPACE);
		} else {
			return this.getToken(HaskellParser.WHITESPACE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return HaskellParser.RULE_function_guard; }
	// @Override
	public enterRule(listener: HaskellListener): void {
		if (listener.enterFunction_guard) {
			listener.enterFunction_guard(this);
		}
	}
	// @Override
	public exitRule(listener: HaskellListener): void {
		if (listener.exitFunction_guard) {
			listener.exitFunction_guard(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public operator(): OperatorContext | undefined {
		return this.tryGetRuleContext(0, OperatorContext);
	}
	public WHITESPACE(): TerminalNode[];
	public WHITESPACE(i: number): TerminalNode;
	public WHITESPACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.WHITESPACE);
		} else {
			return this.getToken(HaskellParser.WHITESPACE, i);
		}
	}
	public LP(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.LP, 0); }
	public RP(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.RP, 0); }
	public value(): ValueContext | undefined {
		return this.tryGetRuleContext(0, ValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return HaskellParser.RULE_expression; }
	// @Override
	public enterRule(listener: HaskellListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: HaskellListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	public function_call(): Function_callContext | undefined {
		return this.tryGetRuleContext(0, Function_callContext);
	}
	public LITERAL(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.LITERAL, 0); }
	public NAME(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return HaskellParser.RULE_value; }
	// @Override
	public enterRule(listener: HaskellListener): void {
		if (listener.enterValue) {
			listener.enterValue(this);
		}
	}
	// @Override
	public exitRule(listener: HaskellListener): void {
		if (listener.exitValue) {
			listener.exitValue(this);
		}
	}
}


export class Function_callContext extends ParserRuleContext {
	public NAME(): TerminalNode { return this.getToken(HaskellParser.NAME, 0); }
	public LP(): TerminalNode { return this.getToken(HaskellParser.LP, 0); }
	public RP(): TerminalNode { return this.getToken(HaskellParser.RP, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.COMMA);
		} else {
			return this.getToken(HaskellParser.COMMA, i);
		}
	}
	public WHITESPACE(): TerminalNode[];
	public WHITESPACE(i: number): TerminalNode;
	public WHITESPACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(HaskellParser.WHITESPACE);
		} else {
			return this.getToken(HaskellParser.WHITESPACE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return HaskellParser.RULE_function_call; }
	// @Override
	public enterRule(listener: HaskellListener): void {
		if (listener.enterFunction_call) {
			listener.enterFunction_call(this);
		}
	}
	// @Override
	public exitRule(listener: HaskellListener): void {
		if (listener.exitFunction_call) {
			listener.exitFunction_call(this);
		}
	}
}


export class OperatorContext extends ParserRuleContext {
	public MOD(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.MOD, 0); }
	public MUL(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.MUL, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.DIV, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.MINUS, 0); }
	public EQ(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.EQ, 0); }
	public NEQ(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.NEQ, 0); }
	public LT(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.LT, 0); }
	public LTE(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.LTE, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.GT, 0); }
	public GTE(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.GTE, 0); }
	public AND(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(HaskellParser.OR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return HaskellParser.RULE_operator; }
	// @Override
	public enterRule(listener: HaskellListener): void {
		if (listener.enterOperator) {
			listener.enterOperator(this);
		}
	}
	// @Override
	public exitRule(listener: HaskellListener): void {
		if (listener.exitOperator) {
			listener.exitOperator(this);
		}
	}
}


