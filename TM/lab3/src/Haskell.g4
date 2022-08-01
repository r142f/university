grammar Haskell;

program: (
		(
			function_implementation NEWLINE
			| function_declaration NEWLINE
			| NEWLINE
		)
	)* EOF;
function_declaration:
	NAME WHITESPACE* DCOLON WHITESPACE* function_type;
function_type:
	type += TYPE (WHITESPACE* IMPLIES WHITESPACE* type += TYPE)*;
function_implementation:
	NAME function_args_list function_guard? WHITESPACE* EQUALS WHITESPACE* expression;
function_args_list: (
		WHITESPACE* (list += LITERAL | list += NAME)
	)*;
function_guard: WHITESPACE* VBAR WHITESPACE* expression;
expression:
	expression WHITESPACE* operator WHITESPACE* expression
	| LP expression RP
	| value;
value: function_call | LITERAL | NAME;
function_call: NAME LP (expression (COMMA WHITESPACE*)?)* RP;
operator:
	MOD
	| MUL
	| DIV
	| PLUS
	| MINUS
	| EQ
	| NEQ
	| LT
	| LTE
	| GT
	| GTE
	| AND
	| OR;

TYPE: ('Bool' | 'Int' | 'Double' | 'String');
LITERAL: (BOOL | INT | DOUBLE | STRING);
NAME: [a-zA-Z_]([a-zA-Z0-9_'])*;

STRING: '"' .*? '"';
DOUBLE: INT ('.' [0-9]*)?;
INT: '-'? [0-9]+;
BOOL: ('false' | 'true');

LP: '(';
RP: ')';
COMMA: ',';

PLUS: '+';
MINUS: '-';
DIV: '/';
MUL: '*';
MOD: '%';

OR: '||';
AND: '&&';
LT: '<';
LTE: '<=';
GT: '>';
GTE: '>=';
EQ: '==';
NEQ: '/=';

DCOLON: '::';
IMPLIES: '->';
VBAR: '|';
EQUALS: '=';

NEWLINE: ('\r'? '\n' | '\r')+;
WHITESPACE: (' ' | '\t');