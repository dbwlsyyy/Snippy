import styles from './SideBar.module.css';

export default function SideBar() {
    const handleClick = () => {
        //
    };

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
                        ⭐️ 즐겨찾기
                    </a>
                </li>
                <li className={styles.sidebarNavItem}>
                    <a href="#" className={styles.sidebarNavLink}>
                        🏷️ 태그 관리
                    </a>
                </li>
                <li className={styles.sidebarNavItem}>
                    <a href="#" className={styles.sidebarNavLink}>
                        ⚙️ 세팅
                    </a>
                </li>
            </ul>
            <button className={styles.sidebarButton} onClick={handleClick}>
                ➕ 새 노트/스니펫 작성
            </button>
        </nav>
    );
}
