import React from 'react';
import styles from './BtnCRUD.module.css';

interface Props {
    type: '저장' | '수정' | '삭제' | '취소';
    onClick: () => void;
}
const btnClassMap: Record<Props['type'], string> = {
    저장: 'btnSave',
    수정: 'btnUpdate',
    삭제: 'btnDelete',
    취소: 'btnCancel',
};

function BtnCRUD({ type, onClick }: Props) {
    return (
        <button onClick={onClick} className={styles[btnClassMap[type]]}>
            {type}
        </button>
    );
}

export default BtnCRUD;
