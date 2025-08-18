import { BrowserRouter } from 'react-router-dom';
import styles from './App.module.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import AppRoutes from './routes/AppRoutes';
import { useState } from 'react';

function App() {
    // 왜 브라우저 라우터 위치를 여기에?
    const [isFolded, setIsFolded] = useState<boolean>(false);
    const sidebarWidth = isFolded ? '5rem' : '25rem';
    return (
        <BrowserRouter>
            <div className={styles.appContainer}>
                <Header />

                <div
                    className={styles.mainContentArea}
                    style={
                        {
                            '--sidebar-current-width': sidebarWidth,
                        } as React.CSSProperties
                    }
                >
                    <SideBar isFolded={isFolded} setIsFolded={setIsFolded} />
                    <main className={styles.mainSection}>
                        <AppRoutes />
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
