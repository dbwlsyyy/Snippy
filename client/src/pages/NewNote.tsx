import React, { useEffect, useState } from 'react';
import styles from './NewNote.module.css';
import type { Note, Snippet } from '../models/Note';
import { db } from '../api/db';
import { useNavigate, useParams } from 'react-router-dom';
import BtnCRUD from '../components/common/BtnCRUD';
import { useLiveQuery } from 'dexie-react-hooks';
import NoteForm from '../components/forms/NoteForm';
import SnippetForm from '../components/forms/SnippetForm';

export default function NewNote() {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const noteId = id ? Number(id) : NaN;

    const isEditMode = noteId ? true : false;

    const [title, setTitle] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);

    const [noteContent, setNoteContent] = useState<string>('');

    const [language, setLanguage] = useState<string>('javascript');
    const [description, setDescription] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const [mode, setMode] = useState<'note' | 'snippet'>('note');
    const isNoteMode = mode === 'note';

    const newNoteId = useLiveQuery<number | undefined>(() => {
        if (isEditMode) return undefined;
        return db.notes.count().then((count) => count + 1);
    }, [isEditMode]);

    const newSnippetId = useLiveQuery<number>(() => {
        return db.snippets.count().then((count) => count + 1);
    }, []);

    const note = useLiveQuery(async () => {
        if (!isEditMode) return;
        return await db.notes.get(noteId);
    });

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

    const handleMode = () => {
        setMode(isNoteMode ? 'snippet' : 'note');
    };

    const handleSave = async () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (isNoteMode) {
            const timestamp = Date.now();
            const noteFields = {
                title: title.trim(),
                tags: [
                    ...new Set( // new Set()으로 중복값 허용하지 않음
                        tags
                            .map((tag) => tag.trim())
                            .filter((tag) => tag !== '')
                    ),
                ],
                createdAt: timestamp,
                updatedAt: timestamp,
            };
            const updatedNoteFields = {
                title: title.trim(),
                tags: [
                    ...new Set(
                        tags
                            .map((tag) => tag.trim())
                            .filter((tag) => tag !== '')
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
                    `저장 실패: ${
                        err instanceof Error ? err.message : String(err)
                    }`
                );
            } finally {
                navigate('/notes');
            }
        } else {
            const timestamp = Date.now();
            const snippetField = {
                title: title.trim(),
                tags: [
                    ...new Set(
                        tags
                            .map((tag) => tag.trim())
                            .filter((tag) => tag !== '')
                    ),
                ],
                language: language,
                description: description,
                createdAt: timestamp,
                updatedAt: timestamp,
            };
            const updatedSnippetFields = {
                title: title.trim(),
                tags: [
                    ...new Set(
                        tags
                            .map((tag) => tag.trim())
                            .filter((tag) => tag !== '')
                    ),
                ],
                code: code,
                updatedAt: timestamp,
            };
            try {
                if (isEditMode) {
                    const updatedSnippet = {
                        ...updatedSnippetFields,
                    };
                    await db.snippets.update(noteId, updatedSnippet);
                    return;
                }
                const newSnippet: Snippet = {
                    ...snippetField,
                    code,
                    description,
                };
                await db.snippets.add(newSnippet);
            } catch (err) {
                console.error('DB 저장 실패:', err);
                alert(
                    `저장 실패: ${
                        err instanceof Error ? err.message : String(err)
                    }`
                );
            } finally {
                navigate('/snippets');
            }
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
                    <h2 className={styles.headerNumber}>
                        {isEditMode
                            ? ''
                            : isNoteMode
                            ? `# ${newNoteId}`
                            : `# ${newSnippetId}`}
                    </h2>
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
                        value={tags} //
                        onChange={(e) =>
                            setTags([...e.target.value.split(',')])
                        }
                        placeholder="태그를 입력하세요. 쉼표로 구분할 수 있습니다."
                    />
                </div>
            </div>

            <hr />

            <div className={styles.contents}>
                {isNoteMode ? (
                    <NoteForm
                        noteContent={noteContent}
                        setNoteContent={setNoteContent}
                    />
                ) : (
                    <SnippetForm
                        language={language}
                        setLanguage={setLanguage}
                        setDescription={setDescription}
                        setCode={setCode}
                    />
                )}
            </div>
        </div>
    );
}
