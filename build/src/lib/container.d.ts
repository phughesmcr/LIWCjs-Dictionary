import { Category } from './category';
import { Dictionary } from './dictionary';
import { CategoryObject } from './interfaces';
import { Value } from './value';
export declare class DictionaryContainer {
    private _id;
    private _dictionaries;
    constructor();
    private _newId;
    /**
     * Add a new dictionary to the container
     * @param name - dictionary name / identifier string
     * @param data - dictionary data
     * @returns - the parsed dictionary object
     */
    addDictionary(name: string, data: string): Promise<Dictionary>;
    /**
     * @param uid - dictionary name or ID number
     * @param data - category data
     * @param locale - unicode locale string
     */
    addCategory(uid: string | number, data: CategoryObject, locale?: string): Promise<Dictionary>;
    /**
     * @param uid - dictionary name or ID number
     * @param data - value data
     * @param locale - unicode locale string
     */
    addValue(uid: string | number, data: {
        name: string;
        categories: number[];
    }, locale?: string): Promise<Dictionary>;
    /**
     * Get a single dictionary from the container
     * @param uid - dictionary name or ID number
     * @param locale - unicode locale string
     */
    getDictionary(uid: string | number, locale?: string): Promise<Dictionary | null>;
    /**
     * Get all dictionaries from the container
     * @returns - array of dictionaries
     */
    getDictionaries(): Promise<Dictionary[]>;
    /**
     * Returns a dictionary's index in the container, or -1 if not found
     * @param uid - dictionary name or ID number
     * @param locale - unicode locale string
     */
    getDictionaryIndex(uid: string | number, locale?: string): Promise<number>;
    /**
     * @returns - a 2d array of dictionary name and id
     */
    listDictionaries(): Promise<Array<Array<string | number>>>;
    /**
     * Replace the contents of a dictionary while maintaining its ID number
     * @param uid - dictionary name or ID number
     * @param str - dictionary data
     * @param locale - unicode locale string
     */
    updateDictionary(uid: string | number, str: string, locale?: string): Promise<Dictionary>;
    /**
     * Rename a single dictionary in the container
     * @param uid - dictionary name or ID number
     * @param name - new dictionary name or identifier string
     * @param locale - unicode locale string
     */
    renameDictionary(uid: string | number, name: string, locale?: string): Promise<Dictionary>;
    /**
     * Remove a single dictionary from the container
     * @param uid - dictionary name or ID number
     * @param locale - unicode locale string
     */
    removeDictionary(uid: string | number, locale?: string): Promise<Dictionary>;
    /**
     * Remove all dictionaries from the container
     */
    empty(): Promise<void>;
    /**
     * Remove a category from a dictionary
     * @param uid - dictionary name or ID number
     * @param cid - category number
     * @param locale - unicode locale string
     */
    removeCategory(uid: string | number, cid: Category | number, locale?: string): Promise<Dictionary>;
    /**
     * Remove a category from a dictionary
     * @param uid - dictionary name or ID number
     * @param value - value name
     * @param locale - unicode locale string
     */
    removeValue(uid: string | number, value: Value | string, locale?: string): Promise<Dictionary>;
}
