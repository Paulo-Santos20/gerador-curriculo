import React from 'react';
import styles from './FormColorInput.module.css';

const FormColorInput = ({ label, name, value, onChange, ...props }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type="color"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={styles.input}
          {...props}
        />
        {/* Mostra o valor hexadecimal */}
        <span className={styles.hexValue}>{value}</span>
      </div>
    </div>
  );
};

export default FormColorInput;