# cd /usr/local/lib
# export CLASSPATH=".:/usr/local/lib/antlr-4.9.3-complete.jar:$CLASSPATH"
# # simplify the use of the tool to generate lexer and parser
# alias antlr4='java -Xmx500M -cp "/usr/local/lib/antlr-4.9.3-complete.jar:$CLASSPATH" org.antlr.v4.Tool'
# # simplify the use of the tool to test the generated code
# alias grun='java -Xmx500M -cp "/usr/local/lib/antlr-4.9.3-complete.jar:$CLASSPATH" org.antlr.v4.gui.TestRig'
# cd ~/Projects/ITMO/TM/lab3
# cd src
# antlr4 -Dlanguage=JavaScript Haskell.g4 -o generated
# cd ..
