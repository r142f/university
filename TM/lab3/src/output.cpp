#include <bits/stdc++.h>

using namespace std;

int fac(int n) {
  if (n == 1) {
    return 1;
  } else if (n > 0) {
    return n * fac(n - 1);
  }
}

int gcd(int a, int b) {
  if (b == 0) {
    return a;
  }
  return gcd(b, a % b);
}

double add(double a, double b) {
  return a + b;
}

string sayHello(string name) {
  if (name == "") {
    return "Hello!";
  } else if (name != "") {
    return "Hello, " + name + "!";
  }
}

bool invert(bool a0) {
  if (a0 == true) {
    return false;
  } else if (a0 == false) {
    return true;
  }
}

int main() {
  return 0;
}
