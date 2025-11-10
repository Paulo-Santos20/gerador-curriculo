import React from 'react';
import styles from './FormTextarea.module.css';

const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 4, ...props }) => {
  return (
    <div className={styles.formGroup}>
      {label && <label htmlFor={name} className={styles.label}>{label}</label>}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.textarea}
        rows={rows}
        {...props}
      />
    </div>
  );
};

export default FormTextarea;