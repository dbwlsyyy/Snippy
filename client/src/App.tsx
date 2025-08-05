import { BrowserRouter } from 'react-router-dom';
import styles from './App.module.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import AppRoutes from './routes/AppRoutes';

function App() {
    return (
        <BrowserRouter>
            <div className={styles.appContainer}>
                <Header />

                <div className={styles.mainContentArea}>
                    <SideBar />
                    <main className={styles.mainSection}>
                        <AppRoutes />
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
