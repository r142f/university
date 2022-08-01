import fs from 'fs';
import Parser from './Parser.js';
import { runTest } from './Test.js';
const dirname = 'images';
if (fs.existsSync(dirname)) {
    fs.rmSync(dirname, { recursive: true, force: true });
}
const tests = [
    {
        id: '0',
        input: '',
        description: 'Пустая строка. Грамматика такого не допускает.',
        shouldParse: false,
    },
    {
        id: '1',
        input: 'a & !b',
        description: 'Простое выражение. Должно распарсить.',
        shouldParse: true,
    },
    {
        id: '2',
        input: '!a & b ^ !c | d | (!(a | b) & !c)',
        description: 'Сложное выражение. Должен соблюдаться приоритет операций.',
        shouldParse: true,
    },
    {
        id: '3',
        input: '!a & b ^ !c | d || (!a | b)',
        description: 'Неверно составленное выражение. Не должно распарсить.',
        shouldParse: false,
    },
    {
        id: '4',
        input: '!a -> b',
        description: 'Наличие неверных символов. Не должно токенизировать.',
        shouldParse: false,
    },
    {
        id: '5',
        input: '!a ^ B',
        description: 'Наличие заглавных букв в качестве переменных. Должно распарсить.',
        shouldParse: true,
    },
    {
        id: '6',
        input: '(!a | b) & a & (a | !(b ^ c))',
        description: 'Пример выражения из условия. Должно распарсить.',
        shouldParse: true,
    },
    {
        id: '7',
        input: '!a     ^b\n\n\n| c\t\t\t & !(b)',
        description: 'Много пробельных символов. Должно распарсить.',
        shouldParse: true,
    },
];
const parser = new Parser();
for (const test of tests) {
    await runTest(test, parser);
}
await runTest({
    id: '8',
    input: '!(aa & b)',
    description: '',
    shouldParse: true,
}, parser);
//# sourceMappingURL=index.js.map