import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>Gerador de Currículo</h1>
      </div>
    </header>
  );
};

export default Header;