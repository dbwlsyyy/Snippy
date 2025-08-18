import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks'; // ✨ 실시간 쿼리를 위한 훅!
import { db } from '../api/db'; // Dexie.js DB 인스턴스
import styles from './NoteListPage.module.css';
import { Link } from 'react-router-dom';
import { stripMarkdown } from '../utils/markdownUtils';
import { RiStickyNoteFill } from 'react-icons/ri';

function NoteListPage() {
    const notes =
        useLiveQuery(
            () => db.notes.orderBy('createdAt').reverse().toArray(),
            []
        ) || [];

    const totalPosts = useLiveQuery<number>(() => {
        return db.notes.count();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.myNoteHeader}>
                <h2 className={styles.pageTitle}>
                    <RiStickyNoteFill />
                </h2>
                <span className={styles.totalPosts}>{totalPosts} Posts</span>
            </div>
            {notes.length === 0 ? (
                <p className={styles.emptyMessage}>
                    아직 노트가 없습니다. 새 노트를 작성해보세요!
                </p>
            ) : (
                <ul className={styles.noteList}>
                    {notes.map((note) => (
                        <li key={note.id} className={styles.noteListItem}>
                            <Link
                                to={`/notes/${note.id}`}
                                className={styles.noteTitle}
                            >
                                {note.title}
                            </Link>
                            <p className={styles.contentPreview}>
                                {stripMarkdown(note.content).substring(0, 200)}
                                {note.content.length > 200 ? '...' : ''}
                            </p>

                            <div className={styles.noteMeta}>
                                {note.tags && note.tags.length > 0 ? (
                                    <div className={styles.noteTags}>
                                        {note.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={styles.noteTag}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                                <span className={styles.noteDate}>
                                    {new Date(
                                        note.createdAt
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NoteListPage;
