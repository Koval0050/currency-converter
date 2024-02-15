import { useState, useEffect, memo } from 'react';
import css from './MoneyAmountInput.module.css';

export const MoneyAmountInput = memo(({ value, onInput }) => {
  const [inputValue, setInputValue] = useState(value || 1);
  useEffect(() => {
    console.log('value: ', value);
    setInputValue(value || 1);
  }, [value]);

  const onChange = ({ target }) => {
    let newValue = target.value;
    if (newValue < 0) {
      newValue = 0;
    }
    setInputValue(newValue);
    onInput(newValue);
  };

  return (
    <input
      className={css.MoneyAmountInput}
      type="number"
      value={inputValue}
      onChange={onChange}
      placeholder="0"
    />
  );
});

// export const MoneyAmountInput = memo(({ value, onInput }) => {
//   const onChange = ({ target }) => {
//     const newValue = target.value;
//     onInput(newValue);
//   };

//   return (
//     <input
//       className={css.MoneyAmountInput}
//       type="number"
//       defaultValue={value}
//       onChange={onChange}
//       placeholder="0"
//     />
//   );
// });
