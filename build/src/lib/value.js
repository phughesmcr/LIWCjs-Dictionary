'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class Value {
    constructor(value, categories) {
        this._value = value;
        this._categories = categories;
        this._pattern = utils_1.makeRegExp(value);
    }
    //#region statics
    static isValidValue(str) {
        if (typeof str === 'string' && str.replace(/\s+/g, '').trim().length) {
            return true;
        }
        return false;
    }
    static isValidCategories(arr) {
        if (Array.isArray(arr)) {
            if (arr.filter((n) => Number.isNaN(n)).length === 0) {
                return true;
            }
        }
        return false;
    }
    //#endregion
    //#region getters
    get value() {
        return this._value;
    }
    get categories() {
        return this._categories;
    }
    get pattern() {
        return this._pattern;
    }
    //#endregion
    //#region functions
    setValue(value) {
        if (!value) {
            throw new Error(`Value cannot be empty.`);
        }
        this._value = value;
        this._pattern = utils_1.makeRegExp(value);
    }
    addCategory(id) {
        // tslint:disable-next-line: triple-equals
        if (id == undefined || Number.isNaN(id)) {
            throw new Error(`Invalid value category "${id}".`);
        }
        if (!this._categories.includes(id))
            this._categories.push(id);
    }
    removeCategory(id) {
        if (id == null || Number.isNaN(id)) {
            throw new Error(`Invalid value category "${id}".`);
        }
        const idx = this._categories.indexOf(id);
        if (idx > -1)
            this._categories.splice(idx, 1);
    }
    addCategories(categories) {
        if (Array.isArray(categories)) {
            for (const category of categories) {
                this.addCategory(category);
            }
        }
        else {
            throw new Error(`Invalid category array "${categories}".`);
        }
    }
    removeCategories(categories) {
        if (Array.isArray(categories)) {
            for (const category of categories) {
                this.removeCategory(category);
            }
        }
        else {
            throw new Error(`Invalid category array "${categories}".`);
        }
    }
}
exports.Value = Value;
//# sourceMappingURL=value.js.map