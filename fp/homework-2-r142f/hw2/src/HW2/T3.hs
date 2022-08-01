module HW2.T3 where

import           HW2.T1 (Annotated (..), Except (..), Fun (..), List (..),
                         Option (..))

joinOption :: Option (Option a) -> Option a
joinOption None          = None
joinOption (Some option) = option

joinExcept :: Except e (Except e a) -> Except e a
joinExcept (Error e)   = Error e
joinExcept (Success a) = a

joinAnnotated :: Semigroup e => Annotated e (Annotated e a) -> Annotated e a
joinAnnotated ((a :# e2) :# e1) = a :# (e1 <> e2)

joinList :: List (List a) -> List a
joinList Nil                = Nil
joinList (a :. Nil)         = a
joinList ((b :. bs) :. as)  = b :. joinList (bs :. as)
joinList (Nil :. (a :. as)) = joinList (a :. as)

joinFun :: Fun i (Fun i a) -> Fun i a
joinFun (F f) = F (\i -> case (f i) of F f -> f i)
