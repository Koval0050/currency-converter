import React, { useState } from 'react';
import css from './MoneyAmountInput.module.css';

export const MoneyAmountInput = () => {
  const [value, setValue] = useState();

  const handleInput = event => {
    setValue(event.target.value);
  };

  if (value < 0) {
    setValue(0);
  }

  return (
    <input
      className={css.MoneyAmountInput}
      type="number"
      value={value}
      onInput={handleInput}
      placeholder="0"
    />
  );
};
