import React from 'react';
import styles from './Section.module.css';

const Section = ({ title, children, open = true }) => {
  return (
    <details className={styles.section} open={open}>
      <summary className={styles.summary}>{title}</summary>
      <div className={styles.content}>
        {children}
      </div>
    </details>
  );
};

export default Section;