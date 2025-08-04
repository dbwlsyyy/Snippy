import styles from './App.module.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Home from './pages/Home';

function App() {
    return (
        <div className={styles.appContainer}>
            <Header />

            <div className={styles.mainContentArea}>
                <SideBar />
                <Home />
            </div>
        </div>
    );
}

export default App;
