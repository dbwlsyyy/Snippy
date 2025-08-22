import React, { useState } from 'react';
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
    setCode: (code: string) => void;
    setDescription: (description: string) => void;
};

export default function SnippetForm({
    language,
    setLanguage,
    setCode,
    setDescription,
}: Props) {
    const [versions, setVersions] = useState<Version[]>([
        { code: '', description: '' },
    ]);
    const [currentVersion, setCurrentVersion] = useState<number>(0);

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

    setCode(versions[0].code);
    setDescription(versions[0].description);

    return (
        <div className={styles.snippetForm}>
            <div className={styles.snippetArea}>
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

                <div className={styles.versionBar}>
                    {versions.map((_, i) => (
                        <button
                            key={i}
                            className={`${styles.versionBtn} ${
                                i === currentVersion ? styles.active : ''
                            }`}
                            onClick={() => setCurrentVersion(i)}
                        >
                            V{i + 1}
                        </button>
                    ))}
                    <button className={styles.addBtn} onClick={addNewVersion}>
                        + 새 버전
                    </button>
                </div>
            </div>
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
