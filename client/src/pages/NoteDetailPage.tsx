import React from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../api/db';
import { useLiveQuery } from 'dexie-react-hooks';
import type { Note } from '../models/Note';
import styles from './NoteDetailPage.module.css';

function NoteDetailPage() {
    const noteParam = useParams();
    //노트 타입 검사? 유효성 검사 어떻게 하지? 근데 디테일페이지로 이동한거면 무조건 note 타입이 Note 일텐데 undefinded가 나올리가 앖잖아 그걸 얘한테 어떻게 알려줘야하지
    const note = useLiveQuery(() => db.notes.get(Number(noteParam.id)));
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{note?.title}</h1>
            <div className={styles.metaData}>
                <p className={styles.date}>
                    {new Date(note?.createdAt).toLocaleString()}
                </p>
                <button className={styles.btnFix}>수정</button>

                <button className={styles.btnDelete}>삭제</button>
                {note?.tags.map((tag) => (
                    <h3 className={styles.tag}>{tag}</h3>
                ))}
            </div>

            <p className={styles.content}>{note?.content}</p>
        </div>
    );
}

export default NoteDetailPage;
