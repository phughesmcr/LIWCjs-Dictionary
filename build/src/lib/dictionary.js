'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("./category");
const value_1 = require("./value");
const parser_1 = require("./parser");
class Dictionary {
    constructor(id, name) {
        this._categories = {};
        this._values = [];
        this._counts = {
            categories: 0,
            values: 0,
        };
        this._init = false;
        this._id = id;
        this._name = name;
        this._init = false;
    }
    //#endregion
    //#region getters
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(str) {
        this._name = str;
    }
    get categories() {
        return this._categories;
    }
    get values() {
        return this._values;
    }
    get categoryCount() {
        return this._counts.categories;
    }
    get valueCount() {
        return this._counts.values;
    }
    get numberCategory() {
        return this._numberCategory;
    }
    //#endregion
    //#region parse
    getNumberCategory() {
        const cats = Object.values(this._categories).filter((category) => /^num/i.test(category.name));
        if (cats.length > 0)
            return cats[0].id;
        return undefined;
    }
    parse(data) {
        const result = parser_1.parseDictionary(data);
        this._categories = result.categories;
        this._values = result.values;
        this._counts = result.counts;
        this._numberCategory = this.getNumberCategory();
        this._init = true;
    }
    isReady() {
        return this._init;
    }
    //#endregion
    //#region category handlers
    addCategory(data) {
        if (!data || data.id == null || !data.name) {
            throw new Error(`Invalid category data.`);
        }
        if (!this._categories[data.id]) {
            if (!category_1.Category.isValidID(data.id) || !category_1.Category.isValidName(data.name)) {
                throw new Error(`Invalid category data.`);
            }
            const category = new category_1.Category(data.id, data.name, data.description);
            if (data.parent != null)
                category.setParent(data.parent);
            if (data.children) {
                category.addChildren(data.children);
                for (let i = 0; i < data.children.length; i++) {
                    const child = data.children[i];
                    const arr = Object.values(this._categories).filter((category) => {
                        return category.id === child;
                    });
                    if (arr.length)
                        this._categories[arr[0].id].setParent(data.id);
                }
            }
            this._categories[data.id] = category;
        }
        else {
            throw new Error(`Category "${data.id}" already exists in dictionary "${this.name}".`);
        }
    }
    removeCategory(category) {
        if (category instanceof category_1.Category) {
            category = category.id;
        }
        if (!this._categories[category])
            throw new Error(`Category "${category}" not found in dictionary "${this.name}".`);
        delete this._categories[category];
        this._removeParentsAndChildren(category);
    }
    _removeParentsAndChildren(id) {
        for (const category in this.categories) {
            if (!this.categories.hasOwnProperty(category))
                continue;
            if (this.categories[category].parent === id) {
                this.categories[category].setParent(null);
            }
            if (this.categories[category].children.includes(id)) {
                const index = this.categories[category].children.indexOf(id);
                this.categories[category].children.splice(index, 1);
            }
        }
    }
    //#endregion
    //#region value handlers
    findValueIndex(value, locale) {
        return this._values.findIndex((v) => {
            var _a;
            return v.value.localeCompare(value, locale, { sensitivity: 'base' }) === 0 || ((_a = v.pattern) === null || _a === void 0 ? void 0 : _a.test(value));
        });
    }
    addValue(value, categories) {
        if (!value || !categories || !categories.length) {
            throw new Error(`Invalid value data.`);
        }
        const existingIdx = this.findValueIndex(value);
        if (existingIdx === -1 || !this._values[existingIdx]) {
            if (!value_1.Value.isValidValue(value) || !value_1.Value.isValidCategories(categories)) {
                throw new Error(`Invalid value data.`);
            }
            this._values.push(new value_1.Value(value, categories));
        }
        else {
            throw new Error(`Value "${value}" already exists in dictionary "${this.name}".`);
        }
    }
    removeValue(value) {
        if (value instanceof value_1.Value) {
            value = value.value;
        }
        const existingIdx = this.findValueIndex(value);
        if (existingIdx === -1 || !this._values[existingIdx]) {
            throw new Error(`Value "${value}" not found in dictionary "${this.name}".`);
        }
        this._values.splice(existingIdx, 1);
    }
}
exports.Dictionary = Dictionary;
//# sourceMappingURL=dictionary.js.map