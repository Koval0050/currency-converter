import { CURRENCIES } from 'constants/currencies';
import { CurrenciesListItem } from './CurrenciesListItem';
import { CurrenciesListStyle } from './CurrenciesListStyle';

export const CurrenciesList = ({ onClick, activeCurrency }) => {
  return (
    <CurrenciesListStyle>
      {Object.values(CURRENCIES).map(currency => (
        <CurrenciesListItem
          key={currency}
          currency={currency}
          isActive={currency === activeCurrency}
          onClick={onClick}
        />
      ))}
    </CurrenciesListStyle>
  );
};
