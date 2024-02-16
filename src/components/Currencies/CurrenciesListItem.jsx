export const CurrenciesListItem = ({ currency, onClick, isActive }) => (
  <li
    className={`CurrenciesListItem ${isActive ? 'active' : ''}`}
    onClick={() => {
      onClick(currency);
    }}
  >
    {currency}
  </li>
);
