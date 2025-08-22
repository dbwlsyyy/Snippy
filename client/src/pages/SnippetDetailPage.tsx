import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../api/db';
import styles from './SnippetDetailPage.module.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/github-dark.css';
import type { Snippet } from '../models/Note';
import BtnCRUD from '../components/common/BtnCRUD';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);

export default function SnippetDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const snippetId = Number(id);
    const [snippet, setSnippet] = useState<Snippet | null>(null);

    const handleUpdate = () => {
        navigate(`/snippet/edit/${snippetId}`);
    };
    const handleDelete = async () => {
        try {
            const confirm = window.confirm('스니펫을 삭제하시겠습니까?');
            if (!confirm) return;
            await db.snippets.delete(snippetId);
            navigate('/snippet');
        } catch (err) {
            console.error('스니펫 삭제 실패:', err);
            alert(
                `스니펫 삭제 실패: ${
                    err instanceof Error ? err.message : String(err)
                }`
            );
        }
    };

    useEffect(() => {
        if (!id) return;
        const fetchSnippet = async () => {
            const s = await db.snippets.get(Number(id));
            setSnippet(s || null);
        };
        fetchSnippet();
    }, [id]);

    if (!snippet) {
        return (
            <div className={styles.container}>
                <p>스니펫을 찾을 수 없습니다.</p>
            </div>
        );
    }

    const highlightedCode = hljs.highlight(snippet.code, {
        language: snippet.language || 'plaintext',
    }).value;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{snippet.title}</h2>
            <div className={styles.metaArea}>
                <span className={styles.languageBadge}>
                    {snippet.language?.toUpperCase()}
                </span>

                <div className={styles.metaBtn}>
                    <BtnCRUD type="수정" onClick={handleUpdate} />
                    <BtnCRUD type="삭제" onClick={handleDelete} />
                </div>
            </div>

            <pre className={styles.codeBlock}>
                <code
                    className={`language-${snippet.language || 'plaintext'}`}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
            </pre>
            {snippet.description && (
                <p className={styles.description}>{snippet.description}</p>
            )}
        </div>
    );
}
