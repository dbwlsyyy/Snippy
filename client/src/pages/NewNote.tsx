import React, { useEffect } from 'react';
import styles from './NewNote.module.css';
import { db } from '../api/db';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BtnCRUD from '../components/common/BtnCRUD';
import { useLiveQuery } from 'dexie-react-hooks';
import NoteForm from '../components/forms/NoteForm';
import SnippetForm from '../components/forms/SnippetForm';
import useNoteForm from '../hooks/useNoteForm';
import { saveNote, saveSnippet } from '../services/dbServices';

export default function NewNote() {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const itemId = id ? Number(id) : NaN;

    const { pathname } = useLocation();
    const isNoteEditRoute = pathname.includes('/note/edit/');
    const isSnippetEditRoute = pathname.includes('/snippet/edit/');

    const {
        title,
        setTitle,
        tags,
        setTags,
        noteContent,
        setNoteContent,
        language,
        setLanguage,
        description,
        setDescription,
        code,
        setCode,
        mode,
        setMode,
        isNoteMode,
        resetForm,
    } = useNoteForm(isNoteEditRoute ? 'note' : 'snippet');

    const isEditMode =
        !isNaN(itemId) && (isNoteEditRoute || isSnippetEditRoute);

    const newNoteId = useLiveQuery<number | undefined>(() => {
        if (isEditMode) return undefined;
        return db.notes.count().then((count) => count + 1);
    }, [isEditMode]);

    const newSnippetId = useLiveQuery<number>(() => {
        return db.snippets.count().then((count) => count + 1);
    }, []);

    const dataToEdit = useLiveQuery(
        async () => {
            // 1. 수정 모드가 아니거나 itemId가 유효하지 않으면 쿼리하지 않음
            if (!isEditMode || isNaN(itemId)) {
                return undefined;
            }
            // 2. URL 경로에 따라 Note 또는 Snippet 데이터를 가져온다.
            if (isNoteEditRoute) {
                return await db.notes.get(itemId);
            } else if (isSnippetEditRoute) {
                return await db.snippets.get(itemId);
            }
            // 3. 타입이 명확하지 않은 edit 경로일 경우
            return undefined;
        },
        [itemId, isEditMode, isNoteEditRoute, isSnippetEditRoute] // 의존성 배열
    );
    useEffect(() => {
        // 1. 새 아이템 생성 모드일 때 (폼 초기화)
        if (!isEditMode) {
            resetForm(); // 새 아이템 생성 시 기본 모드는 노트
        }
        // 2. 수정 모드이고, 데이터를 성공적으로 가져왔을 때 (폼 채우기)
        else if (dataToEdit) {
            // dataToEdit이 undefined(로딩중)이 아니고, null(데이터없음)도 아닐 때
            setTitle(dataToEdit.title);
            setTags([...dataToEdit.tags]);
            setMode('snippet'); // UI 모드를 스니펫으로 설정
            console.log(dataToEdit);

            // 가져온 데이터의 타입에 따라 필드를 채움
            if ('content' in dataToEdit) {
                // 불러온 아이템이 Note 타입일 경우
                setNoteContent(dataToEdit.content || '');
                setCode('');
                setLanguage('plaintext');
                setMode('note'); // UI 모드를 노트로 설정
            } else if ('code' in dataToEdit) {
                // 불러온 아이템이 Snippet 타입일 경우
                setCode(dataToEdit.code || '');
                setLanguage(dataToEdit.language || 'plaintext');
                setNoteContent('');
                setDescription(dataToEdit.description || '');
            }
        }
        // 3. 수정 모드이나 dataToEdit이 undefined/null일 때 (로딩 중이거나 데이터 없음)
        // 이 경우는 로딩/찾을 수 없음 메시지를 띄우므로 별도의 필드 조작은 하지 않음
    }, [isEditMode, dataToEdit, isNoteEditRoute, isSnippetEditRoute]);

    const handleMode = () => {
        setMode(isNoteMode ? 'snippet' : 'note');
    };

    const handleSave = async () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        try {
            if (isNoteMode) {
                await saveNote({
                    id: itemId,
                    title,
                    tags,
                    content: noteContent,
                    isEditMode,
                });
                navigate('/notes');
            } else {
                await saveSnippet({
                    id: itemId,
                    title,
                    tags,
                    code,
                    language,
                    description,
                    isEditMode,
                });
                navigate('/snippets');
            }
        } catch (err) {
            console.error('DB 저장 실패:', err);
            alert(
                `저장 실패: ${err instanceof Error ? err.message : String(err)}`
            );
        }
    };

    const handleCancel = () => {
        if (window.confirm('작성을 취소하시겠습니까?')) {
            if (isEditMode) {
                navigate(isNoteMode ? `/note/${itemId}` : `/snippet/${itemId}`);
            } else {
                setTitle('');
                setTags([]);
                setNoteContent('');
                setCode(''); //추가
                setDescription(''); //추가
                navigate('/');
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    {isEditMode ? (
                        <span className={styles.editMsg}>수정 중 ...</span>
                    ) : (
                        <h2 className={styles.headerNumber}>
                            {isNoteMode
                                ? `# ${newNoteId}`
                                : `# ${newSnippetId}`}
                        </h2>
                    )}
                    <div className={styles.headerbtn}>
                        <BtnCRUD type="저장" onClick={handleSave} />
                        <BtnCRUD type="취소" onClick={handleCancel} />
                        {isEditMode ? (
                            ''
                        ) : (
                            <button
                                onClick={handleMode}
                                className={styles.btnMode}
                            >
                                {isNoteMode
                                    ? '스니펫 모드로 전환'
                                    : '노트 모드로 전환'}
                            </button>
                        )}
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
                        code={code}
                        setCode={setCode}
                        description={description}
                        setDescription={setDescription}
                    />
                )}
            </div>
        </div>
    );
}
