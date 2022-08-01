module HW1.T6 where

mcat :: Monoid a => [Maybe a] -> a
mcat list = foldr reducer mempty list
  where
    reducer Nothing result  = result
    reducer (Just x) result = mappend x result

epart :: (Monoid a, Monoid b) => [Either a b] -> (a, b)
epart list = foldr reducer mempty list
  where
    reducer (Left x1) (x2, y)  = (mappend x1 x2, y)
    reducer (Right y1) (x, y2) = (x, mappend y1 y2)
