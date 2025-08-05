import styles from './App.module.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import NewNote from './pages/NewNote';

function App() {
    return (
        <div className={styles.appContainer}>
            <Header />

            <div className={styles.mainContentArea}>
                <SideBar />
                <main className={styles.mainSection}>
                    {/* <Home /> */}
                    <NewNote />
                </main>
            </div>
        </div>
    );
}

export default App;
