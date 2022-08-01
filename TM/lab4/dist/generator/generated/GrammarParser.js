// Generated from Grammar.g4 by ANTLR 4.9.0-SNAPSHOT
import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { Token } from "antlr4ts/Token";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";
import * as Utils from "antlr4ts/misc/Utils";
export class GrammarParser extends Parser {
    constructor(input) {
        super(input);
        this._interp = new ParserATNSimulator(GrammarParser._ATN, this);
    }
    // @Override
    // @NotNull
    get vocabulary() {
        return GrammarParser.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace
    // @Override
    get grammarFileName() { return "Grammar.g4"; }
    // @Override
    get ruleNames() { return GrammarParser.ruleNames; }
    // @Override
    get serializedATN() { return GrammarParser._serializedATN; }
    createFailedPredicateException(predicate, message) {
        return new FailedPredicateException(this, predicate, message);
    }
    // @RuleVersion(0)
    grammar_file() {
        let _localctx = new Grammar_fileContext(this._ctx, this.state);
        this.enterRule(_localctx, 0, GrammarParser.RULE_grammar_file);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 38;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << GrammarParser.IGNORE) | (1 << GrammarParser.NAME) | (1 << GrammarParser.TOKEN_NAME) | (1 << GrammarParser.NEWLINE))) !== 0)) {
                    {
                        this.state = 36;
                        this._errHandler.sync(this);
                        switch (this._input.LA(1)) {
                            case GrammarParser.TOKEN_NAME:
                                {
                                    this.state = 26;
                                    this.lexer_rule();
                                    this.state = 27;
                                    this.match(GrammarParser.NEWLINE);
                                }
                                break;
                            case GrammarParser.IGNORE:
                                {
                                    this.state = 29;
                                    this.ignore_rule();
                                    this.state = 30;
                                    this.match(GrammarParser.NEWLINE);
                                }
                                break;
                            case GrammarParser.NAME:
                                {
                                    this.state = 32;
                                    this.parser_rule();
                                    this.state = 33;
                                    this.match(GrammarParser.NEWLINE);
                                }
                                break;
                            case GrammarParser.NEWLINE:
                                {
                                    this.state = 35;
                                    this.match(GrammarParser.NEWLINE);
                                }
                                break;
                            default:
                                throw new NoViableAltException(this);
                        }
                    }
                    this.state = 40;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 41;
                this.match(GrammarParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    lexer_rule() {
        let _localctx = new Lexer_ruleContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, GrammarParser.RULE_lexer_rule);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 43;
                this.match(GrammarParser.TOKEN_NAME);
                this.state = 44;
                this.match(GrammarParser.COLON);
                this.state = 48;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === GrammarParser.WHITESPACE) {
                    {
                        {
                            this.state = 45;
                            this.match(GrammarParser.WHITESPACE);
                        }
                    }
                    this.state = 50;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 51;
                this.value();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    value() {
        let _localctx = new ValueContext(this._ctx, this.state);
        this.enterRule(_localctx, 4, GrammarParser.RULE_value);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 53;
                _la = this._input.LA(1);
                if (!(_la === GrammarParser.STRING_VALUE || _la === GrammarParser.REGEXP_VALUE)) {
                    this._errHandler.recoverInline(this);
                }
                else {
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    ignore_rule() {
        let _localctx = new Ignore_ruleContext(this._ctx, this.state);
        this.enterRule(_localctx, 6, GrammarParser.RULE_ignore_rule);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 55;
                this.match(GrammarParser.IGNORE);
                this.state = 56;
                this.match(GrammarParser.COLON);
                this.state = 60;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === GrammarParser.WHITESPACE) {
                    {
                        {
                            this.state = 57;
                            this.match(GrammarParser.WHITESPACE);
                        }
                    }
                    this.state = 62;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 63;
                this.value();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    parser_rule() {
        let _localctx = new Parser_ruleContext(this._ctx, this.state);
        this.enterRule(_localctx, 8, GrammarParser.RULE_parser_rule);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 65;
                this.match(GrammarParser.NAME);
                this.state = 69;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === GrammarParser.WHITESPACE) {
                    {
                        {
                            this.state = 66;
                            this.match(GrammarParser.WHITESPACE);
                        }
                    }
                    this.state = 71;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 79;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === GrammarParser.T__1) {
                    {
                        this.state = 72;
                        this.inherited_attrs();
                        this.state = 76;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === GrammarParser.WHITESPACE) {
                            {
                                {
                                    this.state = 73;
                                    this.match(GrammarParser.WHITESPACE);
                                }
                            }
                            this.state = 78;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                    }
                }
                this.state = 94;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === GrammarParser.T__0) {
                    {
                        this.state = 81;
                        this.match(GrammarParser.T__0);
                        this.state = 83;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        do {
                            {
                                {
                                    this.state = 82;
                                    this.match(GrammarParser.WHITESPACE);
                                }
                            }
                            this.state = 85;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        } while (_la === GrammarParser.WHITESPACE);
                        this.state = 87;
                        this.synthesized_attr();
                        this.state = 91;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === GrammarParser.WHITESPACE) {
                            {
                                {
                                    this.state = 88;
                                    this.match(GrammarParser.WHITESPACE);
                                }
                            }
                            this.state = 93;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                    }
                }
                this.state = 96;
                this.match(GrammarParser.COLON);
                this.state = 100;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 97;
                                this.match(GrammarParser.WHITESPACE);
                            }
                        }
                    }
                    this.state = 102;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
                }
                this.state = 103;
                this.parser_rule_rp();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    inherited_attrs() {
        let _localctx = new Inherited_attrsContext(this._ctx, this.state);
        this.enterRule(_localctx, 10, GrammarParser.RULE_inherited_attrs);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 105;
                this.match(GrammarParser.T__1);
                this.state = 109;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === GrammarParser.WHITESPACE) {
                    {
                        {
                            this.state = 106;
                            this.match(GrammarParser.WHITESPACE);
                        }
                    }
                    this.state = 111;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 112;
                _localctx._attr = this.attr();
                _localctx._list.push(_localctx._attr);
                this.state = 123;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === GrammarParser.T__2) {
                    {
                        {
                            this.state = 113;
                            this.match(GrammarParser.T__2);
                            this.state = 117;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            while (_la === GrammarParser.WHITESPACE) {
                                {
                                    {
                                        this.state = 114;
                                        this.match(GrammarParser.WHITESPACE);
                                    }
                                }
                                this.state = 119;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                            }
                            this.state = 120;
                            _localctx._attr = this.attr();
                            _localctx._list.push(_localctx._attr);
                        }
                    }
                    this.state = 125;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 129;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === GrammarParser.WHITESPACE) {
                    {
                        {
                            this.state = 126;
                            this.match(GrammarParser.WHITESPACE);
                        }
                    }
                    this.state = 131;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 132;
                this.match(GrammarParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    attr() {
        let _localctx = new AttrContext(this._ctx, this.state);
        this.enterRule(_localctx, 12, GrammarParser.RULE_attr);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 134;
                this.match(GrammarParser.NAME);
                this.state = 135;
                this.match(GrammarParser.COLON);
                this.state = 136;
                this.match(GrammarParser.WHITESPACE);
                this.state = 137;
                this.attr_type();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    attr_type() {
        let _localctx = new Attr_typeContext(this._ctx, this.state);
        this.enterRule(_localctx, 14, GrammarParser.RULE_attr_type);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 145;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case GrammarParser.T__4:
                        {
                            this.state = 139;
                            this.match(GrammarParser.T__4);
                        }
                        break;
                    case GrammarParser.T__5:
                        {
                            this.state = 140;
                            this.match(GrammarParser.T__5);
                        }
                        break;
                    case GrammarParser.T__6:
                        {
                            this.state = 141;
                            this.match(GrammarParser.T__6);
                            this.state = 142;
                            this.attr_type();
                            this.state = 143;
                            this.match(GrammarParser.T__7);
                        }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    synthesized_attr() {
        let _localctx = new Synthesized_attrContext(this._ctx, this.state);
        this.enterRule(_localctx, 16, GrammarParser.RULE_synthesized_attr);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 147;
                this.match(GrammarParser.T__1);
                this.state = 151;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === GrammarParser.WHITESPACE) {
                    {
                        {
                            this.state = 148;
                            this.match(GrammarParser.WHITESPACE);
                        }
                    }
                    this.state = 153;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 154;
                this.attr();
                this.state = 158;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === GrammarParser.WHITESPACE) {
                    {
                        {
                            this.state = 155;
                            this.match(GrammarParser.WHITESPACE);
                        }
                    }
                    this.state = 160;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 161;
                this.match(GrammarParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    parser_rule_rp() {
        let _localctx = new Parser_rule_rpContext(this._ctx, this.state);
        this.enterRule(_localctx, 18, GrammarParser.RULE_parser_rule_rp);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 163;
                _localctx._expression = this.expression();
                _localctx._list.push(_localctx._expression);
                this.state = 170;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === GrammarParser.WHITESPACE) {
                    {
                        {
                            this.state = 164;
                            this.match(GrammarParser.WHITESPACE);
                            this.state = 165;
                            this.match(GrammarParser.T__8);
                            this.state = 166;
                            this.match(GrammarParser.WHITESPACE);
                            this.state = 167;
                            _localctx._expression = this.expression();
                            _localctx._list.push(_localctx._expression);
                        }
                    }
                    this.state = 172;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    expression() {
        let _localctx = new ExpressionContext(this._ctx, this.state);
        this.enterRule(_localctx, 20, GrammarParser.RULE_expression);
        try {
            let _alt;
            this.state = 182;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case GrammarParser.NAME:
                case GrammarParser.TOKEN_NAME:
                case GrammarParser.CODE:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 173;
                        _localctx._entry = this.entry();
                        _localctx._list.push(_localctx._entry);
                        this.state = 178;
                        this._errHandler.sync(this);
                        _alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
                        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                            if (_alt === 1) {
                                {
                                    {
                                        this.state = 174;
                                        this.match(GrammarParser.WHITESPACE);
                                        this.state = 175;
                                        _localctx._entry = this.entry();
                                        _localctx._list.push(_localctx._entry);
                                    }
                                }
                            }
                            this.state = 180;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
                        }
                    }
                    break;
                case GrammarParser.WHITESPACE:
                case GrammarParser.NEWLINE:
                    this.enterOuterAlt(_localctx, 2);
                    // tslint:disable-next-line:no-empty
                    {
                    }
                    break;
                default:
                    throw new NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    entry() {
        let _localctx = new EntryContext(this._ctx, this.state);
        this.enterRule(_localctx, 22, GrammarParser.RULE_entry);
        let _la;
        try {
            this.state = 190;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case GrammarParser.TOKEN_NAME:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 184;
                        this.match(GrammarParser.TOKEN_NAME);
                    }
                    break;
                case GrammarParser.NAME:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 185;
                        this.match(GrammarParser.NAME);
                        this.state = 187;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === GrammarParser.T__1) {
                            {
                                this.state = 186;
                                this.rule_args();
                            }
                        }
                    }
                    break;
                case GrammarParser.CODE:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 189;
                        this.match(GrammarParser.CODE);
                    }
                    break;
                default:
                    throw new NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    rule_args() {
        let _localctx = new Rule_argsContext(this._ctx, this.state);
        this.enterRule(_localctx, 24, GrammarParser.RULE_rule_args);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 192;
                this.match(GrammarParser.T__1);
                this.state = 193;
                _localctx._CODE = this.match(GrammarParser.CODE);
                _localctx._list.push(_localctx._CODE);
                this.state = 204;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === GrammarParser.T__2) {
                    {
                        {
                            this.state = 194;
                            this.match(GrammarParser.T__2);
                            this.state = 198;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            while (_la === GrammarParser.WHITESPACE) {
                                {
                                    {
                                        this.state = 195;
                                        this.match(GrammarParser.WHITESPACE);
                                    }
                                }
                                this.state = 200;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                            }
                            this.state = 201;
                            _localctx._CODE = this.match(GrammarParser.CODE);
                            _localctx._list.push(_localctx._CODE);
                        }
                    }
                    this.state = 206;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 207;
                this.match(GrammarParser.T__3);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    static get _ATN() {
        if (!GrammarParser.__ATN) {
            GrammarParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(GrammarParser._serializedATN));
        }
        return GrammarParser.__ATN;
    }
}
GrammarParser.T__0 = 1;
GrammarParser.T__1 = 2;
GrammarParser.T__2 = 3;
GrammarParser.T__3 = 4;
GrammarParser.T__4 = 5;
GrammarParser.T__5 = 6;
GrammarParser.T__6 = 7;
GrammarParser.T__7 = 8;
GrammarParser.T__8 = 9;
GrammarParser.STRING_VALUE = 10;
GrammarParser.REGEXP_VALUE = 11;
GrammarParser.COLON = 12;
GrammarParser.SQUOTE = 13;
GrammarParser.DQUOTE = 14;
GrammarParser.IGNORE = 15;
GrammarParser.NAME = 16;
GrammarParser.TOKEN_NAME = 17;
GrammarParser.CODE = 18;
GrammarParser.WHITESPACE = 19;
GrammarParser.NEWLINE = 20;
GrammarParser.RULE_grammar_file = 0;
GrammarParser.RULE_lexer_rule = 1;
GrammarParser.RULE_value = 2;
GrammarParser.RULE_ignore_rule = 3;
GrammarParser.RULE_parser_rule = 4;
GrammarParser.RULE_inherited_attrs = 5;
GrammarParser.RULE_attr = 6;
GrammarParser.RULE_attr_type = 7;
GrammarParser.RULE_synthesized_attr = 8;
GrammarParser.RULE_parser_rule_rp = 9;
GrammarParser.RULE_expression = 10;
GrammarParser.RULE_entry = 11;
GrammarParser.RULE_rule_args = 12;
// tslint:disable:no-trailing-whitespace
GrammarParser.ruleNames = [
    "grammar_file", "lexer_rule", "value", "ignore_rule", "parser_rule", "inherited_attrs",
    "attr", "attr_type", "synthesized_attr", "parser_rule_rp", "expression",
    "entry", "rule_args",
];
GrammarParser._LITERAL_NAMES = [
    undefined, "'returns'", "'['", "','", "']'", "'number'", "'string'", "'Array<'",
    "'>'", "'|'", undefined, undefined, "':'", "'''", "'\"'", "'@ignore'",
];
GrammarParser._SYMBOLIC_NAMES = [
    undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, "STRING_VALUE", "REGEXP_VALUE", "COLON",
    "SQUOTE", "DQUOTE", "IGNORE", "NAME", "TOKEN_NAME", "CODE", "WHITESPACE",
    "NEWLINE",
];
GrammarParser.VOCABULARY = new VocabularyImpl(GrammarParser._LITERAL_NAMES, GrammarParser._SYMBOLIC_NAMES, []);
GrammarParser._serializedATN = "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x16\xD4\x04\x02" +
    "\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
    "\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
    "\x0E\t\x0E\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
    "\x02\x03\x02\x03\x02\x07\x02\'\n\x02\f\x02\x0E\x02*\v\x02\x03\x02\x03" +
    "\x02\x03\x03\x03\x03\x03\x03\x07\x031\n\x03\f\x03\x0E\x034\v\x03\x03\x03" +
    "\x03\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x07\x05=\n\x05\f\x05" +
    "\x0E\x05@\v\x05\x03\x05\x03\x05\x03\x06\x03\x06\x07\x06F\n\x06\f\x06\x0E" +
    "\x06I\v\x06\x03\x06\x03\x06\x07\x06M\n\x06\f\x06\x0E\x06P\v\x06\x05\x06" +
    "R\n\x06\x03\x06\x03\x06\x06\x06V\n\x06\r\x06\x0E\x06W\x03\x06\x03\x06" +
    "\x07\x06\\\n\x06\f\x06\x0E\x06_\v\x06\x05\x06a\n\x06\x03\x06\x03\x06\x07" +
    "\x06e\n\x06\f\x06\x0E\x06h\v\x06\x03\x06\x03\x06\x03\x07\x03\x07\x07\x07" +
    "n\n\x07\f\x07\x0E\x07q\v\x07\x03\x07\x03\x07\x03\x07\x07\x07v\n\x07\f" +
    "\x07\x0E\x07y\v\x07\x03\x07\x07\x07|\n\x07\f\x07\x0E\x07\x7F\v\x07\x03" +
    "\x07\x07\x07\x82\n\x07\f\x07\x0E\x07\x85\v\x07\x03\x07\x03\x07\x03\b\x03" +
    "\b\x03\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x05\t\x94\n\t" +
    "\x03\n\x03\n\x07\n\x98\n\n\f\n\x0E\n\x9B\v\n\x03\n\x03\n\x07\n\x9F\n\n" +
    "\f\n\x0E\n\xA2\v\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x03\v\x07\v\xAB" +
    "\n\v\f\v\x0E\v\xAE\v\v\x03\f\x03\f\x03\f\x07\f\xB3\n\f\f\f\x0E\f\xB6\v" +
    "\f\x03\f\x05\f\xB9\n\f\x03\r\x03\r\x03\r\x05\r\xBE\n\r\x03\r\x05\r\xC1" +
    "\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x07\x0E\xC7\n\x0E\f\x0E\x0E\x0E\xCA" +
    "\v\x0E\x03\x0E\x07\x0E\xCD\n\x0E\f\x0E\x0E\x0E\xD0\v\x0E\x03\x0E\x03\x0E" +
    "\x03\x0E\x02\x02\x02\x0F\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E" +
    "\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x02\x03\x03\x02\f" +
    "\r\x02\xE3\x02(\x03\x02\x02\x02\x04-\x03\x02\x02\x02\x067\x03\x02\x02" +
    "\x02\b9\x03\x02\x02\x02\nC\x03\x02\x02\x02\fk\x03\x02\x02\x02\x0E\x88" +
    "\x03\x02\x02\x02\x10\x93\x03\x02\x02\x02\x12\x95\x03\x02\x02\x02\x14\xA5" +
    "\x03\x02\x02\x02\x16\xB8\x03\x02\x02\x02\x18\xC0\x03\x02\x02\x02\x1A\xC2" +
    "\x03\x02\x02\x02\x1C\x1D\x05\x04\x03\x02\x1D\x1E\x07\x16\x02\x02\x1E\'" +
    "\x03\x02\x02\x02\x1F \x05\b\x05\x02 !\x07\x16\x02\x02!\'\x03\x02\x02\x02" +
    "\"#\x05\n\x06\x02#$\x07\x16\x02\x02$\'\x03\x02\x02\x02%\'\x07\x16\x02" +
    "\x02&\x1C\x03\x02\x02\x02&\x1F\x03\x02\x02\x02&\"\x03\x02\x02\x02&%\x03" +
    "\x02\x02\x02\'*\x03\x02\x02\x02(&\x03\x02\x02\x02()\x03\x02\x02\x02)+" +
    "\x03\x02\x02\x02*(\x03\x02\x02\x02+,\x07\x02\x02\x03,\x03\x03\x02\x02" +
    "\x02-.\x07\x13\x02\x02.2\x07\x0E\x02\x02/1\x07\x15\x02\x020/\x03\x02\x02" +
    "\x0214\x03\x02\x02\x0220\x03\x02\x02\x0223\x03\x02\x02\x0235\x03\x02\x02" +
    "\x0242\x03\x02\x02\x0256\x05\x06\x04\x026\x05\x03\x02\x02\x0278\t\x02" +
    "\x02\x028\x07\x03\x02\x02\x029:\x07\x11\x02\x02:>\x07\x0E\x02\x02;=\x07" +
    "\x15\x02\x02<;\x03\x02\x02\x02=@\x03\x02\x02\x02><\x03\x02\x02\x02>?\x03" +
    "\x02\x02\x02?A\x03\x02\x02\x02@>\x03\x02\x02\x02AB\x05\x06\x04\x02B\t" +
    "\x03\x02\x02\x02CG\x07\x12\x02\x02DF\x07\x15\x02\x02ED\x03\x02\x02\x02" +
    "FI\x03\x02\x02\x02GE\x03\x02\x02\x02GH\x03\x02\x02\x02HQ\x03\x02\x02\x02" +
    "IG\x03\x02\x02\x02JN\x05\f\x07\x02KM\x07\x15\x02\x02LK\x03\x02\x02\x02" +
    "MP\x03\x02\x02\x02NL\x03\x02\x02\x02NO\x03\x02\x02\x02OR\x03\x02\x02\x02" +
    "PN\x03\x02\x02\x02QJ\x03\x02\x02\x02QR\x03\x02\x02\x02R`\x03\x02\x02\x02" +
    "SU\x07\x03\x02\x02TV\x07\x15\x02\x02UT\x03\x02\x02\x02VW\x03\x02\x02\x02" +
    "WU\x03\x02\x02\x02WX\x03\x02\x02\x02XY\x03\x02\x02\x02Y]\x05\x12\n\x02" +
    "Z\\\x07\x15\x02\x02[Z\x03\x02\x02\x02\\_\x03\x02\x02\x02][\x03\x02\x02" +
    "\x02]^\x03\x02\x02\x02^a\x03\x02\x02\x02_]\x03\x02\x02\x02`S\x03\x02\x02" +
    "\x02`a\x03\x02\x02\x02ab\x03\x02\x02\x02bf\x07\x0E\x02\x02ce\x07\x15\x02" +
    "\x02dc\x03\x02\x02\x02eh\x03\x02\x02\x02fd\x03\x02\x02\x02fg\x03\x02\x02" +
    "\x02gi\x03\x02\x02\x02hf\x03\x02\x02\x02ij\x05\x14\v\x02j\v\x03\x02\x02" +
    "\x02ko\x07\x04\x02\x02ln\x07\x15\x02\x02ml\x03\x02\x02\x02nq\x03\x02\x02" +
    "\x02om\x03\x02\x02\x02op\x03\x02\x02\x02pr\x03\x02\x02\x02qo\x03\x02\x02" +
    "\x02r}\x05\x0E\b\x02sw\x07\x05\x02\x02tv\x07\x15\x02\x02ut\x03\x02\x02" +
    "\x02vy\x03\x02\x02\x02wu\x03\x02\x02\x02wx\x03\x02\x02\x02xz\x03\x02\x02" +
    "\x02yw\x03\x02\x02\x02z|\x05\x0E\b\x02{s\x03\x02\x02\x02|\x7F\x03\x02" +
    "\x02\x02}{\x03\x02\x02\x02}~\x03\x02\x02\x02~\x83\x03\x02\x02\x02\x7F" +
    "}\x03\x02\x02\x02\x80\x82\x07\x15\x02\x02\x81\x80\x03\x02\x02\x02\x82" +
    "\x85\x03\x02\x02\x02\x83\x81\x03\x02\x02\x02\x83\x84\x03\x02\x02\x02\x84" +
    "\x86\x03\x02\x02\x02\x85\x83\x03\x02\x02\x02\x86\x87\x07\x06\x02\x02\x87" +
    "\r\x03\x02\x02\x02\x88\x89\x07\x12\x02\x02\x89\x8A\x07\x0E\x02\x02\x8A" +
    "\x8B\x07\x15\x02\x02\x8B\x8C\x05\x10\t\x02\x8C\x0F\x03\x02\x02\x02\x8D" +
    "\x94\x07\x07\x02\x02\x8E\x94\x07\b\x02\x02\x8F\x90\x07\t\x02\x02\x90\x91" +
    "\x05\x10\t\x02\x91\x92\x07\n\x02\x02\x92\x94\x03\x02\x02\x02\x93\x8D\x03" +
    "\x02\x02\x02\x93\x8E\x03\x02\x02\x02\x93\x8F\x03\x02\x02\x02\x94\x11\x03" +
    "\x02\x02\x02\x95\x99\x07\x04\x02\x02\x96\x98\x07\x15\x02\x02\x97\x96\x03" +
    "\x02\x02\x02\x98\x9B\x03\x02\x02\x02\x99\x97\x03\x02\x02\x02\x99\x9A\x03" +
    "\x02\x02\x02\x9A\x9C\x03\x02\x02\x02\x9B\x99\x03\x02\x02\x02\x9C\xA0\x05" +
    "\x0E\b\x02\x9D\x9F\x07\x15\x02\x02\x9E\x9D\x03\x02\x02\x02\x9F\xA2\x03" +
    "\x02\x02\x02\xA0\x9E\x03\x02\x02\x02\xA0\xA1\x03\x02\x02\x02\xA1\xA3\x03" +
    "\x02\x02\x02\xA2\xA0\x03\x02\x02\x02\xA3\xA4\x07\x06\x02\x02\xA4\x13\x03" +
    "\x02\x02\x02\xA5\xAC\x05\x16\f\x02\xA6\xA7\x07\x15\x02\x02\xA7\xA8\x07" +
    "\v\x02\x02\xA8\xA9\x07\x15\x02\x02\xA9\xAB\x05\x16\f\x02\xAA\xA6\x03\x02" +
    "\x02\x02\xAB\xAE\x03\x02\x02\x02\xAC\xAA\x03\x02\x02\x02\xAC\xAD\x03\x02" +
    "\x02\x02\xAD\x15\x03\x02\x02\x02\xAE\xAC\x03\x02\x02\x02\xAF\xB4\x05\x18" +
    "\r\x02\xB0\xB1\x07\x15\x02\x02\xB1\xB3\x05\x18\r\x02\xB2\xB0\x03\x02\x02" +
    "\x02\xB3\xB6\x03\x02\x02\x02\xB4\xB2\x03\x02\x02\x02\xB4\xB5\x03\x02\x02" +
    "\x02\xB5\xB9\x03\x02\x02\x02\xB6\xB4\x03\x02\x02\x02\xB7\xB9\x03\x02\x02" +
    "\x02\xB8\xAF\x03\x02\x02\x02\xB8\xB7\x03\x02\x02\x02\xB9\x17\x03\x02\x02" +
    "\x02\xBA\xC1\x07\x13\x02\x02\xBB\xBD\x07\x12\x02\x02\xBC\xBE\x05\x1A\x0E" +
    "\x02\xBD\xBC\x03\x02\x02\x02\xBD\xBE\x03\x02\x02\x02\xBE\xC1\x03\x02\x02" +
    "\x02\xBF\xC1\x07\x14\x02\x02\xC0\xBA\x03\x02\x02\x02\xC0\xBB\x03\x02\x02" +
    "\x02\xC0\xBF\x03\x02\x02\x02\xC1\x19\x03\x02\x02\x02\xC2\xC3\x07\x04\x02" +
    "\x02\xC3\xCE\x07\x14\x02\x02\xC4\xC8\x07\x05\x02\x02\xC5\xC7\x07\x15\x02" +
    "\x02\xC6\xC5\x03\x02\x02\x02\xC7\xCA\x03\x02\x02\x02\xC8\xC6\x03\x02\x02" +
    "\x02\xC8\xC9\x03\x02\x02\x02\xC9\xCB\x03\x02\x02\x02\xCA\xC8\x03\x02\x02" +
    "\x02\xCB\xCD\x07\x14\x02\x02\xCC\xC4\x03\x02\x02\x02\xCD\xD0\x03\x02\x02" +
    "\x02\xCE\xCC\x03\x02\x02\x02\xCE\xCF\x03\x02\x02\x02\xCF\xD1\x03\x02\x02" +
    "\x02\xD0\xCE\x03\x02\x02\x02\xD1\xD2\x07\x06\x02\x02\xD2\x1B\x03\x02\x02" +
    "\x02\x1B&(2>GNQW]`fow}\x83\x93\x99\xA0\xAC\xB4\xB8\xBD\xC0\xC8\xCE";
export class Grammar_fileContext extends ParserRuleContext {
    EOF() { return this.getToken(GrammarParser.EOF, 0); }
    lexer_rule(i) {
        if (i === undefined) {
            return this.getRuleContexts(Lexer_ruleContext);
        }
        else {
            return this.getRuleContext(i, Lexer_ruleContext);
        }
    }
    NEWLINE(i) {
        if (i === undefined) {
            return this.getTokens(GrammarParser.NEWLINE);
        }
        else {
            return this.getToken(GrammarParser.NEWLINE, i);
        }
    }
    ignore_rule(i) {
        if (i === undefined) {
            return this.getRuleContexts(Ignore_ruleContext);
        }
        else {
            return this.getRuleContext(i, Ignore_ruleContext);
        }
    }
    parser_rule(i) {
        if (i === undefined) {
            return this.getRuleContexts(Parser_ruleContext);
        }
        else {
            return this.getRuleContext(i, Parser_ruleContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_grammar_file; }
    // @Override
    enterRule(listener) {
        if (listener.enterGrammar_file) {
            listener.enterGrammar_file(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitGrammar_file) {
            listener.exitGrammar_file(this);
        }
    }
}
export class Lexer_ruleContext extends ParserRuleContext {
    TOKEN_NAME() { return this.getToken(GrammarParser.TOKEN_NAME, 0); }
    COLON() { return this.getToken(GrammarParser.COLON, 0); }
    value() {
        return this.getRuleContext(0, ValueContext);
    }
    WHITESPACE(i) {
        if (i === undefined) {
            return this.getTokens(GrammarParser.WHITESPACE);
        }
        else {
            return this.getToken(GrammarParser.WHITESPACE, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_lexer_rule; }
    // @Override
    enterRule(listener) {
        if (listener.enterLexer_rule) {
            listener.enterLexer_rule(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitLexer_rule) {
            listener.exitLexer_rule(this);
        }
    }
}
export class ValueContext extends ParserRuleContext {
    STRING_VALUE() { return this.tryGetToken(GrammarParser.STRING_VALUE, 0); }
    REGEXP_VALUE() { return this.tryGetToken(GrammarParser.REGEXP_VALUE, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_value; }
    // @Override
    enterRule(listener) {
        if (listener.enterValue) {
            listener.enterValue(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitValue) {
            listener.exitValue(this);
        }
    }
}
export class Ignore_ruleContext extends ParserRuleContext {
    IGNORE() { return this.getToken(GrammarParser.IGNORE, 0); }
    COLON() { return this.getToken(GrammarParser.COLON, 0); }
    value() {
        return this.getRuleContext(0, ValueContext);
    }
    WHITESPACE(i) {
        if (i === undefined) {
            return this.getTokens(GrammarParser.WHITESPACE);
        }
        else {
            return this.getToken(GrammarParser.WHITESPACE, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_ignore_rule; }
    // @Override
    enterRule(listener) {
        if (listener.enterIgnore_rule) {
            listener.enterIgnore_rule(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitIgnore_rule) {
            listener.exitIgnore_rule(this);
        }
    }
}
export class Parser_ruleContext extends ParserRuleContext {
    NAME() { return this.getToken(GrammarParser.NAME, 0); }
    COLON() { return this.getToken(GrammarParser.COLON, 0); }
    parser_rule_rp() {
        return this.getRuleContext(0, Parser_rule_rpContext);
    }
    WHITESPACE(i) {
        if (i === undefined) {
            return this.getTokens(GrammarParser.WHITESPACE);
        }
        else {
            return this.getToken(GrammarParser.WHITESPACE, i);
        }
    }
    inherited_attrs() {
        return this.tryGetRuleContext(0, Inherited_attrsContext);
    }
    synthesized_attr() {
        return this.tryGetRuleContext(0, Synthesized_attrContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_parser_rule; }
    // @Override
    enterRule(listener) {
        if (listener.enterParser_rule) {
            listener.enterParser_rule(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitParser_rule) {
            listener.exitParser_rule(this);
        }
    }
}
export class Inherited_attrsContext extends ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
        this._list = [];
    }
    attr(i) {
        if (i === undefined) {
            return this.getRuleContexts(AttrContext);
        }
        else {
            return this.getRuleContext(i, AttrContext);
        }
    }
    WHITESPACE(i) {
        if (i === undefined) {
            return this.getTokens(GrammarParser.WHITESPACE);
        }
        else {
            return this.getToken(GrammarParser.WHITESPACE, i);
        }
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_inherited_attrs; }
    // @Override
    enterRule(listener) {
        if (listener.enterInherited_attrs) {
            listener.enterInherited_attrs(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitInherited_attrs) {
            listener.exitInherited_attrs(this);
        }
    }
}
export class AttrContext extends ParserRuleContext {
    NAME() { return this.getToken(GrammarParser.NAME, 0); }
    COLON() { return this.getToken(GrammarParser.COLON, 0); }
    WHITESPACE() { return this.getToken(GrammarParser.WHITESPACE, 0); }
    attr_type() {
        return this.getRuleContext(0, Attr_typeContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_attr; }
    // @Override
    enterRule(listener) {
        if (listener.enterAttr) {
            listener.enterAttr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAttr) {
            listener.exitAttr(this);
        }
    }
}
export class Attr_typeContext extends ParserRuleContext {
    attr_type() {
        return this.tryGetRuleContext(0, Attr_typeContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_attr_type; }
    // @Override
    enterRule(listener) {
        if (listener.enterAttr_type) {
            listener.enterAttr_type(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAttr_type) {
            listener.exitAttr_type(this);
        }
    }
}
export class Synthesized_attrContext extends ParserRuleContext {
    attr() {
        return this.getRuleContext(0, AttrContext);
    }
    WHITESPACE(i) {
        if (i === undefined) {
            return this.getTokens(GrammarParser.WHITESPACE);
        }
        else {
            return this.getToken(GrammarParser.WHITESPACE, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_synthesized_attr; }
    // @Override
    enterRule(listener) {
        if (listener.enterSynthesized_attr) {
            listener.enterSynthesized_attr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSynthesized_attr) {
            listener.exitSynthesized_attr(this);
        }
    }
}
export class Parser_rule_rpContext extends ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
        this._list = [];
    }
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    WHITESPACE(i) {
        if (i === undefined) {
            return this.getTokens(GrammarParser.WHITESPACE);
        }
        else {
            return this.getToken(GrammarParser.WHITESPACE, i);
        }
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_parser_rule_rp; }
    // @Override
    enterRule(listener) {
        if (listener.enterParser_rule_rp) {
            listener.enterParser_rule_rp(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitParser_rule_rp) {
            listener.exitParser_rule_rp(this);
        }
    }
}
export class ExpressionContext extends ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
        this._list = [];
    }
    entry(i) {
        if (i === undefined) {
            return this.getRuleContexts(EntryContext);
        }
        else {
            return this.getRuleContext(i, EntryContext);
        }
    }
    WHITESPACE(i) {
        if (i === undefined) {
            return this.getTokens(GrammarParser.WHITESPACE);
        }
        else {
            return this.getToken(GrammarParser.WHITESPACE, i);
        }
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_expression; }
    // @Override
    enterRule(listener) {
        if (listener.enterExpression) {
            listener.enterExpression(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitExpression) {
            listener.exitExpression(this);
        }
    }
}
export class EntryContext extends ParserRuleContext {
    TOKEN_NAME() { return this.tryGetToken(GrammarParser.TOKEN_NAME, 0); }
    NAME() { return this.tryGetToken(GrammarParser.NAME, 0); }
    rule_args() {
        return this.tryGetRuleContext(0, Rule_argsContext);
    }
    CODE() { return this.tryGetToken(GrammarParser.CODE, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_entry; }
    // @Override
    enterRule(listener) {
        if (listener.enterEntry) {
            listener.enterEntry(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitEntry) {
            listener.exitEntry(this);
        }
    }
}
export class Rule_argsContext extends ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
        this._list = [];
    }
    CODE(i) {
        if (i === undefined) {
            return this.getTokens(GrammarParser.CODE);
        }
        else {
            return this.getToken(GrammarParser.CODE, i);
        }
    }
    WHITESPACE(i) {
        if (i === undefined) {
            return this.getTokens(GrammarParser.WHITESPACE);
        }
        else {
            return this.getToken(GrammarParser.WHITESPACE, i);
        }
    }
    // @Override
    get ruleIndex() { return GrammarParser.RULE_rule_args; }
    // @Override
    enterRule(listener) {
        if (listener.enterRule_args) {
            listener.enterRule_args(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitRule_args) {
            listener.exitRule_args(this);
        }
    }
}
//# sourceMappingURL=GrammarParser.js.map