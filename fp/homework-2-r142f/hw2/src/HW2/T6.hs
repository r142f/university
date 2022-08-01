module HW2.T6 where

import           GHC.Base    (Alternative (empty, (<|>)), MonadPlus)
import           GHC.Natural (Natural)
import           HW2.T1      (Annotated ((:#)), Except (Error, Success))
import           HW2.T4      (Expr (Val))
import           HW2.T5      (ExceptState (..))

data ParseError = ErrorAtPos Natural

newtype Parser a = P (ExceptState ParseError (Natural, String) a)

runP :: Parser a -> String -> Except ParseError a
runP (P es) = \str -> case runES es (0, str) of
  Success (a :# _) -> Success a
  Error e          -> Error e

pChar :: Parser Char
pChar =
  P $
    ES
      ( \(pos, s) ->
          case s of
            -- when the string is empty error is returned
            []       -> Error (ErrorAtPos pos)
            -- when a character is consumed number of characters
            -- we have already consumed increments
            -- and the remainder of the input loses its head
            (c : cs) -> Success (c :# (pos + 1, cs))
      )

parseError :: Parser a
parseError = P $ ES (\_ -> Error $ ErrorAtPos 0)

instance Functor Parser where
  fmap f (P es) =
    P $
      ES
        ( \s -> case runES es s of
            Success (a :# e) -> Success (f a :# e)
            Error e          -> Error e
        )

instance Applicative Parser where
  pure a = P $ ES (\s -> Success (a :# s))
  (<*>) (P esF) (P es) =
    P $
      ES
        ( \s -> case runES esF s of
            Error e -> Error e
            Success (f :# s) -> case runES es s of
              Error e          -> Error e
              Success (a :# s) -> Success (f a :# s)
        )

instance Alternative Parser where
  empty = parseError
  (<|>) (P esA) (P esB) =
    P $
      ES
        ( \s -> case runES esA s of
            Error _ -> runES esB s
            success -> success
        )

instance Monad Parser where
  (>>=) (P esA) f =
    P $
      ES
        ( \s -> case runES esA s of
            Error e          -> Error e
            Success (a :# s) -> case (f a) of P esB -> runES esB s
        )

instance MonadPlus Parser

pEof :: Parser ()
pEof =
  P $
    ES
      ( \s@(pos, str) -> case str of
          [] -> Success (() :# s)
          _  -> Error $ ErrorAtPos pos
      )

pE :: Parser Expr
pE = do
  return $ Val 1.0

parseExpr :: String -> Except ParseError Expr
parseExpr = runP pE
