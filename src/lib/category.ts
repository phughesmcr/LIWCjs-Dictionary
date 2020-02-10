'use strict';

export class Category {
  //#region statics

  static isValidID(id: number): boolean {
    if (!Number.isNaN(id)) {
      return true;
    }
    return false;
  }

  static isValidName(str: string): boolean {
    if (typeof str === 'string' && !/[^a-zA-Z0-9]/.test(str)) {
      return true;
    }
    return false;
  }

  //#endregion

  //#region constructor

  private _id: number;
  private _name: string;
  private _description: string | undefined;
  private _parent: number | null = null;
  private _children: number[] = [];

  constructor(id: number, name: string, description?: string) {
    this._id = id;
    this._name = name;
    this._description = description;
  }

  //#endregion

  //#region getters

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string | undefined {
    return this._description;
  }

  get parent(): number | null {
    return this._parent;
  }

  get children(): number[] {
    return this._children;
  }

  //#endregion

  //#region functions

  setParent(parent?: number | null): void {
    if (parent == null) {
      this._parent = null;
      return;
    }
    // tslint:disable-next-line: ban
    if (typeof parent !== 'number') parent = parseInt(parent, 10);
    if (Number.isNaN(parent)) {
      throw new Error(`Invalid parent "${parent}".`);
    } else {
      this._parent = parent;
    }
  }

  addChild(category: Category | number): void {
    if (category instanceof Category) {
      category = category.id;
    } else {
      // tslint:disable-next-line: ban
      if (typeof category === 'string') category = parseInt(category, 10);
    }
    if (Number.isNaN(category)) {
      throw new Error(`Invalid category "${category}".`);
    }
    if (!this._children.includes(category)) this._children.push(category);
  }

  addChildren(categories: Category[] | number[]): void {
    for (const category of categories) {
      this.addChild(category);
    }
  }

  removeChild(category: Category | number): void {
    if (category instanceof Category) {
      category = category.id;
    } else {
      // tslint:disable-next-line: ban
      if (typeof category === 'string') category = parseInt(category, 10);
    }
    if (Number.isNaN(category)) {
      throw new Error(`Invalid category "${category}".`);
    }
    const idx = this._children.indexOf(category);
    if (idx > -1) this._children.splice(idx, 1);
  }

  removeChildren(categories: Category[]): void {
    for (const category of categories) {
      this.removeChild(category);
    }
  }

  removeAllChildren(): void {
    this._children = [];
  }

  //#endregion
}
