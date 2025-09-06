import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';

// Ace 모드 & 테마 불러오기
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/mode-tsx';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-json';

import 'ace-builds/src-noconflict/theme-github_dark';

import styles from './SnippetForm.module.css';

type Version = {
    code: string;
    description: string;
};

type Props = {
    language: string;
    setLanguage: (lang: string) => void;
    code: string; // 현재 코드 값
    setCode: (code: string) => void;
    description: string;
    setDescription: (description: string) => void;
};

export default function SnippetForm({
    language,
    setLanguage,
    code,
    setCode,
    description,
    setDescription,
}: Props) {
    const [versions, setVersions] = useState<Version[]>([
        { code: '', description: '' },
    ]);
    const [currentVersion, setCurrentVersion] = useState<number>(0);

    useEffect(() => {
        // 컴포넌트 마운트 시, 또는 NewNote의 code/description이 변경될 때
        // (즉, 수정 모드로 진입하여 기존 스니펫 데이터를 불러올 때)
        // versions 배열이 비어있거나, 첫 버전의 코드가 현재 props.code와 다를 때만 초기화
        if (
            versions.length === 0 ||
            versions[0].code !== code ||
            versions[0].description !== description
        ) {
            setVersions([{ code: code, description: description }]);
            setCurrentVersion(0);
        }
    }, [code, description]);

    // ✨✨✨ 문제 해결의 핵심! useEffect로 부모 상태 업데이트 분리 ✨✨✨
    // 이펙트 2: SnippetForm 내부의 버전이 변경될 때 부모(NewNote)의 code/description 상태를 업데이트
    useEffect(() => {
        // versions 배열과 currentVersion이 변경될 때마다 부모의 상태를 업데이트
        if (versions.length > 0) {
            setCode(versions[currentVersion].code);
            setDescription(versions[currentVersion].description);
        }
    }, [versions, currentVersion, setCode, setDescription]);

    const updateCurrentVersion = (
        field: 'code' | 'description',
        value: string
    ) => {
        const updated = [...versions];
        updated[currentVersion] = {
            ...updated[currentVersion],
            [field]: value,
        };
        setVersions(updated);
    };

    const addNewVersion = () => {
        setVersions([...versions, { code: '', description: '' }]);
        setCurrentVersion(versions.length);
    };

    return (
        <div className={styles.snippetForm}>
            <div className={styles.snippetArea}>
                {/* 코드 에디터 */}
                <div className={styles.editorWrapper}>
                    <AceEditor
                        mode={language}
                        theme="github_dark"
                        name="snippet_editor"
                        value={versions[currentVersion].code}
                        onChange={(val) => updateCurrentVersion('code', val)}
                        width="100%"
                        height="300px"
                        fontSize={13}
                        showPrintMargin={false}
                        showGutter={true}
                        highlightActiveLine={true}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                    />
                </div>

                {/* 오른쪽 패널 */}
                <div className={styles.sidePanel}>
                    <div className={styles.field}>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className={styles.select}
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="typescript">TypeScript</option>
                            <option value="jsx">JSX</option>
                            <option value="tsx">TSX</option>
                            <option value="xml">HTML</option>
                            <option value="css">CSS</option>
                            <option value="json">JSON</option>
                        </select>
                    </div>

                    <div className={styles.versionPanel}>
                        <div className={styles.versionList}>
                            {versions.map((_, i) => (
                                <button
                                    key={i}
                                    className={`${styles.versionBtn} ${
                                        i === currentVersion
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() => setCurrentVersion(i)}
                                >
                                    V{i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            className={styles.addBtn}
                            onClick={addNewVersion}
                        >
                            + 새 버전
                        </button>
                    </div>
                </div>
            </div>

            {/* 설명 */}
            <div className={styles.field}>
                <textarea
                    className={styles.textarea}
                    value={versions[currentVersion].description}
                    onChange={(e) =>
                        updateCurrentVersion('description', e.target.value)
                    }
                    placeholder="이 버전의 특징이나 개선점을 기록하세요."
                    rows={3}
                />
            </div>
        </div>
    );
}
