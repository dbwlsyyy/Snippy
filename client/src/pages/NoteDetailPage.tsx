import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks'; // 이렇게 바로 임포트!
import { db } from '../api/db';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/androidstudio.css';

import styles from './NoteDetailPage.module.css';
import BtnCRUD from '../components/common/BtnCRUD';

function NoteDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const noteId = Number(id);

    const note = useLiveQuery(async () => {
        if (isNaN(noteId)) return undefined;

        return await db.notes.get(noteId);
    }, [noteId]);

    const html = marked.parse(note ? note.content : ''); // useMemo 추후 적용

    useEffect(() => {
        if (html) hljs.highlightAll();
    }, [html]);

    if (isNaN(noteId)) {
        return (
            <div className={`${styles.container} ${styles.errMsg}`}>
                <h2 className={styles.pageTitle}>
                    유효하지 않은 노트 ID 입니다.
                </h2>
                <button
                    onClick={() => navigate('/notes')}
                    className={styles.editButton}
                >
                    노트 목록으로 돌아가기
                </button>
            </div>
        );
    }

    if (!note) {
        return (
            <div className={`${styles.container} ${styles.errMsg}`}>
                <h2 className={styles.pageTitle}>노트를 찾을 수 없습니다.</h2>
                <button
                    onClick={() => navigate('/notes')}
                    className={styles.editButton}
                >
                    노트 목록으로 돌아가기
                </button>
            </div>
        );
    }

    const handleUpdate = () => {
        navigate(`/notes/edit/${noteId}`);
    };

    const handleDelete = async () => {
        const confirmDelete = confirm('노트를 삭제하시겠습니까?');
        if (!confirmDelete) return;

        try {
            await db.notes.delete(noteId);
            navigate('/notes');
        } catch (err) {
            console.error('노트 삭제 실패:', err);
            alert(
                `노트 삭제 실패: ${
                    err instanceof Error ? err.message : String(err)
                }`
            );
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{note.title}</h1>
            <div className={styles.metaData}>
                <div className={styles.meta}>
                    <p className={styles.date}>
                        {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                    <div className={styles.metaBtn}>
                        <BtnCRUD type="수정" onClick={handleUpdate} />
                        <BtnCRUD type="삭제" onClick={handleDelete} />
                    </div>
                </div>
                <div className={styles.metaTags}>
                    {note.tags.map((tag: string) => (
                        <span key={tag} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}

export default NoteDetailPage;
