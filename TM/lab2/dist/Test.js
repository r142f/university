const colors = {
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
};
export async function runTest({ id, input, shouldParse: shouldParse = true }, parser) {
    let log = `${colors.yellow}Test${id} '${shouldParse ? colors.blue : colors.blue}${input}${colors.yellow}'.`;
    try {
        await parser.parse(input).visualizeTree(input);
        log += `${colors.green} Success! ${shouldParse ? '✅' : '❌'}`;
    }
    catch ({ message }) {
        log += `${colors.red} ${message}. ${shouldParse ? '❌' : '✅'}`;
    }
    finally {
        console.log(log);
    }
}
//# sourceMappingURL=Test.js.map