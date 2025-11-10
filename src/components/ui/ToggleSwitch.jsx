import React from 'react';
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = ({ label, name, checked, onChange }) => {
  return (
    <label htmlFor={name} className={styles.toggleWrapper}>
      <span className={styles.label}>{label}</span>
      <div className={styles.switchContainer}>
        <input
          type="checkbox"
          id={name}
          name={name}
          className={styles.input}
          checked={checked}
          onChange={onChange}
        />
        <span className={styles.slider}></span>
      </div>
    </label>
  );
};

export default ToggleSwitch;