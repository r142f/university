module HW1.T4 where

import           HW1.T3 (Tree (Branch, Leaf))

tfoldr :: (a -> b -> b) -> b -> Tree a -> b
tfoldr _ initialValue Leaf = initialValue
tfoldr reducer initialValue (Branch _ leftTree val rightTree) = result'
  where
    result = reducer val $ tfoldr reducer initialValue rightTree
    result' = tfoldr reducer result leftTree
