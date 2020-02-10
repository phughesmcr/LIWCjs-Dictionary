'use strict';

import { Category } from './category';
import { Dictionary } from './dictionary';
import { CategoryObject } from './interfaces';
import { Value } from './value';

export class DictionaryContainer {
  //#region constructor

  private _id = 0;
  private _dictionaries: Dictionary[] = [];

  constructor() {
    this._id = 0;
    this._dictionaries = [];
  }

  //#endregion

  //#region ID

  private _newId(): number {
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
  async addDictionary(name: string, data: string): Promise<Dictionary> {
    const id = this._newId();
    const dictionary = new Dictionary(id, name);
    dictionary.parse(data);
    this._dictionaries.push(dictionary);
    return dictionary;
  }

  /**
   * @param uid - dictionary name or ID number
   * @param data - category data
   * @param locale - unicode locale string
   */
  async addCategory(uid: string | number, data: CategoryObject, locale?: string): Promise<Dictionary> {
    const index = await this.getDictionaryIndex(uid, locale);
    if (index === -1) throw new Error(`Unable to find "${uid}".`);
    this._dictionaries[index].addCategory(data);
    return this._dictionaries[index];
  }

  /**
   * @param uid - dictionary name or ID number
   * @param data - value data
   * @param locale - unicode locale string
   */
  async addValue(uid: string | number, data: { name: string; categories: number[] }, locale?: string): Promise<Dictionary> {
    const index = await this.getDictionaryIndex(uid, locale);
    if (index === -1) throw new Error(`Unable to find "${uid}".`);
    this._dictionaries[index].addValue(data.name, data.categories);
    return this._dictionaries[index]
  }

  //#endregion

  //#region read

  /**
   * Get a single dictionary from the container
   * @param uid - dictionary name or ID number
   * @param locale - unicode locale string
   */
  async getDictionary(uid: string | number, locale?: string): Promise<Dictionary | null> {
    let dictionaries: Dictionary[] = [];
    if (typeof uid === 'string') {
      dictionaries = this._dictionaries.filter((dictionary) => {
        return dictionary.name.localeCompare(uid, locale, { sensitivity: 'base' }) === 0;
      });
    } else if (typeof uid === 'number') {
      dictionaries = this._dictionaries.filter((dictionary) => {
        return dictionary.id === uid;
      });
    }
    return dictionaries[0] ?? null;
  }

  /**
   * Get all dictionaries from the container
   * @returns - array of dictionaries
   */
  async getDictionaries(): Promise<Dictionary[]> {
    return this._dictionaries;
  }

  /**
   * Returns a dictionary's index in the container, or -1 if not found
   * @param uid - dictionary name or ID number
   * @param locale - unicode locale string
   */
  async getDictionaryIndex(uid: string | number, locale?: string): Promise<number> {
    if (typeof uid === 'string') {
      return this._dictionaries.findIndex((dictionary) => {
        return dictionary.name.localeCompare(uid, locale, { sensitivity: 'base' });
      });
    } else {
      return this._dictionaries.findIndex((dictionary) => {
        return dictionary.id === uid;
      });
    }
  }

  /**
   * @returns - a 2d array of dictionary name and id
   */
  async listDictionaries(): Promise<Array<Array<string | number>>> {
    return this._dictionaries.map((dictionary) => {
      return [dictionary.name, dictionary.id];
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
  async updateDictionary(uid: string | number, str: string, locale?: string): Promise<Dictionary> {
    const index = await this.getDictionaryIndex(uid, locale);
    if (index === -1) throw new Error(`Unable to find index for "${uid}".`);
    const existing = this._dictionaries[index];
    existing.parse(str);
    this._dictionaries[index] = existing;
    return this._dictionaries[index];
  }

  /**
   * Rename a single dictionary in the container
   * @param uid - dictionary name or ID number
   * @param name - new dictionary name or identifier string
   * @param locale - unicode locale string
   */
  async renameDictionary(uid: string | number, name: string, locale?: string): Promise<Dictionary> {
    const index = await this.getDictionaryIndex(uid, locale);
    if (index === -1) throw new Error(`Unable to find index for "${uid}".`);
    this._dictionaries[index].name = name;
    return this._dictionaries[index];
  }

  //#endregion

  //#region destroy

  /**
   * Remove a single dictionary from the container
   * @param uid - dictionary name or ID number
   * @param locale - unicode locale string
   */
  async removeDictionary(uid: string | number, locale?: string): Promise<Dictionary> {
    const index = await this.getDictionaryIndex(uid, locale);
    if (index === -1) throw new Error(`Unable to find "${uid}".`);
    this._dictionaries.splice(index, 1);
    return this._dictionaries[index];
  }

  /**
   * Remove all dictionaries from the container
   */
  async empty(): Promise<void> {
    this._dictionaries = [];
  }

  /**
   * Remove a category from a dictionary
   * @param uid - dictionary name or ID number
   * @param cid - category number
   * @param locale - unicode locale string
   */
  async removeCategory(uid: string | number, cid: Category | number, locale?: string): Promise<Dictionary> {
    const index = await this.getDictionaryIndex(uid, locale);
    if (index === -1) throw new Error(`Unable to find "${uid}".`);
    this._dictionaries[index].removeCategory(cid);
    return this._dictionaries[index]
  }

  /**
   * Remove a category from a dictionary
   * @param uid - dictionary name or ID number
   * @param value - value name
   * @param locale - unicode locale string
   */
  async removeValue(uid: string | number, value: Value | string, locale?: string): Promise<Dictionary> {
    const index = await this.getDictionaryIndex(uid, locale);
    if (index === -1) throw new Error(`Unable to find "${uid}".`);
    this._dictionaries[index].removeValue(value);
    return this._dictionaries[index];
  }

  //#endregion
}
