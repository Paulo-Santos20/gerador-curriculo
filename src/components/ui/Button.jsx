import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary', ...props }) => {
  // Mapeia variantes para classes CSS
  const variantClass = {
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger,
    success: styles.success
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${variantClass}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;