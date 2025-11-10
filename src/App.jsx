import React from 'react';
import { useResume } from './context/ResumeContext';
import HomePage from './pages/HomePage/HomePage';
import ResumeBuilderPage from './pages/ResumeBuilderPage/ResumeBuilderPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import styles from './App.module.css'; 

function App() {
  const { page } = useResume();

  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.mainContent}>
        {page === 'select' ? <HomePage /> : <ResumeBuilderPage />}
      </main>
      <Footer />
    </div>
  );
}

export default App;