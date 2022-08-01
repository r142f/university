import { runCustomGenerator, srcPath } from "./generator/Utils.js";
import CalcParser from "./calc/Parser.js";
import Lab2Parser from "./lab2/Parser.js";
import { calcTests, lab2Tests, runTest } from "./Test.js";

runCustomGenerator("/calc.gr", `${srcPath}/calc`);
const calcParser = new CalcParser();
console.log("\x1b[4m", "\x1b[37m", "Running calc tests...", "\x1b[0m");
for (const test of calcTests) {
  await runTest(test, calcParser);
}

runCustomGenerator("/lab2.gr", `${srcPath}/lab2`);
const lab2Parser = new Lab2Parser();
console.log("\x1b[37m", "\x1b[4m", "Running lab2 tests...", "\x1b[0m");
for (const test of lab2Tests) {
  await runTest(test, lab2Parser);
}
