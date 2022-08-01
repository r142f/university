module HW1.T7 where

data ListPlus a
  = a :+ ListPlus a
  | Last a
  deriving (Show)

infixr 5 :+

instance Semigroup (ListPlus a) where
  Last x <> Last y = x :+ Last y
  (x :+ xs) <> Last y = x :+ xs <> Last y
  Last x <> ys = x :+ ys
  (x :+ xs) <> ys = x :+ xs <> ys

data Inclusive a b
  = This a
  | That b
  | Both a b
  deriving (Show)

instance (Semigroup a, Semigroup b) => Semigroup (Inclusive a b) where
  This x <> This y = This (x <> y)
  That x <> That y = That (x <> y)
  This x <> That y = Both x y
  That y <> This x = Both x y
  This x1 <> Both x2 y = Both (x1 <> x2) y
  Both x1 y <> This x2 = Both (x1 <> x2) y
  That y1 <> Both x y2 = Both x (y1 <> y2)
  Both x y1 <> That y2 = Both x (y1 <> y2)
  Both x1 y1 <> Both x2 y2 = Both (x1 <> x2) (y1 <> y2)

newtype DotString = DS String deriving (Show)

instance Semigroup DotString where
  DS s1 <> DS "" = DS s1
  DS "" <> DS s2 = DS s2
  DS s1 <> DS s2 = DS (s1 <> "." <> s2)

instance Monoid DotString where
  mempty = DS ""

newtype Fun a = F (a -> a)

instance Semigroup (Fun a) where
  F f1 <> F f2 = F (f1 . f2)

instance Monoid (Fun a) where
  mempty = F id
