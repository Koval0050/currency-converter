import React, { useState } from 'react';
import { CURRENCIES } from 'constants/currencies';
import { CurrenciesListItem } from './CurrenciesListItem';
import { CurrenciesListStyle } from './CurrenciesListStyle';

export const CurrenciesList = ({ onItemClick, activeCurrency }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(activeCurrency);

  const handleItemClick = currency => {
    setSelectedCurrency(currency);
    onItemClick(currency);
  };

  return (
    <CurrenciesListStyle>
      {Object.keys(CURRENCIES).map(currency => {
        return (
          <CurrenciesListItem
            key={currency}
            currency={currency}
            active={currency === selectedCurrency}
            click={() => handleItemClick(currency)}
          />
        );
      })}
    </CurrenciesListStyle>
  );
};
