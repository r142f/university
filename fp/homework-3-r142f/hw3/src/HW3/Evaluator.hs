module HW3.Evaluator where

import           Codec.Compression.Zlib     (CompressParams (compressLevel),
                                             bestCompression, compressWith,
                                             decompress, defaultCompressParams)
import           Codec.Serialise            (deserialise, serialise)
import           Control.Monad.Trans.Class  (MonadTrans (lift))
import           Control.Monad.Trans.Except (ExceptT (..), runExceptT, throwE)
import qualified Data.ByteString            as B
import qualified Data.ByteString.Char8      as B8
import qualified Data.ByteString.Lazy.Char8 as BL8
import           Data.Either                (isLeft, lefts, rights)
import           Data.Foldable              (Foldable (foldl', toList))
import qualified Data.Map.Strict            as M
import           Data.Maybe                 (isJust)
import           Data.Semigroup             (Semigroup (stimes))
import qualified Data.Sequence              as S
import qualified Data.Text                  as T
import           Data.Text.Encoding         (decodeUtf8', encodeUtf8)
import           Data.Time.Clock            (addUTCTime, diffUTCTime)
import           HW3.Base                   (HiAction (HiActionChDir, HiActionEcho, HiActionMkDir,
                                             HiActionRand, HiActionRead, HiActionWrite),
                                             HiError (..), HiExpr (..),
                                             HiFun (HiFunAdd, HiFunAnd, HiFunChDir, HiFunCount,
                                             HiFunDecodeUtf8, HiFunDeserialise, HiFunDiv,
                                             HiFunEncodeUtf8, HiFunEquals, HiFunFold,
                                             HiFunGreaterThan, HiFunIf, HiFunInvert, HiFunKeys,
                                             HiFunLength, HiFunLessThan, HiFunList, HiFunMkDir,
                                             HiFunMul, HiFunNot, HiFunNotEquals,
                                             HiFunNotGreaterThan, HiFunNotLessThan, HiFunOr,
                                             HiFunPackBytes, HiFunRange, HiFunRead, HiFunReverse,
                                             HiFunSerialise, HiFunSub, HiFunToLower, HiFunToUpper,
                                             HiFunTrim, HiFunUnpackBytes, HiFunUnzip, HiFunValues,
                                             HiFunWrite, HiFunZip),
                                             HiMonad (..), HiValue (..),
                                             Slicable (get, slice),
                                             arithmeticFunctionList,
                                             bytesFunctionList,
                                             comparisonFunctionList,
                                             dictFunctionList, echoFunctionList,
                                             ioFunctionList, listFunctionList,
                                             logicFunctionList,
                                             randFunctionList,
                                             stringFunctionList,
                                             timeFunctionList)
import           HW3.Util                   (countFreq, getLeft, getRight,
                                             invert, isCallable, isFalse,
                                             isIndexable, isIntegral,
                                             isNumIntegral, isSlicable,
                                             transformIndex)
import           Text.Read                  (readMaybe)

applyFun :: HiMonad m => HiValue -> [HiExpr] -> m (Either HiError HiValue)
applyFun fun args | isJust $ lookup (show fun) arithmeticFunctionList = runExceptT $ do
  let repeatHelper constructor listable rat = do
        case fun of
          HiValueFunction HiFunMul ->
            if rat <= 0 || not (isIntegral rat)
              then throwE HiErrorInvalidArgument
              else return $ constructor (stimes (fromEnum rat) listable)
          _ -> throwE HiErrorInvalidFunction
      concatHelper constructor concatableA concatableB = do
        case fun of
          HiValueFunction HiFunAdd -> return $ constructor $ concatableA <> concatableB
          _ -> throwE HiErrorInvalidFunction
  case args of
    [exprA, exprB] -> do
      a <- lift $ eval exprA
      b <- lift $ eval exprB
      case hasError [a, b] of
        True -> throwE $ getError [a, b]
        _ -> case (a, b) of
          (Right (HiValueNumber ratA), Right (HiValueNumber ratB)) -> case fun of
            HiValueFunction HiFunDiv ->
              if ratB /= toRational 0
                then return $ HiValueNumber $ ratA / ratB
                else throwE HiErrorDivideByZero
            HiValueFunction HiFunMul -> return $ HiValueNumber $ ratA * ratB
            HiValueFunction HiFunAdd -> return $ HiValueNumber $ ratA + ratB
            HiValueFunction HiFunSub -> return $ HiValueNumber $ ratA - ratB
            _ -> error "Unreachable line of code."
          (Right (HiValueString strA), Right (HiValueString strB)) -> case fun of
            HiValueFunction HiFunDiv -> return $ HiValueString $ T.append strA $ '/' `T.cons` strB
            _ -> concatHelper HiValueString strA strB
          (Right (HiValueString strA), Right (HiValueNumber ratB)) ->
            repeatHelper HiValueString strA ratB
          (Right (HiValueList listA), Right (HiValueNumber ratB)) ->
            repeatHelper HiValueList listA ratB
          (Right (HiValueBytes bytesA), Right (HiValueNumber ratB)) ->
            repeatHelper HiValueBytes bytesA ratB
          (Right (HiValueList listA), Right (HiValueList listB)) ->
            concatHelper HiValueList listA listB
          (Right (HiValueBytes bytesA), Right (HiValueBytes bytesB)) ->
            concatHelper HiValueBytes bytesA bytesB
          (Right (HiValueTime timeA), Right (HiValueTime timeB)) -> case fun of
            HiValueFunction HiFunSub ->
              return $ HiValueNumber $ toRational $ diffUTCTime timeA timeB
            _ -> throwE HiErrorInvalidFunction
          (Right (HiValueTime timeA), Right (HiValueNumber ratB)) -> case fun of
            HiValueFunction HiFunAdd -> return $ HiValueTime $ addUTCTime (fromRational ratB) timeA
            _ -> throwE HiErrorInvalidFunction
          (Right (HiValueNumber ratA), Right (HiValueTime timeB)) -> case fun of
            HiValueFunction HiFunAdd -> return $ HiValueTime $ addUTCTime (fromRational ratA) timeB
            _ -> throwE HiErrorInvalidFunction
          _ -> throwE HiErrorInvalidArgument
    _ -> throwE HiErrorArityMismatch
applyFun (HiValueFunction HiFunNot) args = runExceptT $ do
  case args of
    [exprA] -> do
      a <- lift $ eval exprA
      case a of
        Left e                      -> throwE e
        (Right (HiValueBool boolA)) -> return $ HiValueBool $ not boolA
        _                           -> throwE HiErrorInvalidArgument
    _ -> throwE HiErrorArityMismatch
applyFun fun args | isJust $ lookup (show fun) logicFunctionList = runExceptT $ do
  case args of
    [exprA, exprB] -> do
      a <- lift $ eval exprA
      case a of
        Left e -> throwE e
        Right valA -> case fun of
          HiValueFunction HiFunAnd ->
            if isFalse valA
              then return valA
              else eval'n'throw exprB
          HiValueFunction HiFunOr ->
            if isFalse valA
              then eval'n'throw exprB
              else return valA
          _ -> error "Unreachable line of code."
    _ -> throwE HiErrorArityMismatch
applyFun fun args | isJust $ lookup (show fun) comparisonFunctionList = runExceptT $ do
  case args of
    [exprA, exprB] -> do
      a <- lift $ eval exprA
      b <- lift $ eval exprB
      case hasError [a, b] of
        True -> throwE $ getError [a, b]
        _ -> case (a, b) of
          (Right valueA, Right valueB) -> case fun of
            HiValueFunction HiFunEquals -> return $ HiValueBool $ valueA == valueB
            HiValueFunction HiFunNotEquals -> return $ HiValueBool $ valueA /= valueB
            HiValueFunction HiFunGreaterThan -> return $ HiValueBool $ valueA > valueB
            HiValueFunction HiFunNotLessThan -> return $ HiValueBool $ valueA >= valueB
            HiValueFunction HiFunNotGreaterThan -> return $ HiValueBool $ valueA <= valueB
            HiValueFunction HiFunLessThan -> return $ HiValueBool $ valueA < valueB
            _ -> error "Unreachable line of code."
          _ -> throwE HiErrorInvalidArgument
    _ -> throwE HiErrorArityMismatch
applyFun (HiValueFunction HiFunIf) args = runExceptT $ do
  case args of
    [exprA, exprB, exprC] -> do
      a <- lift $ eval exprA
      case a of
        Left e -> throwE e
        Right (HiValueBool condition) ->
          if condition
            then eval'n'throw exprB
            else eval'n'throw exprC
        _ -> throwE HiErrorInvalidArgument
    _ -> throwE HiErrorArityMismatch
applyFun fun args | isJust $ lookup (show fun) stringFunctionList = runExceptT $ do
  case args of
    [exprA] -> do
      a <- lift $ eval exprA
      case a of
        Left e -> throwE e
        Right (HiValueString strA) -> case fun of
          HiValueFunction HiFunLength -> return $ HiValueNumber $ toRational $ T.length strA
          HiValueFunction HiFunToUpper -> return $ HiValueString $ T.toUpper strA
          HiValueFunction HiFunToLower -> return $ HiValueString $ T.toLower strA
          HiValueFunction HiFunReverse -> return $ HiValueString $ T.reverse strA
          HiValueFunction HiFunTrim -> return $ HiValueString $ T.strip strA
          _ -> error "Unreachable line of code."
        (Right (HiValueList list)) -> case fun of
          HiValueFunction HiFunLength -> return $ HiValueNumber $ toRational $ S.length list
          HiValueFunction HiFunReverse -> return $ HiValueList $ S.reverse list
          _ -> throwE HiErrorInvalidFunction
        (Right (HiValueBytes bytes)) -> case fun of
          HiValueFunction HiFunLength -> return $ HiValueNumber $ toRational $ B8.length bytes
          HiValueFunction HiFunReverse -> return $ HiValueBytes $ B8.reverse bytes
          _ -> throwE HiErrorInvalidFunction
        _ -> throwE HiErrorInvalidArgument
    _ -> throwE HiErrorArityMismatch
applyFun (HiValueFunction HiFunList) args = runExceptT $ do
  list <- traverse (lift . eval) args
  case hasError list of
    True -> throwE $ getError list
    _    -> return $ HiValueList $ S.fromList $ rights list
applyFun fun args | isJust $ lookup (show fun) listFunctionList = runExceptT $ do
  case args of
    [exprA, exprB] -> do
      a <- lift $ eval exprA
      b <- lift $ eval exprB
      case hasError [a, b] of
        True -> throwE $ getError [a, b]
        _ -> case (a, b) of
          (Right (HiValueNumber ratA), Right (HiValueNumber ratB)) -> case fun of
            HiValueFunction HiFunRange ->
              return $
                HiValueList $
                  S.fromList $ HiValueNumber <$> [fromRational ratA .. fromRational ratB]
            _ -> throwE HiErrorInvalidFunction
          (Right funA@(HiValueFunction _), Right (HiValueList listB)) -> case fun of
            HiValueFunction HiFunFold ->
              if null listB
                then return HiValueNull
                else
                  ExceptT $ eval $ foldl' reduce (HiExprValue $ S.index listB 0) (S.drop 1 listB)
              where
                reduce res x = HiExprApply (HiExprValue funA) [res, HiExprValue x]
            _ -> throwE HiErrorInvalidFunction
          _ -> throwE HiErrorInvalidArgument
    _ -> throwE HiErrorArityMismatch
applyFun indexable args | isIndexable indexable = runExceptT $ do
  case args of
    [exprB] -> do
      b <- lift $ eval exprB
      case hasError [b] of
        True -> throwE $ getError [b]
        _ -> case isSlicable indexable of
          True -> case b of
            (Right (HiValueNumber ratB)) -> return $ get indexable $ fromEnum ratB
            _ -> throwE HiErrorInvalidArgument
          _ ->
            if M.member keyB dict
              then return $ dict M.! keyB
              else return HiValueNull
            where
              keyB = getRight b
              (HiValueDict dict) = indexable
    [exprB, exprC] -> do
      b <- lift $ eval exprB
      c <- lift $ eval exprC
      case hasError [b, c] of
        True -> throwE $ getError [b, c]
        _ ->
          if not $ isSlicable indexable
            then throwE HiErrorArityMismatch
            else case (b, c) of
              (Right ratB@(HiValueNumber _), Right ratC@(HiValueNumber _)) ->
                if isNumIntegral ratB && isNumIntegral ratC
                  then return $ slice indexable (transformIndex ratB) (transformIndex ratC)
                  else throwE HiErrorInvalidArgument
              (Right HiValueNull, Right ratC@(HiValueNumber _)) ->
                if isNumIntegral ratC
                  then return $ slice indexable (const 0) (transformIndex ratC)
                  else throwE HiErrorInvalidArgument
              (Right ratB@(HiValueNumber _), Right HiValueNull) ->
                if isNumIntegral ratB
                  then return $ slice indexable (transformIndex ratB) id
                  else throwE HiErrorInvalidArgument
              (Right HiValueNull, Right HiValueNull) -> return $ slice indexable (const 0) id
              _ -> throwE HiErrorInvalidArgument
    _ -> throwE HiErrorArityMismatch
applyFun fun args | isJust $ lookup (show fun) bytesFunctionList = runExceptT $ do
  let validateByte (HiValueNumber rat) = isIntegral rat && rat >= 0 && rat <= 255
      validateByte _ = False
      mapper (HiValueNumber rat) = toEnum $ truncate rat
      mapper _                   = error "Unreachable line of code."
  case args of
    [exprA] -> do
      a <- lift $ eval exprA
      case a of
        Left err -> throwE err
        Right val -> case fun of
          HiValueFunction HiFunPackBytes -> case a of
            Right (HiValueList listA) ->
              if all validateByte listA
                then return $ HiValueBytes $ B8.pack $ toList (mapper <$> listA)
                else throwE HiErrorInvalidArgument
            _ -> throwE HiErrorInvalidArgument
          HiValueFunction HiFunUnpackBytes -> case a of
            Right (HiValueBytes bytesA) ->
              return $
                HiValueList $
                  HiValueNumber . toRational <$> (B8.foldr ((S.<|) . fromEnum) S.empty bytesA)
            _ -> throwE HiErrorInvalidArgument
          HiValueFunction HiFunEncodeUtf8 -> case a of
            Right (HiValueString strA) -> return $ HiValueBytes $ encodeUtf8 strA
            _ -> throwE HiErrorInvalidArgument
          HiValueFunction HiFunDecodeUtf8 -> case a of
            Right (HiValueBytes bytesA) -> case decodeUtf8' bytesA of
              Right strA -> return $ HiValueString strA
              _          -> return HiValueNull
            _ -> throwE HiErrorInvalidArgument
          HiValueFunction HiFunZip -> case a of
            Right (HiValueBytes bytesA) ->
              return $
                HiValueBytes $
                  BL8.toStrict $
                    compressWith defaultCompressParams {compressLevel = bestCompression} $
                      BL8.fromStrict bytesA
            _ -> throwE HiErrorInvalidArgument
          HiValueFunction HiFunUnzip -> case a of
            Right (HiValueBytes bytesA) ->
              return $ HiValueBytes $ BL8.toStrict $ decompress $ BL8.fromStrict bytesA
            _ -> throwE HiErrorInvalidArgument
          HiValueFunction HiFunSerialise -> return $ HiValueBytes $ BL8.toStrict $ serialise val
          HiValueFunction HiFunDeserialise -> case a of
            Right (HiValueBytes bytesA) -> return $ deserialise $ BL8.fromStrict bytesA
            _ -> throwE HiErrorInvalidArgument
          _ -> error "Unreachable line of code."
    _ -> throwE HiErrorArityMismatch
applyFun fun args | isJust $ lookup (show fun) ioFunctionList = runExceptT $ do
  case args of
    [exprB] -> do
      b <- lift $ eval exprB
      case hasError [b] of
        True -> throwE $ getError [b]
        _ -> case b of
          (Right (HiValueString strB)) -> case fun of
            HiValueFunction HiFunRead -> return $ HiValueAction $ HiActionRead $ T.unpack strB
            HiValueFunction HiFunMkDir -> return $ HiValueAction $ HiActionMkDir $ T.unpack strB
            HiValueFunction HiFunChDir -> return $ HiValueAction $ HiActionChDir $ T.unpack strB
            _ -> throwE HiErrorInvalidFunction
          _ -> throwE HiErrorInvalidArgument
    [exprB, exprC] -> do
      b <- lift $ eval exprB
      c <- lift $ eval exprC
      case hasError [b, c] of
        True -> throwE $ getError [b, c]
        _ ->
          let helper strB bytesC = case fun of
                HiValueFunction HiFunWrite ->
                  return $ HiValueAction $ HiActionWrite (T.unpack strB) bytesC
                _ -> throwE HiErrorInvalidFunction
           in case (b, c) of
                (Right (HiValueString strB), Right (HiValueBytes bytesC)) -> helper strB bytesC
                (Right (HiValueString strB), Right (HiValueString strC)) ->
                  helper strB $ encodeUtf8 strC
                _ -> throwE HiErrorInvalidArgument
    _ -> throwE HiErrorArityMismatch
applyFun fun args | isJust $ lookup (show fun) timeFunctionList = runExceptT $ do
  case args of
    [exprA] -> do
      a <- lift $ eval exprA
      case a of
        Left e -> throwE e
        (Right (HiValueString strA)) -> case readMaybe $ T.unpack strA of
          Just time -> return $ HiValueTime time
          _         -> return HiValueNull
        _ -> throwE HiErrorInvalidArgument
    _ -> throwE HiErrorArityMismatch
applyFun fun args | isJust $ lookup (show fun) randFunctionList = runExceptT $ do
  case args of
    [exprB, exprC] -> do
      b <- lift $ eval exprB
      c <- lift $ eval exprC
      case hasError [b, c] of
        True -> throwE $ getError [b, c]
        _ -> case (b, c) of
          (Right (HiValueNumber ratB), Right (HiValueNumber ratC)) ->
            if isIntegral ratB && isIntegral ratC
              then return $ HiValueAction $ HiActionRand (fromEnum ratB) (fromEnum ratC)
              else throwE HiErrorInvalidArgument
          _ -> throwE HiErrorInvalidArgument
    _ -> throwE HiErrorArityMismatch
applyFun fun args | isJust $ lookup (show fun) echoFunctionList = runExceptT $ do
  case args of
    [exprA] -> do
      a <- lift $ eval exprA
      case a of
        Left e -> throwE e
        (Right (HiValueString strA)) -> return $ HiValueAction $ HiActionEcho strA
        _ -> throwE HiErrorInvalidArgument
    _ -> throwE HiErrorArityMismatch
applyFun fun args | isJust $ lookup (show fun) dictFunctionList = runExceptT $ do
  case args of
    [exprA] -> do
      a <- lift $ eval exprA
      case a of
        Left e -> throwE e
        Right val -> case fun of
          HiValueFunction HiFunKeys -> case val of
            HiValueDict dictA -> return $ HiValueList $ S.fromList $ M.keys dictA
            _ -> throwE HiErrorInvalidArgument
          HiValueFunction HiFunValues -> case val of
            HiValueDict dictA -> return $ HiValueList $ S.fromList $ M.elems dictA
            _ -> throwE HiErrorInvalidArgument
          HiValueFunction HiFunCount -> case val of
            HiValueList listA -> return $ HiValueDict $ countFreq $ toList listA
            HiValueString strA ->
              return $ HiValueDict $ countFreq $ HiValueString <$> T.chunksOf 1 strA
            HiValueBytes bytesA ->
              return $
                HiValueDict $
                  countFreq $ HiValueNumber . toRational . fromEnum <$> B8.unpack bytesA
            _ -> throwE HiErrorInvalidArgument
          HiValueFunction HiFunInvert -> case val of
            HiValueDict dictA -> return $ HiValueDict $ invert dictA
            _                 -> throwE HiErrorInvalidArgument
          _ -> throwE HiErrorInvalidFunction
    _ -> throwE HiErrorArityMismatch
applyFun _ _ = error "Unreachable line of code."

eval :: HiMonad m => HiExpr -> m (Either HiError HiValue)
eval (HiExprValue value) = return $ Right value
eval (HiExprApply expr args) = runExceptT $ do
  exprValue <- lift $ eval expr
  case exprValue of
    Left e -> throwE e
    Right function ->
      case isCallable function of
        False -> throwE HiErrorInvalidFunction
        _ -> do
          result <- lift $ applyFun function args
          case result of
            Left e        -> throwE e
            (Right value) -> return value
eval (HiExprRun expr) = runExceptT $ do
  exprValue <- lift $ eval expr
  case exprValue of
    Left e                    -> throwE e
    Right (HiValueAction act) -> lift $ runAction act
    _                         -> throwE HiErrorInvalidArgument
eval (HiExprDict entries) = runExceptT $ do
  let (keys, values) = unzip entries
  evalKeys <- traverse (lift . eval) keys
  case hasError evalKeys of
    True -> throwE $ getError evalKeys
    _ -> do
      evalValues <- traverse (lift . eval) values
      case hasError evalValues of
        True -> throwE $ getError evalValues
        _ ->
          return $ HiValueDict $ M.fromList $ zip (getRight <$> evalKeys) (getRight <$> evalValues)

hasError :: [Either HiError HiValue] -> Bool
hasError = any isLeft

getError :: [Either HiError HiValue] -> HiError
getError = head . lefts

eval'n'throw :: HiMonad m => HiExpr -> ExceptT HiError m HiValue
eval'n'throw exprE =
  do
    e <- (lift $ eval exprE)
    if isLeft e
      then throwE $ getLeft e
      else return $ getRight e
