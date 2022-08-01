import fs from 'fs';
import path from 'path';
export function isNonTerminal(N) {
    return /[EOXA]'?/.test(N);
}
export function createDirectory(dirname) {
    dirname = `.${path.sep}${dirname}`;
    // if (dirname.length === 2) return;
    // if (fs.existsSync(dirname)) {
    //   fs.rmSync(dirname, { recursive: true, force: true })
    // }
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname);
    }
}
export function getAttrs(u) {
    let attrs = {
        label: ` ${u?.value} `,
    };
    if (u.children.length === 0) {
        if (isNonTerminal(u.value)) {
            attrs = {
                ...attrs,
                style: 'filled',
                fillcolor: 'grey',
            };
        }
        else {
            attrs = {
                ...attrs,
                style: 'filled',
                fillcolor: 'green',
            };
        }
    }
    return attrs;
}
//# sourceMappingURL=util.js.map