grammar Grammar;

/* parser_rule [name: type,  ..., name: type] returns [name: type]:
      rule | TOKEN | rule {_ CODE _}
 */

grammar_file: (
		lexer_rule NEWLINE
		| ignore_rule NEWLINE
		| parser_rule NEWLINE
		| NEWLINE
	)* EOF;

lexer_rule: TOKEN_NAME COLON WHITESPACE* value;
value: STRING_VALUE | REGEXP_VALUE;
ignore_rule: IGNORE COLON WHITESPACE* value;

parser_rule:
	NAME WHITESPACE* (inherited_attrs WHITESPACE*)? (
		'returns' WHITESPACE+ synthesized_attr WHITESPACE*
	)? COLON WHITESPACE* parser_rule_rp;

inherited_attrs:
	'[' WHITESPACE* list += attr (',' WHITESPACE* list += attr)* WHITESPACE* ']';
attr: NAME COLON WHITESPACE attr_type;
attr_type: ('number' | 'string' | 'Array<' attr_type '>');
synthesized_attr: '[' WHITESPACE* attr WHITESPACE* ']';

parser_rule_rp:
	list += expression (
		WHITESPACE '|' WHITESPACE list += expression
	)*;
expression: list+=entry (
		WHITESPACE list+=entry
	)*
	|;
entry: TOKEN_NAME | NAME rule_args? | CODE;
rule_args: '[' list += CODE (',' WHITESPACE* list += CODE)* ']';

STRING_VALUE: DQUOTE .*? DQUOTE;
REGEXP_VALUE: SQUOTE .*? SQUOTE;
COLON: ':';
SQUOTE: '\'';
DQUOTE: '"';

IGNORE: '@ignore';
NAME: [a-z_][a-z_0-9]*;
TOKEN_NAME: [A-Z_]+;
CODE: '{_' .+? '_}';

WHITESPACE: (' ' | '\t');
NEWLINE: ('\r'? '\n' | '\r')+;
