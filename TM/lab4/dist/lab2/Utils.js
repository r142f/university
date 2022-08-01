import { existsSync, mkdirSync } from 'fs';
export const EPSILON = 'ε';
export const path = "/home/sandman/Projects/ITMO/TM/lab4/src/lab2";
export function createDirectory(name) {
    if (!existsSync(`${path}/${name}`)) {
        mkdirSync(`${path}/${name}`);
    }
}
//# sourceMappingURL=Utils.js.map