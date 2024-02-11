import React from 'react';
import css from './CurrenciesList.module.css';
import { CURRENCIES } from 'constants/currencies';
import { CurrenciesListItem } from './CurrenciesListItem';

export const CurrenciesList = ({ active, onClick }) => {
  const handleCurrencyClick = currency => {
    onClick(currency);
  };

  return (
    <ul className={css.CurrenciesList}>
      {Object.keys(CURRENCIES).map(currency => {
        if (currency !== 'UAH') {
          return (
            <CurrenciesListItem
              key={currency}
              currency={currency}
              onClick={() => handleCurrencyClick(currency)}
              active={currency === active}
            />
          );
        }
        return null;
      })}
    </ul>
  );
};
