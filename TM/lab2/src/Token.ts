export enum Token {
  LBR = '(',
  RBR = ')',
  END = '$',
  NOT = '!',
  AND = '&',
  XOR = '^',
  OR = '|',
  VAR = 'var',
}

/*
E  -> OE'
E' -> |E
E' -> Eps
O  -> XO'
O' -> ^O
O' -> Eps
X  -> AX'
X' -> &X
X' -> Eps
A  -> var
A  -> !A
A  -> (E)
*/

export const FIRST = {
  E: ['var', '!', '('],
  E1: ['|', 'Eps'],
  O: ['var', '!', '('],
  O1: ['^', 'Eps'],
  X: ['var', '!', '('],
  X1: ['&', 'Eps'],
  A: ['var', '!', '('],
};

export const FOLLOW = {
  E: ['$', ')'],
  E1: ['$', ')'],
  O: ['|', '$', ')'],
  O1: ['|', '$', ')'],
  X: ['^', '|', '$', ')'],
  X1: ['^', '|', '$', ')'],
  A: ['&', '^', '|', '$', ')'],
};
