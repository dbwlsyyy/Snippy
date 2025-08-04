import React from 'react';
import styles from './Header.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineLightMode } from 'react-icons/md';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <h1 className={styles.headerTitle}>✍️ Snippy</h1>
            </div>
            <div className={styles.headerRight}>
                <FaUserCircle size="27" />
                <MdOutlineLightMode size="27" />
            </div>
        </header>
    );
}

export default Header;
