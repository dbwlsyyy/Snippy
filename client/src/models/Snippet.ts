export interface Snippet {
    id?: number;
    title: string;
    code: string;
    language: string;
    description?: string;
    tags: string[];
    createdAt: number;
    updatedAt: number;
}
