import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../api/db';
import { marked } from 'marked';

import styles from './NoteDetailPage.module.css';
import BtnCRUD from '../components/common/BtnCRUD';

function NoteDetailPage() {
    const navigate = useNavigate();
    const noteParam = useParams();
    const noteId = Number(noteParam.id);

    //노트 타입 검사? 유효성 검사 어떻게 하지? 근데 디테일페이지로 이동한거면 무조건 note 타입이 Note 일텐데 undefinded가 나올리가 앖잖아 그걸 얘한테 어떻게 알려줘야하지
    const note = useLiveQuery(() => db.notes.get(noteId));
    const html = marked.parse(note ? note.content : '');
    console.log(html);
    const handleUpdate = () => {};

    const handleDelete = async () => {
        const confirmDelete = confirm('노트를 삭제하시겠습니까?');
        if (!confirmDelete) return;
        await db.notes.delete(noteId);
        navigate('/notes');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{note?.title}</h1>
            <div className={styles.metaData}>
                <div className={styles.meta}>
                    <p className={styles.date}>
                        {new Date(note?.createdAt).toLocaleString()}
                    </p>
                    <div className={styles.metaBtn}>
                        <BtnCRUD type="수정" onClick={handleUpdate} />
                        <BtnCRUD type="삭제" onClick={handleDelete} />
                    </div>
                </div>
                <div className={styles.metaTags}>
                    {note?.tags.map((tag) => (
                        <h3 className={styles.tag}>{tag}</h3>
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
