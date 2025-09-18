import { db } from '../api/db';
import type { Note, Snippet } from '../models/Note';
import { cleanTags, timestamp } from '../utils/noteUtils';

export async function saveNote(data: {
    id?: number;
    title: string;
    tags: string[];
    content: string;
    isEditMode: boolean;
}) {
    if (data.isEditMode && data.id) {
        const updatedField = {
            title: data.title.trim(),
            tags: cleanTags(data.tags),
            content: data.content,
            updatedAt: timestamp(),
        };
        return db.notes.update(data.id, updatedField as Partial<Note>);
    } else {
        const newNote = {
            title: data.title.trim(),
            tags: cleanTags(data.tags),
            content: data.content,
            createdAt: timestamp(),
            updatedAt: timestamp(),
        };
        return db.notes.add(newNote);
    }
}

export async function saveSnippet(data: {
    id: number;
    title: string;
    tags: string[];
    language: string;
    code: string;
    description: string;
    isEditMode: boolean;
}) {
    if (data.isEditMode && data.id) {
        const updatedField = {
            title: data.title.trim(),
            tags: cleanTags(data.tags),
            code: data.code,
            language: data.language,
            description: data.description,
            updatedAt: timestamp(),
        };
        return db.snippets.update(data.id, updatedField as Partial<Snippet>);
    } else {
        const newSnippet: Snippet = {
            title: data.title.trim(),
            tags: cleanTags(data.tags),
            code: data.code,
            language: data.language,
            description: data.description,
            createdAt: timestamp(),
            updatedAt: timestamp(),
        };
        return db.snippets.add(newSnippet);
    }
}
