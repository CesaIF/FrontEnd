import styles from './Input.module.css';
import React from 'react';
import { IMaskInput } from 'react-imask';

export default function Ginput({
  label,
  placeholder,
  type,
  maxLength,
  id,
  htmlFor,
  value,
  onChange,
  mask
}) {
  const handleAccept = (val) => {
    // Simula o evento padrão para funcionar com setState do React
    onChange({ target: { value: val } });
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={htmlFor} className={styles.label}>{label}</label>

      {mask ? (
        <IMaskInput
          mask={mask}
          value={value}
          onAccept={handleAccept}
          unmask={true}
          id={id}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          className={styles.input}
        />
      ) : (
        <input
          value={value}
          id={id}
          maxLength={maxLength}
          type={type}
          placeholder={placeholder}
          className={styles.input}
          onChange={onChange}
        />
      )}
    </div>
  );
}
