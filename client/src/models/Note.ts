export interface BaseItem {
    id?: number;
    title: string;
    tags: string[];
    createdAt: number;
    updatedAt: number;
}

export interface Note extends BaseItem {
    content: string;
}

export interface Snippet extends BaseItem {
    code: string;
    language: string;
    description?: string;
}
