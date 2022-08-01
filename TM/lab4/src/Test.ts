export type Test = {
  id: string;
  input: string;
  description?: string;
  shouldParse: boolean;
  answer?: any;
};

const colors = {
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
};

export async function runTest(
  { id, input, shouldParse: shouldParse = true, answer }: Test,
  parser: any
) {
  let log = `${colors.yellow}Test${id} '${
    shouldParse ? colors.blue : colors.blue
  }${input}${colors.yellow}'.`;
  try {
    const tree = parser.parse(input);
    await tree._visualizeTree(input);
    //@ts-ignore
    if (answer && tree.val !== answer) {
      throw new Error(`Wrong answer: expected ${answer}, but got ${tree.val}`);
    }
    log += `${colors.green} Success! ${shouldParse ? "✅" : "❌"}`;
  } catch ({ message }) {
    log += `${colors.red} ${message}. ${shouldParse ? "❌" : "✅"}`;
  } finally {
    console.log(log, "\x1b[0m");
  }
}

export const lab2Tests: Array<Test> = [
  {
    id: "0",
    input: "",
    description: "Пустая строка. Грамматика такого не допускает.",
    shouldParse: false,
  },
  {
    id: "1",
    input: "a & !b",
    description: "Простое выражение. Должно распарсить.",
    shouldParse: true,
  },
  {
    id: "2",
    input: "!a & b ^ !c | d | (!(a | b) & !c)",
    description: "Сложное выражение. Должен соблюдаться приоритет операций.",
    shouldParse: true,
  },
  {
    id: "3",
    input: "!a & b ^ !c | d || (!a | b)",
    description: "Неверно составленное выражение. Не должно распарсить.",
    shouldParse: false,
  },
  {
    id: "4",
    input: "!a -> b",
    description: "Наличие неверных символов. Не должно токенизировать.",
    shouldParse: false,
  },
  {
    id: "5",
    input: "!a ^ B",
    description:
      "Наличие заглавных букв в качестве переменных. Должно распарсить.",
    shouldParse: true,
  },
  {
    id: "6",
    input: "(!a | b) & a & (a | !(b ^ c))",
    description: "Пример выражения из условия. Должно распарсить.",
    shouldParse: true,
  },
  {
    id: "7",
    input: "!a     ^b\n\n\n| c\t\t\t & !(b)",
    description: "Много пробельных символов. Должно распарсить.",
    shouldParse: true,
  },
];

export const calcTests: Array<Test> = [
  {
    id: "0",
    input: "1 + 2",
    shouldParse: true,
    answer: 1 + 2,
  },
  {
    id: "1",
    input: "(2 + 2) * ((2 * 2) + ((2 * 2) * (2 * 2)))",
    shouldParse: true,
    answer: (2 + 2) * (2 * 2 + 2 * 2 * (2 * 2)),
  },
  {
    id: "2",
    input: "2 - 1 - 2",
    shouldParse: true,
    answer: 2 - 1 - 2,
  },
  {
    id: "3",
    input: "2 - (1 - 2)",
    shouldParse: true,
    answer: 2 - (1 - 2),
  },
  {
    id: "4",
    input: "2 / 4 / 8",
    shouldParse: true,
    answer: 2 / 4 / 8,
  },
  {
    id: "5",
    input: "2 / (4 / 8)",
    shouldParse: true,
    answer: 2 / (4 / 8),
  },
  {
    id: "6",
    input: "2 ^ 3 ^ 3",
    shouldParse: true,
    answer: 2 ** 3 ** 3,
  },
  {
    id: "7",
    input: "2 ^ 3 * 3 ^ 2",
    shouldParse: true,
    answer: 2 ** 3 * 3 ** 2,
  },
];
