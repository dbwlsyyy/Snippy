import React, { useState } from 'react';
import styles from './NewNote.module.css';
import type { Note } from '../models/Note';
import { db } from '../api/db';
import { useNavigate } from 'react-router-dom';

export default function NewNote() {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'note' | 'snippet'>('note');
    const isNoteMode = mode === 'note';

    const [title, setTitle] = useState<string>('');
    // const [desc, setDesc] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [noteContent, setNoteContent] = useState<string>('');

    const handleMode = () => {
        setMode(isNoteMode ? 'snippet' : 'note');
    };

    const handleSave = async () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        const timestamp = Date.now();
        const noteFields = {
            title: title.trim(),
            tags: tags.map((tag) => tag.trim()).filter((tag) => tag !== ''),
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        try {
            if (isNoteMode) {
                const newNote: Note = {
                    ...noteFields,
                    content: noteContent,
                };
                const id = await db.notes.add(newNote);
                alert(`노트를 저장하였습니다. ID: ${id}`);
            }
        } catch (err) {
            console.error('DB 저장 실패:', err);
            alert(
                `저장 실패: ${err instanceof Error ? err.message : String(err)}`
            );
        } finally {
            navigate('/notes');
        }
    };
    const handleDelete = () => {};

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    <h2 className={styles.headerNumber}># 1</h2>
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

                {/* <div className={styles.headerDescription}>
                    <h3>Description</h3>
                    <input
                        className={styles.descInput}
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="노트 내용 한 줄로 요약해보세요."
                    />
                </div> */}

                <div className={styles.headerTag}>
                    <h3>Tags</h3>
                    <input
                        className={styles.tagInput}
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value.split(','))}
                        placeholder="태그를 입력하세요. 쉼표로 구분할 수 있습니다."
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
