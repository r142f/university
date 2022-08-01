module HW2.T5 where

import qualified Control.Monad
import           HW2.T1        (Annotated (..), Except (..))
import           HW2.T4        (Expr (Op, Val),
                                Prim (Abs, Add, Div, Mul, Sgn, Sub))

data ExceptState e s a = ES {runES :: s -> Except e (Annotated s a)}

mapExceptState :: (a -> b) -> ExceptState e s a -> ExceptState e s b
mapExceptState f state = ES $ \s -> case runES state s of
  Error e          -> Error e
  Success (a :# s) -> Success (f a :# s)

wrapExceptState :: a -> ExceptState e s a
wrapExceptState a = ES $ \s -> Success (a :# s)

joinExceptState :: ExceptState e s (ExceptState e s a) -> ExceptState e s a
joinExceptState (ES outerRunES) = ES $ \s -> case outerRunES s of
  Error e           -> Error e
  Success (es :# s) -> runES es s

modifyExceptState :: (s -> s) -> ExceptState e s ()
modifyExceptState f = ES $ \s -> Success (() :# f s)

throwExceptState :: e -> ExceptState e s a
throwExceptState e = ES $ \_ -> Error e

instance Functor (ExceptState e s) where
  fmap = mapExceptState

instance Applicative (ExceptState e s) where
  pure = wrapExceptState
  p <*> q = Control.Monad.ap p q

instance Monad (ExceptState e s) where
  m >>= f = joinExceptState (fmap f m)

data EvaluationError = DivideByZero

eval :: Expr -> ExceptState EvaluationError [Prim Double] Double
eval expr = do
  case expr of
    Val val -> return val
    Op (Add x y) ->
      do
        xEval <- eval x
        yEval <- eval y
        modifyExceptState ((:) $ Add xEval yEval)
        pure $ xEval + yEval
    Op (Sub x y) ->
      do
        xEval <- eval x
        yEval <- eval y
        modifyExceptState ((:) $ Sub xEval yEval)
        pure $ xEval - yEval
    Op (Mul x y) ->
      do
        xEval <- eval x
        yEval <- eval y
        modifyExceptState ((:) $ Mul xEval yEval)
        pure $ xEval * yEval
    Op (Div x y) ->
      do
        xEval <- eval x
        yEval <- eval y
        case yEval of
          0 -> throwExceptState DivideByZero
          _ ->
            do
              modifyExceptState ((:) $ Div xEval yEval)
              pure $ xEval / yEval
    Op (Abs x) ->
      do
        xEval <- eval x
        modifyExceptState ((:) $ Abs xEval)
        pure $ abs xEval
    Op (Sgn x) ->
      do
        xEval <- eval x
        modifyExceptState ((:) $ Sgn xEval)
        pure $ signum xEval
