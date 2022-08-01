module HW1.T1 where

import           Numeric.Natural (Natural)

data Day
  = Monday
  | Tuesday
  | Wednesday
  | Thursday
  | Friday
  | Saturday
  | Sunday
  deriving (Show, Eq)

instance Enum Day where
  toEnum 0 = Monday
  toEnum 1 = Tuesday
  toEnum 2 = Wednesday
  toEnum 3 = Thursday
  toEnum 4 = Friday
  toEnum 5 = Saturday
  toEnum 6 = Sunday
  toEnum n = toEnum (n `mod` 7)

  fromEnum Monday    = 0
  fromEnum Tuesday   = 1
  fromEnum Wednesday = 2
  fromEnum Thursday  = 3
  fromEnum Friday    = 4
  fromEnum Saturday  = 5
  fromEnum Sunday    = 6

nextDay :: Day -> Day
nextDay = succ

afterDays :: Natural -> Day -> Day
afterDays n
  | n == 0 || n `mod` 7 == 0 = id
  | otherwise = nextDay . afterDays (n `mod` 7 - 1)

isWeekend :: Day -> Bool
isWeekend day = day == Saturday || day == Sunday

daysToParty :: Day -> Natural
daysToParty Friday = 0
daysToParty day    = (daysToParty . nextDay) day + 1
