import React, { useState } from 'react';
import styles from './Header.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineLightMode } from 'react-icons/md';
import { IoMdCodeWorking } from 'react-icons/io';
import { TbSearch } from 'react-icons/tb';

function Header() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <h1 className={styles.headerTitle}>
                    <IoMdCodeWorking size="42" />
                    Snippy
                </h1>
            </div>
            <div className={styles.headerSearch}>
                <input
                    className={styles.input}
                    id="ph"
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder=""
                />
                <label htmlFor="ph" className={styles.label}>
                    Search your code
                </label>
                <button className={styles.btn} type="button">
                    <TbSearch size="20" />
                </button>
            </div>
            <div className={styles.headerRight}>
                <FaUserCircle size="27" />
                <MdOutlineLightMode size="27" />
            </div>
        </header>
    );
}

export default Header;
