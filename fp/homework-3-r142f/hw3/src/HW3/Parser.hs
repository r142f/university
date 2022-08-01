module HW3.Parser where

import           Control.Monad.Combinators.Expr (Operator (InfixL, InfixN, InfixR),
                                                 makeExprParser)
import qualified Data.ByteString                as B
import qualified Data.ByteString.Char8          as B8
import           Data.Char                      (isAlpha, isAlphaNum)
import           Data.Functor                   (void)
import           Data.List                      (intercalate)
import           Data.Maybe                     (fromJust, isJust)
import qualified Data.Scientific
import qualified Data.Text                      as T
import           Data.Void                      (Void)
import           HW3.Base                       (HiExpr (..), HiFun (HiFunAdd, HiFunAnd,
                                                 HiFunDiv, HiFunEquals, HiFunGreaterThan,
                                                 HiFunLessThan, HiFunList, HiFunMul,
                                                 HiFunNotEquals, HiFunNotGreaterThan,
                                                 HiFunNotLessThan, HiFunOr, HiFunSub),
                                                 HiValue (HiValueAction, HiValueBool,
                                                 HiValueBytes, HiValueFunction, HiValueNull,
                                                 HiValueNumber, HiValueString),
                                                 actionList, booleanList,
                                                 functionList)
import           Text.Megaparsec                (MonadParsec (eof, notFollowedBy, try),
                                                 ParseErrorBundle, Parsec,
                                                 between, choice, empty, many,
                                                 manyTill, optional, parseTest,
                                                 runParser, satisfy, sepBy,
                                                 sepBy1, some, (<|>))
import           Text.Megaparsec.Char           (alphaNumChar, char, letterChar,
                                                 spaceChar, string)
import qualified Text.Megaparsec.Char.Lexer     as L

type Parser = Parsec Void String

sc :: Parser ()
sc = L.space (void spaceChar) empty empty

lexeme :: Parser a -> Parser a
lexeme = L.lexeme sc

symbol :: String -> Parser String
symbol = L.symbol sc

parens :: Parser a -> Parser a
parens = between (symbol "(") (symbol ")")

brackets :: Parser a -> Parser a
brackets = between (symbol "[") (symbol "]")

braces :: Parser a -> Parser a
braces = between (symbol "{") (symbol "}")

bytesParens :: Parser a -> Parser a
bytesParens = between (symbol "[#") (symbol "#]")

comma :: Parser String
comma = symbol ","

rword :: String -> Parser ()
rword w = string w *> notFollowedBy alphaNumChar *> sc

rational :: Parser Data.Scientific.Scientific
rational = lexeme L.scientific

signedRational :: Parser Data.Scientific.Scientific
signedRational = L.signed sc rational

valNum :: Parser HiExpr
valNum = do
  val <- signedRational
  return $ HiExprValue $ HiValueNumber $ toRational val

bool :: String -> Parser HiExpr
bool boolean = do
  rword boolean
  case lookup boolean booleanList of
    Just boolean -> return $ HiExprValue $ HiValueBool boolean
    _ -> fail $ "keyword " ++ show boolean ++ " cannot be a boolean value"

valBool :: Parser HiExpr
valBool = choice $ (bool . fst) <$> booleanList

valStr :: Parser HiExpr
valStr = do
  str <- (string "\"") *> (manyTill L.charLiteral (symbol "\""))
  return $ HiExprValue $ HiValueString $ T.pack str

valNull :: Parser HiExpr
valNull = do
  rword "null"
  return $ HiExprValue HiValueNull

func :: String -> Parser HiExpr
func name = do
  rword name
  case lookup name functionList of
    Just f -> return $ HiExprValue $ HiValueFunction f
    _      -> fail $ "keyword " ++ show name ++ " cannot be a function"

function :: Parser HiExpr
function = choice $ (func . fst) <$> functionList

act :: String -> Parser HiExpr
act name = do
  rword name
  case lookup name actionList of
    Just a -> return $ HiExprValue $ HiValueAction a
    _      -> fail $ "keyword " ++ show name ++ " cannot be an action"

action :: Parser HiExpr
action = choice $ (act . fst) <$> actionList

valListElemSeq :: Parser [HiExpr]
valListElemSeq = brackets $ sepBy expr comma

valList :: Parser HiExpr
valList = HiExprApply (HiExprValue $ HiValueFunction HiFunList) <$> valListElemSeq

valDictEntry :: Parser (HiExpr, HiExpr)
valDictEntry = (,) <$> expr <*> (symbol ":" *> expr)

valDict :: Parser HiExpr
valDict = do
  entries <- braces $ sepBy valDictEntry comma
  return $ HiExprDict entries

hexadecimal :: Parser Data.Scientific.Scientific
hexadecimal = lexeme L.hexadecimal

valBytes :: Parser HiExpr
valBytes = do
  bytes <- symbol "[#" *> manyTill hexadecimal (symbol "#]")
  return $ HiExprValue $ HiValueBytes (B8.pack (toEnum . truncate <$> bytes))

literal :: Parser HiExpr
literal =
  choice
    [ action,
      function,
      valNum,
      valBool,
      valStr,
      valNull,
      valDict,
      try valList,
      valBytes
    ]

exprOperators :: [[Operator Parser HiExpr]]
exprOperators =
  let createExprOpExpr op a b = HiExprApply (HiExprValue $ HiValueFunction op) [a, b]
   in [ [ InfixL (createExprOpExpr HiFunMul <$ symbol "*"),
          InfixL (createExprOpExpr HiFunDiv <$ (try $ symbol "/" *> notFollowedBy (string "=")))
        ],
        [ InfixL (createExprOpExpr HiFunAdd <$ symbol "+"),
          InfixL (createExprOpExpr HiFunSub <$ symbol "-")
        ],
        [ InfixN (createExprOpExpr HiFunNotGreaterThan <$ symbol "<="),
          InfixN (createExprOpExpr HiFunNotLessThan <$ symbol ">="),
          InfixN (createExprOpExpr HiFunLessThan <$ symbol "<"),
          InfixN (createExprOpExpr HiFunGreaterThan <$ symbol ">"),
          InfixN (createExprOpExpr HiFunNotEquals <$ symbol "/="),
          InfixN (createExprOpExpr HiFunEquals <$ symbol "==")
        ],
        [ InfixR (createExprOpExpr HiFunAnd <$ symbol "&&")
        ],
        [ InfixR (createExprOpExpr HiFunOr <$ symbol "||")
        ]
      ]

expr :: Parser HiExpr
expr = makeExprParser expr1 exprOperators

expr1 :: Parser HiExpr
expr1 = do
  e <- parens expr <|> literal
  e' <- optional . try $ expr'1 e
  if isJust e'
    then return $ fromJust e'
    else return e

expr'1 :: HiExpr -> Parser HiExpr
expr'1 e = do
  c <- optional . try $ parensCall
  case c of
    Just args -> expr'1 $ HiExprApply e args
    Nothing -> do
      r <- optional . try $ symbol "!"
      case r of
        Just _ -> expr'1 $ HiExprRun e
        Nothing -> do
          pc <- optional . try $ pointCall
          case pc of
            Nothing  -> return e
            Just arg -> expr'1 $ HiExprApply e [arg]

argSeq :: Parser [HiExpr]
argSeq = try (sepBy expr comma) <|> parens argSeq

parensCall :: Parser [HiExpr]
parensCall = parens argSeq

pointCall :: Parser HiExpr
pointCall = do
  sepArg <-
    lexeme $
      string "." *> ((:) <$> satisfy isAlpha <*> many (satisfy isAlphaNum)) `sepBy1` char '-'
  return $ HiExprValue $ HiValueString $ T.pack $ intercalate "-" sepArg

hiParser :: Parser HiExpr
hiParser = between sc eof expr

parse :: String -> Either (ParseErrorBundle String Void) HiExpr
parse = runParser hiParser ""
