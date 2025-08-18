import React from 'react';
import styles from './NoteForm.module.css';

interface NoteFomeProps {
    noteContent: string;
    setNoteContent: (value: string) => void;
}

function NoteForm({ noteContent, setNoteContent }: NoteFomeProps) {
    return (
        <textarea
            className={styles.contentsInput}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="오늘의 아이디어를 기록하세요."
        />
    );
}

export default NoteForm;
