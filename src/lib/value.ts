'use strict';

import { makeRegExp } from './utils';

export class Value {
  //#region statics

  static isValidValue(str: string): boolean {
    if (typeof str === 'string' && str.replace(/\s+/g, '').trim().length) {
      return true;
    }
    return false;
  }

  static isValidCategories(arr: number[]): boolean {
    if (Array.isArray(arr)) {
      if (arr.filter((n) => Number.isNaN(n)).length === 0) {
        return true;
      }
    }
    return false;
  }

  //#endregion

  //#region constructor

  private _value: string;
  private _categories: number[];
  private _pattern: RegExp;

  constructor(value: string, categories: number[]) {
    this._value = value;
    this._categories = categories;
    this._pattern = makeRegExp(value);
  }

  //#endregion

  //#region getters

  get value(): string {
    return this._value;
  }

  get categories(): number[] {
    return this._categories;
  }

  get pattern(): RegExp | undefined {
    return this._pattern;
  }

  //#endregion

  //#region functions

  setValue(value: string): void {
    if (!value) {
      throw new Error(`Value cannot be empty.`);
    }
    this._value = value;
    this._pattern = makeRegExp(value);
  }

  addCategory(id: number): void {
    // tslint:disable-next-line: triple-equals
    if (id == undefined || Number.isNaN(id)) {
      throw new Error(`Invalid value category "${id}".`);
    }
    if (!this._categories.includes(id)) this._categories.push(id);
  }

  removeCategory(id: number): void {
    if (id == null || Number.isNaN(id)) {
      throw new Error(`Invalid value category "${id}".`);
    }
    const idx = this._categories.indexOf(id);
    if (idx > -1) this._categories.splice(idx, 1);
  }

  addCategories(categories: number[]): void {
    if (Array.isArray(categories)) {
      for (const category of categories) {
        this.addCategory(category);
      }
    } else {
      throw new Error(`Invalid category array "${categories}".`);
    }
  }

  removeCategories(categories: number[]): void {
    if (Array.isArray(categories)) {
      for (const category of categories) {
        this.removeCategory(category);
      }
    } else {
      throw new Error(`Invalid category array "${categories}".`);
    }
  }

  //#endregion
}
