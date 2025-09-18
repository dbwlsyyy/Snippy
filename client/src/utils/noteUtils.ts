export const cleanTags = (tags: string[]): string[] => [
    ...new Set(tags.map((tag) => tag.trim()).filter((tag) => tag !== '')),
];

export const timestamp = (): number => Date.now();
