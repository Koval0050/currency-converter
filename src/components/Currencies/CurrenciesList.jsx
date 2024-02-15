import { useState, memo } from 'react';
import { CURRENCIES } from 'constants/currencies';
import { CurrenciesListItem } from './CurrenciesListItem';
import { CurrenciesListStyle } from './CurrenciesListStyle';

export const CurrenciesList = memo(({ onClick, activeCurrency }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(activeCurrency);

  const handleItemClick = currency => {
    setSelectedCurrency(currency);
    onClick(currency);
  };

  return (
    <CurrenciesListStyle>
      {Object.keys(CURRENCIES).map(currency => (
        <CurrenciesListItem
          key={currency}
          currency={currency}
          isActive={currency === selectedCurrency}
          onClick={() => handleItemClick(currency)}
        />
      ))}
    </CurrenciesListStyle>
  );
});
