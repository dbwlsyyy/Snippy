import React from 'react';
import styles from './Home.module.css';

export default function Home() {
    return (
        <main className={styles.mainSection}>
            <h2 className={styles.welcomeHeading}>
                🚀 Welcome to Your Dev Note, Snippy!
            </h2>
            <p className={styles.welcomeText}>
                이곳에 당신만의 소중한 개발 노하우와 코드 스니펫들이 멋지게
                정리될 거예요.
                <br />
                왼쪽 사이드바에서 메뉴를 선택하거나, 새로운 노트를 작성해
                보세요!
            </p>
            <div className={styles.exampleCard}>
                <h3 className={styles.cardTitle}>첫 번째 노트 작성 팁!</h3>
                <p className={styles.cardContent}>
                    시작이 반입니다. 오늘 배운 새로운 개념이나 코드 조각을 바로
                    기록해보세요! Markdown 문법을 사용해서 코드 블록이나 목록을
                    깔끔하게 정리할 수 있습니다.
                </p>
            </div>
        </main>
    );
}
