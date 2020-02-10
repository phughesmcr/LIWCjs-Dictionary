'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Category {
    constructor(id, name, description) {
        this._parent = null;
        this._children = [];
        this._id = id;
        this._name = name;
        this._description = description;
    }
    //#region statics
    static isValidID(id) {
        if (!Number.isNaN(id)) {
            return true;
        }
        return false;
    }
    static isValidName(str) {
        if (typeof str === 'string' && !/[^a-zA-Z0-9]/.test(str)) {
            return true;
        }
        return false;
    }
    //#endregion
    //#region getters
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get parent() {
        return this._parent;
    }
    get children() {
        return this._children;
    }
    //#endregion
    //#region functions
    setParent(parent) {
        if (parent == null) {
            this._parent = null;
            return;
        }
        // tslint:disable-next-line: ban
        if (typeof parent !== 'number')
            parent = parseInt(parent, 10);
        if (Number.isNaN(parent)) {
            throw new Error(`Invalid parent "${parent}".`);
        }
        else {
            this._parent = parent;
        }
    }
    addChild(category) {
        if (category instanceof Category) {
            category = category.id;
        }
        else {
            // tslint:disable-next-line: ban
            if (typeof category === 'string')
                category = parseInt(category, 10);
        }
        if (Number.isNaN(category)) {
            throw new Error(`Invalid category "${category}".`);
        }
        if (!this._children.includes(category))
            this._children.push(category);
    }
    addChildren(categories) {
        for (const category of categories) {
            this.addChild(category);
        }
    }
    removeChild(category) {
        if (category instanceof Category) {
            category = category.id;
        }
        else {
            // tslint:disable-next-line: ban
            if (typeof category === 'string')
                category = parseInt(category, 10);
        }
        if (Number.isNaN(category)) {
            throw new Error(`Invalid category "${category}".`);
        }
        const idx = this._children.indexOf(category);
        if (idx > -1)
            this._children.splice(idx, 1);
    }
    removeChildren(categories) {
        for (const category of categories) {
            this.removeChild(category);
        }
    }
    removeAllChildren() {
        this._children = [];
    }
}
exports.Category = Category;
//# sourceMappingURL=category.js.map