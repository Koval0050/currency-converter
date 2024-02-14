import React, { useState, useEffect } from 'react';
import css from './MoneyAmountInput.module.css';

export const MoneyAmountInput = ({ id, value, onInput }) => {
  const [inputValue, setInputValue] = useState(value || 0);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInput = event => {
    const newValue = event.target.value;
    if (newValue < 0) {
      setInputValue(0);
      onInput(0, id);
      return;
    }
    setInputValue(newValue);
    onInput(newValue, id);
  };

  return (
    <input
      className={css.MoneyAmountInput}
      type="number"
      value={inputValue}
      onChange={handleInput}
      placeholder="0"
    />
  );
};
