export declare class Value {
    static isValidValue(str: string): boolean;
    static isValidCategories(arr: number[]): boolean;
    private _value;
    private _categories;
    private _pattern;
    constructor(value: string, categories: number[]);
    get value(): string;
    get categories(): number[];
    get pattern(): RegExp | undefined;
    setValue(value: string): void;
    addCategory(id: number): void;
    removeCategory(id: number): void;
    addCategories(categories: number[]): void;
    removeCategories(categories: number[]): void;
}
