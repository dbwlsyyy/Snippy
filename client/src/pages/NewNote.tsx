import React, { useEffect, useState } from 'react';
import styles from './NewNote.module.css';
import type { Note } from '../models/Note';
import { db } from '../api/db';
import { useNavigate, useParams } from 'react-router-dom';
import BtnCRUD from '../components/common/BtnCRUD';
import { useLiveQuery } from 'dexie-react-hooks';

export default function NewNote() {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const noteId = id ? Number(id) : NaN; // null이나 undefined로 해도 상관없어?

    const isEditMode = noteId ? true : false;

    const [mode, setMode] = useState<'note' | 'snippet'>('note');
    const isNoteMode = mode === 'note';

    const [title, setTitle] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [noteContent, setNoteContent] = useState<string>('');

    const newNoteId = useLiveQuery<number | undefined>(() => {
        if (!isEditMode) return undefined; // null이나 NaN으로 해도 상관없어?
        return db.notes.count().then((count) => count + 1);
    }, [isEditMode]);

    const note = useLiveQuery(async () => {
        if (!isEditMode) return;
        return await db.notes.get(noteId);
    });

    const handleMode = () => {
        setMode(isNoteMode ? 'snippet' : 'note');
    };

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setTags([...note.tags]);
            setNoteContent(note.content);
        }
    }, [note]);
    useEffect(() => {
        setTitle('');
        setTags([]);
        setNoteContent('');
    }, [isEditMode]);

    const handleSave = async () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        const timestamp = Date.now();
        const noteFields = {
            title: title.trim(),
            tags: [
                ...new Set(
                    tags.map((tag) => tag.trim()).filter((tag) => tag !== '')
                ),
            ],
            createdAt: timestamp,
            updatedAt: timestamp,
        };
        const updatedNoteFields = {
            title: title.trim(),
            tags: [
                ...new Set(
                    tags.map((tag) => tag.trim()).filter((tag) => tag !== '')
                ),
            ],
            content: noteContent,
            updatedAt: timestamp,
        };

        try {
            if (isEditMode) {
                const updatedNote = {
                    ...updatedNoteFields,
                };
                await db.notes.update(noteId, updatedNote);
                return;
            }
            if (isNoteMode) {
                const newNote: Note = {
                    ...noteFields,
                    content: noteContent,
                };
                await db.notes.add(newNote);
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
    const handleCancel = () => {
        const confirm = window.confirm('작성을 취소하시겠습니까?');
        if (confirm) {
            if (isEditMode) {
                navigate(`/notes/${noteId}`);
            } else {
                setTitle('');
                setTags([]);
                setNoteContent('');
                navigate('/');
            }
        }
        return;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    <h2 className={styles.headerNumber}># {newNoteId}</h2>
                    <div className={styles.headerbtn}>
                        <BtnCRUD type="저장" onClick={handleSave} />
                        <BtnCRUD type="취소" onClick={handleCancel} />
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

                <div className={styles.headerTag}>
                    <h3>Tags</h3>
                    <input
                        className={styles.tagInput}
                        type="text"
                        value={tags}
                        onChange={(e) =>
                            setTags([...e.target.value.split(',')])
                        }
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
                />
            </div>
        </div>
    );
}
