{-# LANGUAGE TemplateHaskell, NegativeLiterals, BlockArguments #-}

import Control.Monad (unless)
import System.Exit (exitFailure)
import qualified Test.QuickCheck as QC
import qualified Data.Text as Text
import Data.Text (Text)
import Numeric.Natural (Natural)
import Data.Void (Void)
import Data.Char (isSpace)
import Text.Megaparsec (ParseErrorBundle)
import Data.Functor.Identity (Identity(runIdentity))
import Data.Functor.Classes (Eq1(liftEq))
import Prettyprinter (layoutCompact)
import Prettyprinter.Render.String (renderString)
import qualified Language.Haskell.TH as TH

---------------------------
------ NAME CHECKING ------
---------------------------

import HW3.Base (HiValue(HiValueNumber, HiValueFunction, HiValueBool, HiValueNull, HiValueString))
import HW3.Base (HiExpr(HiExprValue, HiExprApply))
import HW3.Base (HiError(HiErrorInvalidArgument, HiErrorInvalidFunction, HiErrorArityMismatch, HiErrorDivideByZero))
import HW3.Parser (parse)
import HW3.Evaluator (eval)
import HW3.Pretty (prettyValue)

import qualified HW3.Base

---------------------------
------ COMPATIBILITY ------
---------------------------

$(do mcls <- TH.lookupTypeName "HW3.Base.HiMonad"
     case mcls of
       Nothing -> return []
       Just cls -> do
         let stubClause = TH.clause [] (TH.normalB [e| error "Identity: runAction" |]) []
         let runActionD = TH.funD (TH.mkName "runAction") [stubClause]
         instD <- TH.instanceD (TH.cxt []) [t|$(TH.conT cls) Identity|] [runActionD]
         return [instD])

---------------------------
------ PROP CHECKING ------
---------------------------

prop_advanced_eval_cases :: Bool
prop_advanced_eval_cases =
  "\"Hello World\"(0, -4)"    `evaluates_to_str` Text.pack "Hello W" &&
  "\"Hello World\"(null, -4)" `evaluates_to_str` Text.pack "Hello W" &&
  "\"Hello World\"(-4, -1)"   `evaluates_to_str` Text.pack "orl"  &&
  "\"Hello World\"(-4, null)" `evaluates_to_str` Text.pack "orld" &&
  "\"Hello, World\"(2, null)" `evaluates_to_str` Text.pack "llo, World" &&
  "\"Hello, World\"(null, 5)" `evaluates_to_str` Text.pack "Hello"

evaluates_to_str :: String -> Text -> Bool
evaluates_to_str str expected =
  case parse str of
    Left _ -> False
    Right e ->
      case runIdentity (eval e) of
        Left _ -> False
        Right (HiValueString s) -> s == expected
        Right _ -> False

return []

main :: IO ()
main = do
  ok <- $(QC.quickCheckAll)
  unless ok exitFailure
