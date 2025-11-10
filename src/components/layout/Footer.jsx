import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Gerador de Currículo. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;