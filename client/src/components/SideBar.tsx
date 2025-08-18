import { useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';
import { TbArrowBarLeft, TbArrowBarRight } from 'react-icons/tb';
import {
    RiStickyNoteLine,
    RiCodeBlock,
    RiStarLine,
    RiPriceTag3Line,
    RiSettings3Line,
} from 'react-icons/ri';

import { useState } from 'react';

export default function SideBar() {
    const navigate = useNavigate();
    const [isFolded, setIsFolded] = useState<boolean>(false);

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
                    {icon} {label}
                </span>
            </li>
        );
    };

    return (
        <nav className={styles.sidebar}>
            <div
                className={styles.btnClose}
                onClick={() => setIsFolded((prev) => !prev)}
            >
                <TbArrowBarLeft />
            </div>
            <ul className={styles.sidebarNavList}>
                <ItemComponent
                    icon={<RiStickyNoteLine />}
                    label="내 노트"
                    to="/notes"
                />
                <ItemComponent
                    icon={<RiCodeBlock />}
                    label="내 스니펫"
                    to="/snippets"
                />
                <ItemComponent
                    icon={<RiStarLine />}
                    label="즐겨찾기"
                    to="/likes"
                />
                <ItemComponent
                    icon={<RiPriceTag3Line />}
                    label="태그 관리"
                    to="/tags"
                />
                <ItemComponent
                    icon={<RiSettings3Line />}
                    label="세팅"
                    to="/settings"
                />
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
