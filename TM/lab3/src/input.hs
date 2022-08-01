fac :: Int -> Int
fac 1 = 1
fac n | n > 0 = n * fac(n - 1)

gcd :: Int -> Int -> Int
gcd a b | b == 0 = a
gcd a b = gcd(b, a % b)

add :: Double -> Double -> Double
add a b = a + b

sayHello :: String -> String
sayHello "" = "Hello!"
sayHello name | name /= "" = "Hello, " + name + "!"

invert :: Bool -> Bool
invert true = false
invert false = true
