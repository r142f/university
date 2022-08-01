module HW1.T5 where

import           Data.List.NonEmpty (NonEmpty (..))

splitOn :: Eq a => a -> [a] -> NonEmpty [a]
splitOn _ [] = [] :| []
splitOn sep list = splittedList
  where
    splittedList = foldr reducer ([] :| []) list
    reducer x (acc :| res) = if x == sep then [] :| acc : res else (x : acc) :| res

joinWith :: a -> NonEmpty [a] -> [a]
joinWith sep lists = concat $ foldr reducer [] lists
  where
    reducer list []  = [list]
    reducer list res = list : [sep] : res
