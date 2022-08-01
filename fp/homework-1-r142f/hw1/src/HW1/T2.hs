module HW1.T2 where

import           Numeric.Natural (Natural)

data N
  = Z
  | S N
  deriving (Show)

nplus :: N -> N -> N
nplus n Z           = n
nplus Z n           = n
nplus (S n1) (S n2) = S $ S $ nplus n1 n2

nmult :: N -> N -> N
nmult _ Z       = Z
nmult Z _       = Z
nmult (S n1) n2 = n2 `nplus` nmult n1 n2

nsub :: N -> N -> Maybe N
nsub n Z           = Just n
nsub (S n1) (S n2) = nsub n1 n2
nsub Z _           = Nothing

ncmp :: N -> N -> Ordering
ncmp Z Z           = EQ
ncmp _ Z           = GT
ncmp Z _           = LT
ncmp (S n1) (S n2) = ncmp n1 n2

nFromNatural :: Natural -> N
nFromNatural 0 = Z
nFromNatural n = S $ nFromNatural $ n - 1

nToNum :: Num a => N -> a
nToNum Z     = 0
nToNum (S n) = nToNum n + 1

nEven, nOdd :: N -> Bool
nEven Z     = True
nEven (S n) = not $ nEven n
nOdd = not . nEven

ndiv :: N -> N -> N
ndiv _ Z = undefined
ndiv Z _ = Z
ndiv n1 n2 = case n1 `nsub` n2 of
  Just diff -> S Z `nplus` ndiv diff n2
  Nothing   -> Z

nmod :: N -> N -> N
nmod _ Z = undefined
nmod Z _ = Z
nmod n1 n2 = case n1 `nsub` ((n1 `ndiv` n2) `nmult` n2) of
  Just r -> r
  _      -> undefined
