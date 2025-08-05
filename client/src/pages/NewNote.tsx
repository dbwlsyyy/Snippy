import React, { useState } from 'react';
import styles from './NewNote.module.css';

export default function NewNote() {
    const [mode, setMode] = useState<'note' | 'snippet'>('note');
    const isNoteMode = mode === 'note';

    const [title, setTitle] = useState<string>('제목을 입력해주세요.');
    const [desc, setDesc] = useState<string>('간단 설명을 작성해주세요.');

    const [tags, setTags] = useState<string[]>([]);
    const [noteContent, setNoteContent] = useState<string>('');

    const handleMode = () => {
        setMode(isNoteMode ? 'snippet' : 'note');
    };

    return (
        <div className={styles.noteFormContainer}>
            <div className={styles.FormHeader}>
                <h2>새 {isNoteMode ? '노트' : '스니펫'} 작성</h2>
                <button onClick={handleMode} className={styles.btnMode}>
                    {isNoteMode ? '스니펫 모드로 전환' : '노트 모드로 전환'}
                </button>
            </div>
            <hr />

            <div>
                <h2>Title: {title}</h2>
                <h3>Description: {desc}</h3>
                <textarea></textarea>
            </div>
        </div>
    );
}
