export const CurrenciesListItem = ({ currency, click, active }) => {
  return (
    <li
      className={`CurrenciesListItem ${active ? 'active' : ''}`}
      onClick={click}
    >
      {currency}
    </li>
  );
};
