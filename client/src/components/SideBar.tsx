import { useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';

export default function SideBar() {
    const navigate = useNavigate();

    return (
        <nav className={styles.sidebar}>
            <ul className={styles.sidebarNavList}>
                <li className={styles.sidebarNavItem}>
                    <span
                        className={styles.sidebarNavLink}
                        onClick={() => navigate('/notes')}
                    >
                        📚 내 노트
                    </span>
                </li>
                <li className={styles.sidebarNavItem}>
                    <span
                        className={styles.sidebarNavLink}
                        onClick={() => navigate('/snippets')}
                    >
                        💻 내 스니펫
                    </span>
                </li>
                <li className={styles.sidebarNavItem}>
                    <span
                        className={styles.sidebarNavLink}
                        onClick={() => navigate('/likes')}
                    >
                        ⭐️ 즐겨찾기
                    </span>
                </li>
                <li className={styles.sidebarNavItem}>
                    <span
                        className={styles.sidebarNavLink}
                        onClick={() => navigate('/tags')}
                    >
                        🏷️ 태그 관리
                    </span>
                </li>
                <li className={styles.sidebarNavItem}>
                    <span
                        className={styles.sidebarNavLink}
                        onClick={() => navigate('/settings')}
                    >
                        ⚙️ 세팅
                    </span>
                </li>
            </ul>
            <button
                className={styles.btnNewNote}
                onClick={() => navigate('/new')}
            >
                ➕ 새 노트 / 스니펫 작성
            </button>
        </nav>
    );
}
