import React from 'react';
import styles from './FormInput.module.css';

const FormInput = ({ label, name, value, onChange, placeholder, ...props }) => {
  return (
    <div className={styles.formGroup}>
      {label && <label htmlFor={name} className={styles.label}>{label}</label>}
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        {...props}
      />
    </div>
  );
};

export default FormInput;