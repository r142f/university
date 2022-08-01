module HW3.Pretty where

import           HW3.Base                      (HiValue)
import           Prettyprinter                 (Doc, Pretty (pretty))
import           Prettyprinter.Render.Terminal (AnsiStyle)

prettyValue :: HiValue -> Doc AnsiStyle
prettyValue val = pretty $ show val
