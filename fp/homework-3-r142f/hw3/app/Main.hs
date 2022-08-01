module Main where

import           Control.Monad.Trans.Class (MonadTrans (lift))
import           Data.Set                  (fromList)
import           HW3.Action                (HIO (runHIO),
                                            HiPermission (AllowRead, AllowTime, AllowWrite))
import           HW3.Base                  (HiError, HiValue)
import           HW3.Evaluator             (eval)
import           HW3.Parser                (parse)
import           HW3.Pretty                (prettyValue)
import           System.Console.Haskeline  (InputT, defaultSettings,
                                            getInputLine, outputStrLn,
                                            runInputT)

main :: IO ()
main = runInputT defaultSettings loop
  where
    loop :: InputT IO ()
    loop = do
      input <- getInputLine "hi> "
      case input of
        Nothing -> return ()
        Just "quit" -> return ()
        Just hiLine -> do
          case parse hiLine of
            Left e -> outputStrLn $ show e
            Right hiExpr -> do
              exprValue <-
                lift $
                  runHIO (eval hiExpr :: HIO (Either HiError HiValue)) $
                    fromList [AllowRead, AllowWrite, AllowTime]
              case exprValue of
                Right value -> outputStrLn $ show $ prettyValue value
                Left e      -> outputStrLn $ show e
          loop
