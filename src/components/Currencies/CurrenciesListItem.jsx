import React from 'react';
import css from './CurrenciesList.module.css';

export const CurrenciesListItem = ({ currency, active, onClick }) => {
  const handleClick = () => {
    onClick(currency);
  };

  return (
    <li
      className={`${css.CurrenciesListItem} ${active ? css.active : ''}`}
      onClick={handleClick}
    >
      {currency}
    </li>
  );
};
