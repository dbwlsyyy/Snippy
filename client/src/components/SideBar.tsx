import React from 'react';

import styles from './SideBar.module.css';

export default function SideBar() {
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.sidebarNavList}>
                <li className={styles.sidebarNavItem}>
                    <a href="#" className={styles.sidebarNavLink}>
                        📚 내 노트
                    </a>
                </li>
                <li className={styles.sidebarNavItem}>
                    <a href="#" className={styles.sidebarNavLink}>
                        💻 내 스니펫
                    </a>
                </li>
                <li className={styles.sidebarNavItem}>
                    <a href="#" className={styles.sidebarNavLink}>
                        🏷️ 태그 관리
                    </a>
                </li>
            </ul>
            <button
                className={styles.sidebarButton}
                onClick={() => alert('새 노트를 작성해 보세요!')}
            >
                ➕ 새 노트/스니펫 작성
            </button>
        </nav>
    );
}
