import React from 'react';
import styles from './Select.module.css';

const Select = ({ label, name, value, onChange, children, ...props }) => {
  return (
    <div className={styles.formGroup}>
      {label && <label htmlFor={name} className={styles.label}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.select}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;