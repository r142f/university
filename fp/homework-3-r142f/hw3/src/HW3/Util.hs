module HW3.Util where

import           Data.Either     (fromLeft, fromRight)
import qualified Data.Map.Strict as M
import qualified Data.Sequence   as S
import           HW3.Base        (HiValue (HiValueBool, HiValueBytes, HiValueDict, HiValueFunction,
                                  HiValueList, HiValueNull, HiValueNumber, HiValueString))
import           Numeric         (showHex)

isCallable :: HiValue -> Bool
isCallable (HiValueFunction _) = True
isCallable value               = isIndexable value

isIndexable :: HiValue -> Bool
isIndexable (HiValueDict _) = True
isIndexable val             = isSlicable val

isSlicable :: HiValue -> Bool
isSlicable (HiValueList _)   = True
isSlicable (HiValueString _) = True
isSlicable (HiValueBytes _)  = True
isSlicable _                 = False

transformIndex :: HiValue -> Int -> Int
transformIndex (HiValueNumber rat) l
  | i < 0 = l + i
  | i > l = l
  | otherwise = i
  where
    i = fromEnum rat
transformIndex _ _ = error "Unreachable line of code."

char2Hex :: Enum a => a -> String
char2Hex c = if length newHex == 2 then '0' : newHex else newHex
  where
    newHex = (showHex (fromEnum c) " ")

isIntegral :: Rational -> Bool
isIntegral rat = rat == fromInteger (truncate rat) && inBounds
  where
    inBounds = toRational (minBound :: Int) <= rat && rat <= toRational (maxBound :: Int)

isNumIntegral :: HiValue -> Bool
isNumIntegral (HiValueNumber rat) = isIntegral rat
isNumIntegral _                   = error "Unreachable line of code."

isFalse :: HiValue -> Bool
isFalse (HiValueNull)       = True
isFalse (HiValueBool False) = True
isFalse _                   = False

getRight :: Either a b -> b
getRight a = fromRight undefined a

getLeft :: Either a b -> a
getLeft e = fromLeft undefined e

countFreq :: Ord k => [k] -> M.Map k HiValue
countFreq xs = HiValueNumber . toRational <$> M.fromListWith (+) [(x, 1) | x <- xs]

invert :: Ord k => M.Map HiValue k -> M.Map k HiValue
invert dict = HiValueList <$> M.fromListWith (S.><) [(a, k S.<| S.empty) | (k, a) <- M.toList dict]
