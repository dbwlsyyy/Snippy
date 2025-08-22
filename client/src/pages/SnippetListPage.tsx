import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../api/db';
import styles from './SnippetListPage.module.css';
import { RiCodeBoxFill } from 'react-icons/ri';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
// import jsx from 'highlight.js/lib/languages/jsx';
// import html from 'highlight.js/lib/languages/xml'; // HTML은 xml 모드에 포함됨
// import css from 'highlight.js/lib/languages/css'; // jsx랑 tsx는 왜 안되지?
// import tsx from 'highlight.js/lib/languages/tsx';
// import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
// hljs.registerLanguage('jsx', jsx);
// hljs.registerLanguage('html', html);
// hljs.registerLanguage('css', css);
// hljs.registerLanguage('tsx', tsx);
// hljs.registerLanguage('json', json);

import 'highlight.js/styles/github-dark.css';
import type { Snippet } from '../models/Note';

export default function SnippetListPage() {
    const snippets =
        useLiveQuery(
            () => db.snippets.orderBy('createdAt').reverse().toArray(),
            []
        ) || [];

    // const handleUpdateSnippet = async (id: number) => {
    //     try {
    //         await db.snippets.delete(id);
    //     } catch (error) {
    //         alert(`스니펫 삭제 실패: ${error}`);
    //     }
    // };
    // const handleDeleteSnippet = async (id: number) => {
    //     if (window.confirm('정말 이 스니펫을 삭제하시겠습니까?')) {
    //         try {
    //             await db.snippets.delete(id);
    //         } catch (error) {
    //             alert(`스니펫 삭제 실패: ${error}`);
    //         }
    //     }
    // };

    return (
        <div className={styles.container}>
            <h2 className={styles.pageTitle}>{<RiCodeBoxFill />}</h2>
            {snippets.length === 0 ? (
                <p className={styles.emptyMessage}>
                    아직 스니펫이 없습니다. 새 스니펫을 작성해보세요!
                </p>
            ) : (
                <div className={styles.snippetGrid}>
                    {snippets.map((snippet: Snippet) => {
                        const codePreview =
                            snippet.code.split('\n').slice(0, 5).join('\n') +
                            (snippet.code.split('\n').length > 5
                                ? '\n...'
                                : '');

                        const highlightedCode = hljs.highlight(codePreview, {
                            language: snippet.language || 'plaintext',
                        }).value;

                        return (
                            <div
                                key={snippet.id}
                                className={styles.snippetCard}
                            >
                                <h3 className={styles.cardTitle}>
                                    {snippet.title}
                                </h3>

                                <pre className={styles.codePreviewWrapper}>
                                    <code
                                        className={`language-${
                                            snippet.language || 'plaintext'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: highlightedCode,
                                        }}
                                    />
                                </pre>
                                {snippet.description && (
                                    <p className={styles.cardDescription}>
                                        {snippet.description}
                                    </p>
                                )}
                                <div className={styles.cardMeta}>
                                    <span className={styles.languageBadge}>
                                        {snippet.language.toUpperCase()}
                                    </span>
                                    <span className={styles.cardDate}>
                                        {snippet.updatedAt
                                            ? new Date(
                                                  snippet.updatedAt
                                              ).toLocaleString()
                                            : '날짜 없음'}
                                    </span>
                                </div>
                                {/* <div className={styles.cardActions}>
                                    <button className={styles.editButton}>
                                        수정
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteSnippet(snippet.id!)
                                        }
                                        className={styles.deleteButton}
                                    >
                                        삭제
                                    </button>
                                </div> */}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
