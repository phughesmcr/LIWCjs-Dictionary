export declare class Category {
    static isValidID(id: number): boolean;
    static isValidName(str: string): boolean;
    private _id;
    private _name;
    private _description;
    private _parent;
    private _children;
    constructor(id: number, name: string, description?: string);
    get id(): number;
    get name(): string;
    get description(): string | undefined;
    get parent(): number | null;
    get children(): number[];
    setParent(parent?: number | null): void;
    addChild(category: Category | number): void;
    addChildren(categories: Category[] | number[]): void;
    removeChild(category: Category | number): void;
    removeChildren(categories: Category[]): void;
    removeAllChildren(): void;
}
