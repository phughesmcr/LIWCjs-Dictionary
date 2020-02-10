'use strict';

import { Category } from './category';
import { Value } from './value';
import { parseDictionary } from './parser';
import { CategoryObject, CategoryContainer, ValueContainer } from './interfaces';

export class Dictionary {
  //#region constructor

  private _id: number;
  private _name: string;
  private _categories: CategoryContainer = {};
  private _values: ValueContainer = [];
  private _counts = {
    categories: 0,
    values: 0,
  };
  private _numberCategory: number | undefined;
  private _init = false;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
    this._init = false;
  }

  //#endregion

  //#region getters

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(str: string) {
    this._name = str;
  }

  get categories(): CategoryContainer {
    return this._categories;
  }

  get values(): ValueContainer {
    return this._values;
  }

  get categoryCount(): number {
    return this._counts.categories;
  }

  get valueCount(): number {
    return this._counts.values;
  }

  get numberCategory(): number | undefined {
    return this._numberCategory;
  }

  //#endregion

  //#region parse

  getNumberCategory(): number | undefined {
    const cats = Object.values(this._categories).filter((category) => /^num/i.test(category.name));
    if (cats.length > 0) return cats[0].id;
    return undefined;
  }

  parse(data: string): void {
    const result = parseDictionary(data);
    this._categories = result.categories;
    this._values = result.values;
    this._counts = result.counts;
    this._numberCategory = this.getNumberCategory();
    this._init = true;
  }

  isReady(): boolean {
    return this._init;
  }

  //#endregion

  //#region category handlers

  addCategory(data: CategoryObject): void {
    if (!data || data.id == null || !data.name) {
      throw new Error(`Invalid category data.`);
    }
    if (!this._categories[data.id]) {
      if (!Category.isValidID(data.id) || !Category.isValidName(data.name)) {
        throw new Error(`Invalid category data.`);
      }
      const category = new Category(data.id, data.name, data.description);
      if (data.parent != null) category.setParent(data.parent);
      if (data.children) {
        category.addChildren(data.children);
        for (let i = 0; i < data.children.length; i++) {
          const child = data.children[i];
          const arr = Object.values(this._categories).filter((category) => {
            return category.id === child;
          });
          if (arr.length) this._categories[arr[0].id].setParent(data.id);
        }
      }
      this._categories[data.id] = category;
    } else {
      throw new Error(`Category "${data.id}" already exists in dictionary "${this.name}".`);
    }
  }

  removeCategory(category: Category | number): void {
    if (category instanceof Category) {
      category = category.id;
    }
    if (!this._categories[category]) throw new Error(`Category "${category}" not found in dictionary "${this.name}".`);
    delete this._categories[category];
    this._removeParentsAndChildren(category);
  }

  private _removeParentsAndChildren(id: number): void {
    for (const category in this.categories) {
      if (!this.categories.hasOwnProperty(category)) continue;
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

  findValueIndex(value: string, locale?: string): number {
    return this._values.findIndex((v) => {
      return v.value.localeCompare(value, locale, { sensitivity: 'base' }) === 0 || v.pattern?.test(value);
    });
  }

  addValue(value: string, categories: number[]): void {
    if (!value || !categories || !categories.length) {
      throw new Error(`Invalid value data.`);
    }
    const existingIdx = this.findValueIndex(value);
    if (existingIdx === -1 || !this._values[existingIdx]) {
      if (!Value.isValidValue(value) || !Value.isValidCategories(categories)) {
        throw new Error(`Invalid value data.`);
      }
      this._values.push(new Value(value, categories));
    } else {
      throw new Error(`Value "${value}" already exists in dictionary "${this.name}".`);
    }
  }

  removeValue(value: Value | string): void {
    if (value instanceof Value) {
      value = value.value;
    }
    const existingIdx = this.findValueIndex(value);
    if (existingIdx === -1 || !this._values[existingIdx]) {
      throw new Error(`Value "${value}" not found in dictionary "${this.name}".`);
    }
    this._values.splice(existingIdx, 1);
  }

  //#endregion
}
