'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dictionary_1 = require("./dictionary");
class DictionaryContainer {
    constructor() {
        //#region constructor
        this._id = 0;
        this._dictionaries = [];
        this._id = 0;
        this._dictionaries = [];
    }
    //#endregion
    //#region ID
    _newId() {
        this._id += 1;
        return this._id;
    }
    //#endregion
    //#region create
    /**
     * Add a new dictionary to the container
     * @param name - dictionary name / identifier string
     * @param data - dictionary data
     * @returns - the parsed dictionary object
     */
    addDictionary(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this._newId();
            const dictionary = new dictionary_1.Dictionary(id, name);
            dictionary.parse(data);
            this._dictionaries.push(dictionary);
            return dictionary;
        });
    }
    /**
     * @param uid - dictionary name or ID number
     * @param data - category data
     * @param locale - unicode locale string
     */
    addCategory(uid, data, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = yield this.getDictionaryIndex(uid, locale);
            if (index === -1)
                throw new Error(`Unable to find "${uid}".`);
            this._dictionaries[index].addCategory(data);
            return this._dictionaries[index];
        });
    }
    /**
     * @param uid - dictionary name or ID number
     * @param data - value data
     * @param locale - unicode locale string
     */
    addValue(uid, data, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = yield this.getDictionaryIndex(uid, locale);
            if (index === -1)
                throw new Error(`Unable to find "${uid}".`);
            this._dictionaries[index].addValue(data.name, data.categories);
            return this._dictionaries[index];
        });
    }
    //#endregion
    //#region read
    /**
     * Get a single dictionary from the container
     * @param uid - dictionary name or ID number
     * @param locale - unicode locale string
     */
    getDictionary(uid, locale) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let dictionaries = [];
            if (typeof uid === 'string') {
                dictionaries = this._dictionaries.filter((dictionary) => {
                    return dictionary.name.localeCompare(uid, locale, { sensitivity: 'base' }) === 0;
                });
            }
            else if (typeof uid === 'number') {
                dictionaries = this._dictionaries.filter((dictionary) => {
                    return dictionary.id === uid;
                });
            }
            return _a = dictionaries[0], (_a !== null && _a !== void 0 ? _a : null);
        });
    }
    /**
     * Get all dictionaries from the container
     * @returns - array of dictionaries
     */
    getDictionaries() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dictionaries;
        });
    }
    /**
     * Returns a dictionary's index in the container, or -1 if not found
     * @param uid - dictionary name or ID number
     * @param locale - unicode locale string
     */
    getDictionaryIndex(uid, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof uid === 'string') {
                return this._dictionaries.findIndex((dictionary) => {
                    return dictionary.name.localeCompare(uid, locale, { sensitivity: 'base' });
                });
            }
            else {
                return this._dictionaries.findIndex((dictionary) => {
                    return dictionary.id === uid;
                });
            }
        });
    }
    /**
     * @returns - a 2d array of dictionary name and id
     */
    listDictionaries() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dictionaries.map((dictionary) => {
                return [dictionary.name, dictionary.id];
            });
        });
    }
    //#endregion
    //#region update
    /**
     * Replace the contents of a dictionary while maintaining its ID number
     * @param uid - dictionary name or ID number
     * @param str - dictionary data
     * @param locale - unicode locale string
     */
    updateDictionary(uid, str, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = yield this.getDictionaryIndex(uid, locale);
            if (index === -1)
                throw new Error(`Unable to find index for "${uid}".`);
            const existing = this._dictionaries[index];
            existing.parse(str);
            this._dictionaries[index] = existing;
            return this._dictionaries[index];
        });
    }
    /**
     * Rename a single dictionary in the container
     * @param uid - dictionary name or ID number
     * @param name - new dictionary name or identifier string
     * @param locale - unicode locale string
     */
    renameDictionary(uid, name, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = yield this.getDictionaryIndex(uid, locale);
            if (index === -1)
                throw new Error(`Unable to find index for "${uid}".`);
            this._dictionaries[index].name = name;
            return this._dictionaries[index];
        });
    }
    //#endregion
    //#region destroy
    /**
     * Remove a single dictionary from the container
     * @param uid - dictionary name or ID number
     * @param locale - unicode locale string
     */
    removeDictionary(uid, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = yield this.getDictionaryIndex(uid, locale);
            if (index === -1)
                throw new Error(`Unable to find "${uid}".`);
            this._dictionaries.splice(index, 1);
            return this._dictionaries[index];
        });
    }
    /**
     * Remove all dictionaries from the container
     */
    empty() {
        return __awaiter(this, void 0, void 0, function* () {
            this._dictionaries = [];
        });
    }
    /**
     * Remove a category from a dictionary
     * @param uid - dictionary name or ID number
     * @param cid - category number
     * @param locale - unicode locale string
     */
    removeCategory(uid, cid, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = yield this.getDictionaryIndex(uid, locale);
            if (index === -1)
                throw new Error(`Unable to find "${uid}".`);
            this._dictionaries[index].removeCategory(cid);
            return this._dictionaries[index];
        });
    }
    /**
     * Remove a category from a dictionary
     * @param uid - dictionary name or ID number
     * @param value - value name
     * @param locale - unicode locale string
     */
    removeValue(uid, value, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = yield this.getDictionaryIndex(uid, locale);
            if (index === -1)
                throw new Error(`Unable to find "${uid}".`);
            this._dictionaries[index].removeValue(value);
            return this._dictionaries[index];
        });
    }
}
exports.DictionaryContainer = DictionaryContainer;
//# sourceMappingURL=container.js.map