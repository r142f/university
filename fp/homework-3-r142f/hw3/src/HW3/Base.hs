{-# LANGUAGE DeriveAnyClass     #-}
{-# LANGUAGE DeriveGeneric      #-}
{-# LANGUAGE DerivingStrategies #-}

module HW3.Base where

import           Codec.Serialise       (Serialise)
import qualified Data.ByteString       as B
import qualified Data.ByteString.Char8 as B8
import           Data.Char             (toLower)
import qualified Data.Map.Strict       as M
import           Data.Scientific       (fromRationalRepetendUnlimited)
import qualified Data.Sequence         as S
import qualified Data.Text             as T
import           Data.Time             (UTCTime)
import           Data.Tuple            (swap)
import           GHC.Generics          (Generic)
import           GHC.Real              (denominator, numerator)
import           Numeric               (showFFloat, showHex)

data HiFun
  = HiFunDiv
  | HiFunMul
  | HiFunAdd
  | HiFunSub
  | HiFunNot
  | HiFunAnd
  | HiFunOr
  | HiFunLessThan
  | HiFunGreaterThan
  | HiFunEquals
  | HiFunNotLessThan
  | HiFunNotGreaterThan
  | HiFunNotEquals
  | HiFunIf
  | HiFunLength
  | HiFunToUpper
  | HiFunToLower
  | HiFunReverse
  | HiFunTrim
  | HiFunList
  | HiFunRange
  | HiFunFold
  | HiFunPackBytes
  | HiFunUnpackBytes
  | HiFunEncodeUtf8
  | HiFunDecodeUtf8
  | HiFunZip
  | HiFunUnzip
  | HiFunSerialise
  | HiFunDeserialise
  | HiFunRead
  | HiFunWrite
  | HiFunMkDir
  | HiFunChDir
  | HiFunParseTime
  | HiFunRand
  | HiFunEcho
  | HiFunCount
  | HiFunKeys
  | HiFunValues
  | HiFunInvert
  deriving (Eq, Ord)
  deriving stock (Generic)
  deriving anyclass (Serialise)

data HiValue
  = HiValueNull
  | HiValueBool Bool
  | HiValueNumber Rational
  | HiValueTime UTCTime
  | HiValueString T.Text
  | HiValueBytes B.ByteString
  | HiValueList (S.Seq HiValue)
  | HiValueDict (M.Map HiValue HiValue)
  | HiValueAction HiAction
  | HiValueFunction HiFun
  deriving (Eq, Ord)
  deriving stock (Generic)
  deriving anyclass (Serialise)

data HiExpr
  = HiExprValue HiValue
  | HiExprApply HiExpr [HiExpr]
  | HiExprRun HiExpr
  | HiExprDict [(HiExpr, HiExpr)]
  deriving (Show, Eq)

data HiAction
  = HiActionRead FilePath
  | HiActionWrite FilePath B8.ByteString
  | HiActionMkDir FilePath
  | HiActionChDir FilePath
  | HiActionCwd
  | HiActionNow
  | HiActionRand Int Int
  | HiActionEcho T.Text
  deriving (Eq, Ord, Show)
  deriving stock (Generic)
  deriving anyclass (Serialise)

data HiError
  = HiErrorInvalidArgument
  | HiErrorInvalidFunction
  | HiErrorArityMismatch
  | HiErrorDivideByZero
  deriving (Show, Eq)

instance Show HiValue where
  show (HiValueNull) = "null"
  show (HiValueString str) = show str
  show (HiValueBool bool) = map toLower $ show bool
  show (HiValueFunction fun) = show fun
  show (HiValueTime time) = "parse-time(\"" ++ show time ++ "\")"
  show (HiValueDict map) = case M.size map of
    0 -> "{}"
    _ ->
      let reducer k a res@([]) = show k ++ ": " ++ show a ++ res
          reducer k a res      = show k ++ ": " ++ show a ++ ", " ++ res
          content = M.foldrWithKey reducer "" map
       in "{ " ++ content ++ " }"
  show (HiValueAction act) = case act of
    HiActionRead fp -> "read(" ++ show fp ++ ")"
    HiActionWrite fp bytes -> "write(" ++ show fp ++ ", " ++ show (HiValueBytes bytes) ++ ")"
    HiActionMkDir fp -> "mkdir(" ++ show fp ++ ")"
    HiActionChDir fp -> "cd(" ++ show fp ++ ")"
    HiActionCwd -> "cwd"
    HiActionNow -> "now"
    HiActionRand a b -> "rand(" ++ show a ++ ", " ++ show b ++ ")"
    HiActionEcho str -> "echo(" ++ show str ++ ")"
  show (HiValueBytes bytes) = "[# " ++ (B8.foldr reducer "" bytes) ++ "#]"
    where
      reducer c res = (if length newHex == 2 then '0' : newHex else newHex) ++ res
        where
          newHex = (showHex (fromEnum c) " ")
  show (HiValueNumber rat) =
    let (a, b) = (numerator rat, denominator rat)
     in case snd $ fromRationalRepetendUnlimited rat of
          Nothing -> if a `mod` b == 0 then show (round num :: Int) else showFFloat Nothing num ""
            where
              num = fromRational rat
          _ ->
            let (n, r) = quotRem a b
                rem = show (abs r) ++ "/" ++ show (abs b)
             in case n == 0 of
                  True -> if r >= 0 then rem else '-' : rem
                  False -> show n ++ if r >= 0 then " + " ++ rem else " - " ++ rem
  show (HiValueList res@(xs S.:|> x)) = "[ " ++ foldr reducer (show x ++ " ]") xs
    where
      reducer x res = show x ++ ", " ++ res
  show (HiValueList empty) = "[]"

instance Show HiFun where
  show = (M.!) mapFunToStr

arithmeticFunctionList :: [(String, HiFun)]
arithmeticFunctionList =
  [ ("div", HiFunDiv),
    ("mul", HiFunMul),
    ("add", HiFunAdd),
    ("sub", HiFunSub)
  ]

comparisonFunctionList :: [(String, HiFun)]
comparisonFunctionList =
  [ ("not-less-than", HiFunNotLessThan),
    ("not-greater-than", HiFunNotGreaterThan),
    ("not-equals", HiFunNotEquals),
    ("less-than", HiFunLessThan),
    ("greater-than", HiFunGreaterThan),
    ("equals", HiFunEquals)
  ]

logicFunctionList :: [(String, HiFun)]
logicFunctionList =
  [ ("not", HiFunNot),
    ("and", HiFunAnd),
    ("or", HiFunOr)
  ]

stringFunctionList :: [(String, HiFun)]
stringFunctionList =
  [ ("length", HiFunLength),
    ("to-upper", HiFunToUpper),
    ("to-lower", HiFunToLower),
    ("reverse", HiFunReverse),
    ("trim", HiFunTrim)
  ]

listFunctionList :: [(String, HiFun)]
listFunctionList =
  [ ("list", HiFunList),
    ("range", HiFunRange),
    ("fold", HiFunFold)
  ]

branchingFunctionList :: [(String, HiFun)]
branchingFunctionList =
  [ ("if", HiFunIf)
  ]

bytesFunctionList :: [(String, HiFun)]
bytesFunctionList =
  [ ("pack-bytes", HiFunPackBytes),
    ("unpack-bytes", HiFunUnpackBytes),
    ("encode-utf8", HiFunEncodeUtf8),
    ("decode-utf8", HiFunDecodeUtf8),
    ("zip", HiFunZip),
    ("unzip", HiFunUnzip),
    ("serialise", HiFunSerialise),
    ("deserialise", HiFunDeserialise)
  ]

ioFunctionList :: [(String, HiFun)]
ioFunctionList =
  [ ("read", HiFunRead),
    ("write", HiFunWrite),
    ("mkdir", HiFunMkDir),
    ("cd", HiFunChDir)
  ]

timeFunctionList :: [(String, HiFun)]
timeFunctionList =
  [ ("parse-time", HiFunParseTime)
  ]

randFunctionList :: [(String, HiFun)]
randFunctionList =
  [ ("rand", HiFunRand)
  ]

echoFunctionList :: [(String, HiFun)]
echoFunctionList =
  [ ("echo", HiFunEcho)
  ]

dictFunctionList :: [(String, HiFun)]
dictFunctionList =
  [ ("count", HiFunCount),
    ("keys", HiFunKeys),
    ("values", HiFunValues),
    ("invert", HiFunInvert)
  ]

functionList :: [(String, HiFun)]
functionList =
  arithmeticFunctionList
    ++ comparisonFunctionList
    ++ logicFunctionList
    ++ branchingFunctionList
    ++ stringFunctionList
    ++ listFunctionList
    ++ bytesFunctionList
    ++ ioFunctionList
    ++ timeFunctionList
    ++ randFunctionList
    ++ echoFunctionList
    ++ dictFunctionList

actionList :: [(String, HiAction)]
actionList =
  [ ("cwd", HiActionCwd),
    ("now", HiActionNow)
  ]

booleanList :: [(String, Bool)]
booleanList =
  [ ("true", True),
    ("false", False)
  ]

mapFunToStr :: M.Map HiFun String
mapFunToStr = M.fromList $ swap <$> functionList

class Slicable a where
  slice :: a -> (Int -> Int) -> (Int -> Int) -> a
  get :: a -> Int -> a

instance Slicable (HiValue) where
  get (HiValueList list) i =
    if i >= 0 && i < l
      then S.index list i
      else HiValueNull
    where
      l = S.length list
  get (HiValueString str) i =
    if i >= 0 && i < l
      then HiValueString $ T.singleton $ T.index str i
      else HiValueNull
    where
      l = T.length str
  get (HiValueBytes bytes) i =
    if i >= 0 && i < l
      then HiValueNumber $ toRational $ fromEnum $ B8.index bytes i
      else HiValueNull
    where
      l = B8.length bytes
  get _ _ = HiValueNull

  slice (HiValueList list) a b =
    if from <= to
      then HiValueList $ (S.take (to - from) $ S.drop from list)
      else HiValueList S.empty
    where
      (from, to) = (a l, b l)
      l = S.length list
  slice (HiValueString str) a b =
    if from <= to
      then HiValueString $ (T.take (to - from) $ T.drop from str)
      else HiValueString T.empty
    where
      (from, to) = (a l, b l)
      l = T.length str
  slice (HiValueBytes bytes) a b =
    if from <= to
      then HiValueBytes $ (B8.take (to - from) $ B8.drop from bytes)
      else HiValueBytes B8.empty
    where
      (from, to) = (a l, b l)
      l = B8.length bytes
  slice _ _ _ = HiValueNull

class Monad m => HiMonad m where
  runAction :: HiAction -> m HiValue
