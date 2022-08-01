module HW1.T3 where

data Tree a
  = Leaf
  | Branch (Int, Int) (Tree a) a (Tree a)
  deriving (Show, Eq)

tsize :: Tree a -> Int
tsize Leaf                     = 0
tsize (Branch (size, _) _ _ _) = size

tdepth :: Tree a -> Int
tdepth Leaf                      = 0
tdepth (Branch (_, depth) _ _ _) = depth

tmember :: Ord a => a -> Tree a -> Bool
tmember _ Leaf = False
tmember a (Branch _ leftTree val rightTree) = case compare a val of
  EQ -> True
  LT -> tmember a leftTree
  GT -> tmember a rightTree

tinsert :: Ord a => a -> Tree a -> Tree a
tinsert a Leaf = Branch (1, 1) Leaf a Leaf
tinsert a tree@(Branch _ leftTree val rightTree)
  | a == val = tree
  | a < val = balance $ mkBranch (tinsert a leftTree) val rightTree
  | otherwise = balance $ mkBranch leftTree val (tinsert a rightTree)

mkBranch :: Tree a -> a -> Tree a -> Tree a
mkBranch Leaf val Leaf = Branch (1, 1) Leaf val Leaf
mkBranch Leaf val rightTree@(Branch (rtSize, rtDepth) _ _ _) =
  Branch (rtSize + 1, rtDepth + 1) Leaf val rightTree
mkBranch leftTree@(Branch (ltSize, ltDepth) _ _ _) val Leaf =
  Branch (ltSize + 1, ltDepth + 1) leftTree val Leaf
mkBranch leftTree@(Branch (ltSize, ltDepth) _ _ _) val rightTree@(Branch (rtSize, rtDepth) _ _ _) =
  Branch (ltSize + rtSize + 1, max ltDepth rtDepth + 1) leftTree val rightTree

depthDiff :: Tree a -> Int
depthDiff Leaf                            = 0
depthDiff (Branch _ leftTree _ rightTree) = tdepth leftTree - tdepth rightTree

rotateRight :: Tree a -> Tree a
rotateRight Leaf = Leaf
rotateRight tree@(Branch _ leftTree val rightTree) = case leftTree of
  Leaf -> tree
  (Branch _ ltLeftTree ltVal ltRightTree) ->
    mkBranch ltLeftTree ltVal $ mkBranch ltRightTree val rightTree

rotateLeft :: Tree a -> Tree a
rotateLeft Leaf = Leaf
rotateLeft tree@(Branch _ leftTree val rightTree) = case rightTree of
  Leaf -> tree
  (Branch _ rtLeftTree rtVal rtRightTree) ->
    mkBranch (mkBranch leftTree val rtLeftTree) rtVal rtRightTree

balance :: Tree a -> Tree a
balance Leaf = Leaf
balance tree@(Branch tSizeDepth leftTree val rightTree) = case depthDiff tree of
  -2 ->
    rotateLeft $
      if depthDiff rightTree > 0
        then Branch tSizeDepth leftTree val $ rotateRight rightTree
        else tree
  2 ->
    rotateRight $
      if depthDiff leftTree < 0
        then Branch tSizeDepth (rotateLeft leftTree) val rightTree
        else tree
  _ -> tree

tFromList :: Ord a => [a] -> Tree a
tFromList []       = Leaf
tFromList (x : xs) = foldl (flip tinsert) (Branch (1, 1) Leaf x Leaf) xs
