module HW2.T1 where

data Option a = None | Some a

data Pair a = P a a

data Quad a = Q a a a a

data Annotated e a = a :# e

infix 0 :#

data Except e a = Error e | Success a

data Prioritised a = Low a | Medium a | High a

data Stream a = a :> Stream a

infixr 5 :>

data List a = Nil | a :. List a

infixr 5 :.

data Fun i a = F (i -> a)

data Tree a = Leaf | Branch (Tree a) a (Tree a)

mapOption :: (a -> b) -> (Option a -> Option b)
mapOption f = newF
  where
    newF None     = None
    newF (Some a) = Some (f a)

mapPair :: (a -> b) -> (Pair a -> Pair b)
mapPair f = newF
  where
    newF (P x y) = P (f x) $ f y

mapQuad :: (a -> b) -> (Quad a -> Quad b)
mapQuad f = newF
  where
    newF (Q a1 a2 a3 a4) = Q (f a1) (f a2) (f a3) (f a4)

mapAnnotated :: (a -> b) -> (Annotated e a -> Annotated e b)
mapAnnotated f = newF
  where
    newF (a :# e) = (f a) :# e

mapExcept :: (a -> b) -> (Except e a -> Except e b)
mapExcept f = newF
  where
    newF (Success a) = Success $ f a
    newF (Error a)   = Error a

mapPrioritised :: (a -> b) -> (Prioritised a -> Prioritised b)
mapPrioritised f = newF
  where
    newF (Low a)    = Low $ f a
    newF (Medium a) = Medium $ f a
    newF (High a)   = High $ f a

mapStream :: (a -> b) -> (Stream a -> Stream b)
mapStream f = newF
  where
    newF (x :> xs) = f x :> newF xs

mapList :: (a -> b) -> (List a -> List b)
mapList f = newF
  where
    newF Nil       = Nil
    newF (x :. xs) = f x :. newF xs

mapFun :: (a -> b) -> (Fun i a -> Fun i b)
mapFun f = newF
  where
    newF (F g) = F $ f . g

mapTree :: (a -> b) -> (Tree a -> Tree b)
mapTree f = newF
  where
    newF (Leaf)           = Leaf
    newF (Branch lt a rt) = Branch (newF lt) (f a) (newF rt)
