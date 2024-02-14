import { useEffect, useState } from 'react';
import { getCurrencies } from 'api/getCurrencies';
import { CURRENCIES } from 'constants/currencies';

import { CurrenciesList } from './Currencies/CurrenciesList';
import { MoneyAmountInput } from './MoneyAmountInput/MoneyAmountInput';
import { Container } from './Container/Container';

import './index.css';

export const App = () => {
  const [currencyData, setCurrencyData] = useState([]);
  const [activeCurrencyFrom, setActiveCurrencyFrom] = useState('UAH');
  const [activeCurrencyTo, setActiveCurrencyTo] = useState('USD');
  const [convertedAmountFrom, setConvertedAmountFrom] = useState(1);
  const [convertedAmountTo, setConvertedAmountTo] = useState(38.1264);

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

  const getExchangeRate = currencyCode => {
    const currency = currencyData.find(item => item.cc === currencyCode);
    return currency ? currency.rate : 1;
  };

  const calculateConvertedAmount = (amount, fromCurrency, toCurrency) => {
    const fromRate = getExchangeRate(fromCurrency);
    const toRate = getExchangeRate(toCurrency);
    console.log('fromRate - ', fromRate);
    console.log('toRate - ', toRate);
    if (fromCurrency === 'UAH') {
      const amountUAH = amount / toRate;
      return amountUAH.toFixed(4);
    } else {
      const result = (amount * fromRate) / toRate;
      return result.toFixed(4);
    }
  };

  const handleCurrencyChange = (currency, listType) => {
    if (listType === 'from') {
      setActiveCurrencyFrom(currency);
      setConvertedAmountFrom(
        calculateConvertedAmount(
          convertedAmountFrom,
          activeCurrencyTo,
          currency
        )
      );
    } else if (listType === 'to') {
      setActiveCurrencyTo(currency);
      setConvertedAmountTo(
        calculateConvertedAmount(
          convertedAmountTo,
          activeCurrencyFrom,
          currency
        )
      );
    }
  };

  const handleAmountInputChange = (newValue, inputId) => {
    if (inputId === 'amountFrom') {
      setConvertedAmountFrom(newValue);
      setConvertedAmountFrom(
        calculateConvertedAmount(newValue, activeCurrencyFrom, activeCurrencyTo)
      );
    } else if (inputId === 'amountTo') {
      setConvertedAmountTo(newValue);

      setConvertedAmountTo(
        calculateConvertedAmount(newValue, activeCurrencyTo, activeCurrencyFrom)
      );
    }
  };

  return (
    <div className="appContainer">
      <Container>
        <CurrenciesList
          onItemClick={currency => handleCurrencyChange(currency, 'from')}
          activeCurrency={activeCurrencyFrom}
        />
        <MoneyAmountInput
          id="amountFrom"
          value={convertedAmountTo}
          onInput={newValue => handleAmountInputChange(newValue, 'amountFrom')}
        />
      </Container>
      <Container>
        <CurrenciesList
          onItemClick={currency => handleCurrencyChange(currency, 'to')}
          activeCurrency={activeCurrencyTo}
        />
        <MoneyAmountInput
          id="amountTo"
          value={convertedAmountFrom}
          onInput={newValue => handleAmountInputChange(newValue, 'amountTo')}
        />
      </Container>
    </div>
  );
};
