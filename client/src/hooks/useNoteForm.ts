import { useState } from 'react';

type Mode = 'note' | 'snippet';

export default function useNoteForm(initialMode: Mode = 'note') {
    const [title, setTitle] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);

    const [noteContent, setNoteContent] = useState<string>('');

    const [language, setLanguage] = useState<string>('javascript');
    const [description, setDescription] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const [mode, setMode] = useState<Mode>(initialMode);
    const isNoteMode = mode === 'note';

    const resetForm = () => {
        setTitle('');
        setTags([]);
        setNoteContent('');
        setLanguage('plaintext');
        setDescription('');
        setCode('');
        setMode('note');
    };

    return {
        title,
        setTitle,
        tags,
        setTags,
        noteContent,
        setNoteContent,
        language,
        setLanguage,
        description,
        setDescription,
        code,
        setCode,
        mode,
        setMode,
        isNoteMode,
        resetForm,
    };
}
