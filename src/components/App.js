import React, { useEffect, useState } from 'react';
import { getCurrencies } from 'api/getCurrencies';
import { CURRENCIES } from 'constants/currencies';

import { CurrenciesList } from './Currencies/CurrenciesList';
import { MoneyAmountInput } from './MoneyAmountInput/MoneyAmountInput';
import { Container } from './Container/Container';

export const App = () => {
  const [currencyData, setCurrencyData] = useState([]);
  const [currencyActive1, setCurrencyActive1] = useState('USD'); // Перший компонент
  const [currencyActive2, setCurrencyActive2] = useState('USD'); // Другий компонент

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getCurrencies();
      const filteredData = fetchedData.data.filter(
        currency => CURRENCIES[currency.cc]
      );
      setCurrencyData(filteredData);
    };
    fetchData();
  }, []);
  console.log(currencyData); ///////////////////////////////////

  const handleCurrencyClick1 = cc => {
    setCurrencyActive1(cc);
  };

  const handleCurrencyClick2 = cc => {
    setCurrencyActive2(cc);
  };

  return (
    <div>
      <h1>Конвертор валют</h1>
      <Container>
        <CurrenciesList
          active={currencyActive1}
          onClick={handleCurrencyClick1}
        />
        <MoneyAmountInput />
      </Container>
      <Container>
        <CurrenciesList
          active={currencyActive2}
          onClick={handleCurrencyClick2}
        />
        <MoneyAmountInput />
      </Container>
    </div>
  );
};
