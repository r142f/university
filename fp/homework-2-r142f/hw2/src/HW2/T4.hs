module HW2.T4 where

import qualified Control.Monad
import           HW2.T1        (Annotated (..), mapAnnotated)

data State s a = S {runS :: s -> Annotated s a}

mapState :: (a -> b) -> State s a -> State s b
mapState f state = S $ \s -> mapAnnotated f $ runS state s

wrapState :: a -> State s a
wrapState a = S $ \s -> a :# s

joinState :: State s (State s a) -> State s a
joinState (S outerRunS) = S $ \s -> case outerRunS s of state :# e -> runS state e

modifyState :: (s -> s) -> State s ()
modifyState f = S $ \s -> () :# f s

instance Functor (State s) where
  fmap = mapState

instance Applicative (State s) where
  pure = wrapState
  p <*> q = Control.Monad.ap p q

instance Monad (State s) where
  m >>= f = joinState (fmap f m)

data Prim a
  = Add a a
  | Sub a a
  | Mul a a
  | Div a a
  | Abs a
  | Sgn a

data Expr = Val Double | Op (Prim Expr)

instance Num Expr where
  x + y = Op (Add x y)
  x - y = Op (Sub x y)
  x * y = Op (Mul x y)
  abs x = Op (Abs x)
  signum x = Op (Sgn x)
  fromInteger x = Val (fromInteger x)

instance Fractional Expr where
  x / y = Op (Div x y)
  fromRational x = Val $ fromRational x

eval :: Expr -> State [Prim Double] Double
eval expr = do
  case expr of
    Val val -> return val
    Op (Add x y) ->
      do
        xEval <- eval x
        yEval <- eval y
        modifyState ((:) $ Add xEval yEval)
        pure $ xEval + yEval
    Op (Sub x y) ->
      do
        xEval <- eval x
        yEval <- eval y
        modifyState ((:) $ Sub xEval yEval)
        pure $ xEval - yEval
    Op (Mul x y) ->
      do
        xEval <- eval x
        yEval <- eval y
        modifyState ((:) $ Mul xEval yEval)
        pure $ xEval * yEval
    Op (Div x y) ->
      do
        xEval <- eval x
        yEval <- eval y
        modifyState ((:) $ Div xEval yEval)
        pure $ xEval / yEval
    Op (Abs x) ->
      do
        xEval <- eval x
        modifyState ((:) $ Abs xEval)
        pure $ abs xEval
    Op (Sgn x) ->
      do
        xEval <- eval x
        modifyState ((:) $ Sgn xEval)
        pure $ signum xEval
