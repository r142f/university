module HW0.T4 where

import           Data.Function (fix)
import           GHC.Natural   (Natural)

repeat' :: a -> [a] -- behaves like Data.xs.repeat
repeat' x = fix (x :)

map' :: (a -> b) -> [a] -> [b] -- behaves like Data.xs.map
map' m = fix $ \f xxs ->
  case xxs of
    []       -> []
    (x : xs) -> m x : f xs

fib :: Natural -> Natural -- computes the n-th Fibonacci number
fib n = (fix $ \f -> 0 : 1 : (zipWith (+) f $ tail f)) !! fromEnum n

fac :: Natural -> Natural -- computes the factorial
fac = fix (\f n -> if n <= 1 then 1 else n * f (n -1))
