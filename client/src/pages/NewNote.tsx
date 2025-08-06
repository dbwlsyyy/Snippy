import React, { useState } from 'react';
import styles from './NewNote.module.css';

export default function NewNote() {
    const [mode, setMode] = useState<'note' | 'snippet'>('note');
    const isNoteMode = mode === 'note';

    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');

    const [tags, setTags] = useState<string[]>([]);
    const [noteContent, setNoteContent] = useState<string>('');

    const handleMode = () => {
        setMode(isNoteMode ? 'snippet' : 'note');
    };
    const handleSave = () => {};
    const handleDelete = () => {};

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerNumber}>
                    <h2># 1</h2>
                    <div className={styles.headerbtn}>
                        <button onClick={handleSave} className={styles.btnSave}>
                            저장
                        </button>
                        <button
                            onClick={handleDelete}
                            className={styles.btnDelete}
                        >
                            삭제
                        </button>
                        <button onClick={handleMode} className={styles.btnMode}>
                            {isNoteMode
                                ? '스니펫 모드로 전환'
                                : '노트 모드로 전환'}
                        </button>
                    </div>
                </div>

                <textarea
                    className={styles.headerTitle}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력해주세요."
                    maxLength={50}
                    rows={1}
                />

                <div className={styles.headerDescription}>
                    <h3>Description/</h3>
                    <input
                        className={styles.descInput}
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="노트 내용 한 줄로 요약해보셈"
                    />
                </div>
            </div>

            <hr />

            <div className={styles.contents}>
                <textarea
                    className={styles.contentsInput}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="오늘의 아이디어를 기록하세요."
                ></textarea>
            </div>
        </div>
    );
}
