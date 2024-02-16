import css from './MoneyAmountInput.module.css';

export const MoneyAmountInput = ({ value, onInput }) => {
  const onChange = ({ target }) => {
    const newValue = target.value;
    if (newValue < 0) {
      onInput(0);
    }
    onInput(newValue);
  };
  return (
    <input
      className={css.MoneyAmountInput}
      type="number"
      value={value || 0}
      onChange={onChange}
      placeholder="0"
    />
  );
};
