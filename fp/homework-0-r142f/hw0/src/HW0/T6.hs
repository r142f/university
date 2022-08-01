module HW0.T6 where

import           Data.Char (isSpace)
import           HW0.T1    (distrib)

a :: (Either String b, Either String c)
a = distrib (Left ("AB" ++ "CD" ++ "EF")) -- distrib from HW0.T1

b :: [Bool]
b = map isSpace "Hello, World"

c :: String
c = if 1 > 0 || error "X" then "Y" else "Z"

a_whnf :: Either (Either String b1, Either (Either String b2) b3) b4
a_whnf = (Left (Left ("AB" ++ "CD" ++ "EF"), Left (Left ("AB" ++ "CD" ++ "EF"))))

b_whnf :: [Bool]
b_whnf = isSpace 'H' : map isSpace "ello, World"

c_whnf :: String
c_whnf = "Y"
