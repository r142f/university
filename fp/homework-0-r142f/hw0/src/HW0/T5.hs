module HW0.T5 where

import           GHC.Natural (Natural)

type Nat a = (a -> a) -> a -> a

nz :: Nat a
nz = \_ a -> a

ns :: Nat a -> Nat a
ns = \n f -> f . n f

nplus, nmult :: Nat a -> Nat a -> Nat a
nplus = \m n f -> m f . n f
nmult = \m n f x -> m (n f) x

nFromNatural :: Natural -> Nat a
nFromNatural 0 = nz
nFromNatural n = ns (nFromNatural (n - 1))

nToNum :: Num a => Nat a -> a
nToNum n = n (+ 1) 0
