// Generated from /home/sandman/Projects/ITMO/university/TM/lab3/src/Haskell.g4 by ANTLR 4.8
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class HaskellLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		TYPE=1, LITERAL=2, NAME=3, STRING=4, DOUBLE=5, INT=6, BOOL=7, LP=8, RP=9, 
		COMMA=10, PLUS=11, MINUS=12, DIV=13, MUL=14, MOD=15, OR=16, AND=17, LT=18, 
		LTE=19, GT=20, GTE=21, EQ=22, NEQ=23, DCOLON=24, IMPLIES=25, VBAR=26, 
		EQUALS=27, NEWLINE=28, WHITESPACE=29;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"TYPE", "LITERAL", "NAME", "STRING", "DOUBLE", "INT", "BOOL", "LP", "RP", 
			"COMMA", "PLUS", "MINUS", "DIV", "MUL", "MOD", "OR", "AND", "LT", "LTE", 
			"GT", "GTE", "EQ", "NEQ", "DCOLON", "IMPLIES", "VBAR", "EQUALS", "NEWLINE", 
			"WHITESPACE"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, "'('", "')'", "','", 
			"'+'", "'-'", "'/'", "'*'", "'%'", "'||'", "'&&'", "'<'", "'<='", "'>'", 
			"'>='", "'=='", "'/='", "'::'", "'->'", "'|'", "'='"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "TYPE", "LITERAL", "NAME", "STRING", "DOUBLE", "INT", "BOOL", "LP", 
			"RP", "COMMA", "PLUS", "MINUS", "DIV", "MUL", "MOD", "OR", "AND", "LT", 
			"LTE", "GT", "GTE", "EQ", "NEQ", "DCOLON", "IMPLIES", "VBAR", "EQUALS", 
			"NEWLINE", "WHITESPACE"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public HaskellLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "Haskell.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\37\u00c0\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31"+
		"\t\31\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\3\2\3\2\3\2\3"+
		"\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\5\2Q\n"+
		"\2\3\3\3\3\3\3\3\3\5\3W\n\3\3\4\3\4\7\4[\n\4\f\4\16\4^\13\4\3\5\3\5\7"+
		"\5b\n\5\f\5\16\5e\13\5\3\5\3\5\3\6\3\6\3\6\7\6l\n\6\f\6\16\6o\13\6\5\6"+
		"q\n\6\3\7\5\7t\n\7\3\7\6\7w\n\7\r\7\16\7x\3\b\3\b\3\b\3\b\3\b\3\b\3\b"+
		"\3\b\3\b\5\b\u0084\n\b\3\t\3\t\3\n\3\n\3\13\3\13\3\f\3\f\3\r\3\r\3\16"+
		"\3\16\3\17\3\17\3\20\3\20\3\21\3\21\3\21\3\22\3\22\3\22\3\23\3\23\3\24"+
		"\3\24\3\24\3\25\3\25\3\26\3\26\3\26\3\27\3\27\3\27\3\30\3\30\3\30\3\31"+
		"\3\31\3\31\3\32\3\32\3\32\3\33\3\33\3\34\3\34\3\35\5\35\u00b7\n\35\3\35"+
		"\3\35\6\35\u00bb\n\35\r\35\16\35\u00bc\3\36\3\36\3c\2\37\3\3\5\4\7\5\t"+
		"\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16\33\17\35\20\37\21!\22#\23"+
		"%\24\'\25)\26+\27-\30/\31\61\32\63\33\65\34\67\359\36;\37\3\2\6\5\2C\\"+
		"aac|\7\2))\62;C\\aac|\3\2\62;\4\2\13\13\"\"\2\u00cf\2\3\3\2\2\2\2\5\3"+
		"\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2"+
		"\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3"+
		"\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'"+
		"\3\2\2\2\2)\3\2\2\2\2+\3\2\2\2\2-\3\2\2\2\2/\3\2\2\2\2\61\3\2\2\2\2\63"+
		"\3\2\2\2\2\65\3\2\2\2\2\67\3\2\2\2\29\3\2\2\2\2;\3\2\2\2\3P\3\2\2\2\5"+
		"V\3\2\2\2\7X\3\2\2\2\t_\3\2\2\2\13h\3\2\2\2\rs\3\2\2\2\17\u0083\3\2\2"+
		"\2\21\u0085\3\2\2\2\23\u0087\3\2\2\2\25\u0089\3\2\2\2\27\u008b\3\2\2\2"+
		"\31\u008d\3\2\2\2\33\u008f\3\2\2\2\35\u0091\3\2\2\2\37\u0093\3\2\2\2!"+
		"\u0095\3\2\2\2#\u0098\3\2\2\2%\u009b\3\2\2\2\'\u009d\3\2\2\2)\u00a0\3"+
		"\2\2\2+\u00a2\3\2\2\2-\u00a5\3\2\2\2/\u00a8\3\2\2\2\61\u00ab\3\2\2\2\63"+
		"\u00ae\3\2\2\2\65\u00b1\3\2\2\2\67\u00b3\3\2\2\29\u00ba\3\2\2\2;\u00be"+
		"\3\2\2\2=>\7D\2\2>?\7q\2\2?@\7q\2\2@Q\7n\2\2AB\7K\2\2BC\7p\2\2CQ\7v\2"+
		"\2DE\7F\2\2EF\7q\2\2FG\7w\2\2GH\7d\2\2HI\7n\2\2IQ\7g\2\2JK\7U\2\2KL\7"+
		"v\2\2LM\7t\2\2MN\7k\2\2NO\7p\2\2OQ\7i\2\2P=\3\2\2\2PA\3\2\2\2PD\3\2\2"+
		"\2PJ\3\2\2\2Q\4\3\2\2\2RW\5\17\b\2SW\5\r\7\2TW\5\13\6\2UW\5\t\5\2VR\3"+
		"\2\2\2VS\3\2\2\2VT\3\2\2\2VU\3\2\2\2W\6\3\2\2\2X\\\t\2\2\2Y[\t\3\2\2Z"+
		"Y\3\2\2\2[^\3\2\2\2\\Z\3\2\2\2\\]\3\2\2\2]\b\3\2\2\2^\\\3\2\2\2_c\7$\2"+
		"\2`b\13\2\2\2a`\3\2\2\2be\3\2\2\2cd\3\2\2\2ca\3\2\2\2df\3\2\2\2ec\3\2"+
		"\2\2fg\7$\2\2g\n\3\2\2\2hp\5\r\7\2im\7\60\2\2jl\t\4\2\2kj\3\2\2\2lo\3"+
		"\2\2\2mk\3\2\2\2mn\3\2\2\2nq\3\2\2\2om\3\2\2\2pi\3\2\2\2pq\3\2\2\2q\f"+
		"\3\2\2\2rt\7/\2\2sr\3\2\2\2st\3\2\2\2tv\3\2\2\2uw\t\4\2\2vu\3\2\2\2wx"+
		"\3\2\2\2xv\3\2\2\2xy\3\2\2\2y\16\3\2\2\2z{\7h\2\2{|\7c\2\2|}\7n\2\2}~"+
		"\7u\2\2~\u0084\7g\2\2\177\u0080\7v\2\2\u0080\u0081\7t\2\2\u0081\u0082"+
		"\7w\2\2\u0082\u0084\7g\2\2\u0083z\3\2\2\2\u0083\177\3\2\2\2\u0084\20\3"+
		"\2\2\2\u0085\u0086\7*\2\2\u0086\22\3\2\2\2\u0087\u0088\7+\2\2\u0088\24"+
		"\3\2\2\2\u0089\u008a\7.\2\2\u008a\26\3\2\2\2\u008b\u008c\7-\2\2\u008c"+
		"\30\3\2\2\2\u008d\u008e\7/\2\2\u008e\32\3\2\2\2\u008f\u0090\7\61\2\2\u0090"+
		"\34\3\2\2\2\u0091\u0092\7,\2\2\u0092\36\3\2\2\2\u0093\u0094\7\'\2\2\u0094"+
		" \3\2\2\2\u0095\u0096\7~\2\2\u0096\u0097\7~\2\2\u0097\"\3\2\2\2\u0098"+
		"\u0099\7(\2\2\u0099\u009a\7(\2\2\u009a$\3\2\2\2\u009b\u009c\7>\2\2\u009c"+
		"&\3\2\2\2\u009d\u009e\7>\2\2\u009e\u009f\7?\2\2\u009f(\3\2\2\2\u00a0\u00a1"+
		"\7@\2\2\u00a1*\3\2\2\2\u00a2\u00a3\7@\2\2\u00a3\u00a4\7?\2\2\u00a4,\3"+
		"\2\2\2\u00a5\u00a6\7?\2\2\u00a6\u00a7\7?\2\2\u00a7.\3\2\2\2\u00a8\u00a9"+
		"\7\61\2\2\u00a9\u00aa\7?\2\2\u00aa\60\3\2\2\2\u00ab\u00ac\7<\2\2\u00ac"+
		"\u00ad\7<\2\2\u00ad\62\3\2\2\2\u00ae\u00af\7/\2\2\u00af\u00b0\7@\2\2\u00b0"+
		"\64\3\2\2\2\u00b1\u00b2\7~\2\2\u00b2\66\3\2\2\2\u00b3\u00b4\7?\2\2\u00b4"+
		"8\3\2\2\2\u00b5\u00b7\7\17\2\2\u00b6\u00b5\3\2\2\2\u00b6\u00b7\3\2\2\2"+
		"\u00b7\u00b8\3\2\2\2\u00b8\u00bb\7\f\2\2\u00b9\u00bb\7\17\2\2\u00ba\u00b6"+
		"\3\2\2\2\u00ba\u00b9\3\2\2\2\u00bb\u00bc\3\2\2\2\u00bc\u00ba\3\2\2\2\u00bc"+
		"\u00bd\3\2\2\2\u00bd:\3\2\2\2\u00be\u00bf\t\5\2\2\u00bf<\3\2\2\2\17\2"+
		"PV\\cmpsx\u0083\u00b6\u00ba\u00bc\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}