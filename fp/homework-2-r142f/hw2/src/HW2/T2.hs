module HW2.T2 where

import           HW2.T1 (Annotated (..), Except (..), Fun (..), List (..),
                         Option (..), Pair (..), Prioritised (..), Quad (..),
                         Stream (..))

distOption :: (Option a, Option b) -> Option (a, b)
distOption (None, _)        = None
distOption (_, None)        = None
distOption (Some a, Some b) = Some (a, b)

distPair :: (Pair a, Pair b) -> Pair (a, b)
distPair (P a1 a2, P b1 b2) = P (a1, b1) (a2, b2)

distQuad :: (Quad a, Quad b) -> Quad (a, b)
distQuad (Q a1 a2 a3 a4, Q b1 b2 b3 b4) = Q (a1, b1) (a2, b2) (a3, b3) (a4, b4)

distAnnotated :: Semigroup e => (Annotated e a, Annotated e b) -> Annotated e (a, b)
distAnnotated (a :# e1, b :# e2) = (a, b) :# (e1 <> e2)

distExcept :: (Except e a, Except e b) -> Except e (a, b)
distExcept (Error e, _)           = Error e
distExcept (_, Error e)           = Error e
distExcept (Success a, Success b) = Success (a, b)

distPrioritised :: (Prioritised a, Prioritised b) -> Prioritised (a, b)
distPrioritised (High a, High b)     = High (a, b)
distPrioritised (High a, Medium b)   = High (a, b)
distPrioritised (High a, Low b)      = High (a, b)
distPrioritised (Medium a, High b)   = High (a, b)
distPrioritised (Low a, High b)      = High (a, b)
distPrioritised (Medium a, Medium b) = Medium (a, b)
distPrioritised (Medium a, Low b)    = Medium (a, b)
distPrioritised (Low a, Medium b)    = Medium (a, b)
distPrioritised (Low a, Low b)       = Low (a, b)

distStream :: (Stream a, Stream b) -> Stream (a, b)
distStream (a :> as, b :> bs) = (a, b) :> distStream (as, bs)

distList :: (List a, List b) -> List (a, b)
distList (aInitial, bInitial) = dist (aInitial, bInitial)
  where
    dist (a :. Nil, b :. Nil) = (a, b) :. Nil
    dist (a :. as, b :. Nil)  = (a, b) :. dist (as, bInitial)
    dist (Nil, _)             = Nil
    dist (_, Nil)             = Nil
    dist (a :. as, b :. bs)   = (a, b) :. dist (a :. as, bs)

distFun :: (Fun i a, Fun i b) -> Fun i (a, b)
distFun (F a, F b) = F $ \i -> (a i, b i)

wrapOption :: a -> Option a
wrapOption a = Some a

wrapPair :: a -> Pair a
wrapPair a = P a a

wrapQuad :: a -> Quad a
wrapQuad a = Q a a a a

wrapAnnotated :: Monoid e => a -> Annotated e a
wrapAnnotated a = a :# mempty

wrapExcept :: a -> Except e a
wrapExcept a = Success a

wrapPrioritised :: a -> Prioritised a
wrapPrioritised a = Low a

wrapStream :: a -> Stream a
wrapStream a = a :> wrapStream a

wrapList :: a -> List a
wrapList a = a :. Nil

wrapFun :: a -> Fun i a
wrapFun a = F $ \_ -> a
