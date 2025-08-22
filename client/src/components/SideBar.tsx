import { useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';
import { TbArrowBarLeft, TbArrowBarRight } from 'react-icons/tb';
import {
    RiStickyNoteLine,
    RiCodeBoxLine,
    RiStarLine,
    RiPriceTag3Line,
    RiSettings3Line,
} from 'react-icons/ri';

interface SideBarProps {
    isFolded: boolean;
    setIsFolded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBar({ isFolded, setIsFolded }: SideBarProps) {
    const navigate = useNavigate();
    const svgSize = isFolded ? '2.3rem' : '2rem';

    interface SidebarItemProps {
        icon: React.ReactNode;
        label: string;
        to: string;
    }

    const ItemComponent = ({ icon, label, to }: SidebarItemProps) => {
        return (
            <li className={styles.sidebarNavItem}>
                <span
                    className={styles.sidebarNavLink}
                    onClick={() => navigate(to)}
                >
                    {icon}
                    <span className={styles.label}>{!isFolded && label}</span>
                </span>
            </li>
        );
    };

    return (
        <nav className={`${styles.sidebar} ${isFolded ? styles.folded : ''}`}>
            <button
                className={styles.btnToggle}
                onClick={() => setIsFolded((prev) => !prev)}
            >
                {isFolded ? <TbArrowBarRight /> : <TbArrowBarLeft />}
            </button>
            <ul className={styles.sidebarNavList}>
                <ItemComponent
                    icon={<RiStickyNoteLine size={svgSize} />}
                    label="내 노트"
                    to="/notes"
                />
                <ItemComponent
                    icon={<RiCodeBoxLine size={svgSize} />}
                    label="내 스니펫"
                    to="/snippets"
                />
                <ItemComponent
                    icon={<RiStarLine size={svgSize} />}
                    label="즐겨찾기"
                    to="/likes"
                />
                <ItemComponent
                    icon={<RiPriceTag3Line size={svgSize} />}
                    label="태그 관리"
                    to="/tags"
                />
                <ItemComponent
                    icon={<RiSettings3Line size={svgSize} />}
                    label="세팅"
                    to="/settings"
                />
            </ul>
            <button
                className={styles.btnNewNote}
                onClick={() => navigate('/new')}
            >
                ➕
                <span className={styles.label}>
                    {!isFolded && '새 노트 / 스니펫 작성'}
                </span>
            </button>
        </nav>
    );
}
