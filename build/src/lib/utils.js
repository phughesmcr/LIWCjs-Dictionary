'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = (str) => str.replace(/[\/^$+?.()|\[\]{}-]/g, '\\$&');
exports.makeRegExp = (str) => new RegExp('^' +
    exports.escape(str
        .replace('(', '')
        .replace(')', '')
        .replace('*', '\\S*')) +
    '$');
//# sourceMappingURL=utils.js.map