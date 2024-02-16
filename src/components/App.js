import { useEffect, useState } from 'react';
import { getCurrencies } from 'api/getCurrencies';
import { CURRENCIES } from 'constants/currencies';

import { CurrenciesList } from './Currencies/CurrenciesList';
import { MoneyAmountInput } from './MoneyAmountInput/MoneyAmountInput';
import { Container } from './Container';

import './index.css';

export const App = () => {
  const [currencies, setCurrencies] = useState([]);

  const [fromCurrency, setFromCurrency] = useState(CURRENCIES.UAH);
  const [toCurrency, setToCurrency] = useState(CURRENCIES.USD);
  const [convertedAmountFrom, setConvertedAmountFrom] = useState();
  const [convertedAmountTo, setConvertedAmountTo] = useState(1);

  //отримуємо курси валют
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getCurrencies();
        const filteredData = fetchedData.data.filter(
          currency => CURRENCIES[currency.cc]
        );
        setCurrencies(filteredData);
      } catch (error) {
        console.error('Помилка під час отримання даних:', error);
      }
    };
    fetchData();
  }, []);

  //встановлюємо значення курсу долара за замовчуванням
  useEffect(() => {
    const usdCurrency = currencies.find(
      currency => currency.cc === CURRENCIES.USD
    );
    if (usdCurrency) {
      setConvertedAmountFrom(usdCurrency.rate);
    }
  }, [currencies]);

  //отримуємо курс валюти яку обрали
  const getExchangeRate = currencyCode => {
    const currency = currencies.find(item => item.cc === currencyCode);
    return currency ? currency.rate : 1;
  };

  //функція конвертації
  const calculateConvertedAmount = (amount, fromCurrency, toCurrency) => {
    const fromRate = getExchangeRate(fromCurrency);
    const toRate = getExchangeRate(toCurrency);

    if (fromCurrency === CURRENCIES.UAH) {
      return (amount / toRate).toFixed(4);
    } else {
      
      console.log('amount', amount);
      console.log('fromRate', fromRate);
      console.log('toRate', toRate);

      return ((amount * fromRate) / toRate).toFixed(4);
    }
  };

  //Функції зміни валюти
  const handleFromCurrencyChange = currency => {
    setFromCurrency(currency);
    const amount = calculateConvertedAmount(
      convertedAmountFrom,
      currency,
      toCurrency
    );
    setConvertedAmountTo(amount);
  };

  const handleToCurrencyChange = currency => {
    setToCurrency(currency);
    const amount = calculateConvertedAmount(
      convertedAmountFrom,
      fromCurrency,
      currency
    );

    setConvertedAmountTo(amount);
  };

  //функції зміни суми у полях вводу
  const handleAmountInputChangeFrom = newValue => {
    setConvertedAmountFrom(newValue);
    const amount = calculateConvertedAmount(newValue, fromCurrency, toCurrency);
    setConvertedAmountTo(amount);
  };
  const handleAmountInputChangeTo = newValue => {
    setConvertedAmountTo(newValue);
    const amount = calculateConvertedAmount(newValue, toCurrency, fromCurrency);
    setConvertedAmountFrom(amount);
  };

  return (
    <div className="appContainer">
      <Container>
        <CurrenciesList
          onClick={handleFromCurrencyChange}
          activeCurrency={fromCurrency}
        />
        <MoneyAmountInput
          value={convertedAmountFrom}
          onInput={handleAmountInputChangeFrom}
        />
      </Container>
      <Container>
        <CurrenciesList
          onClick={handleToCurrencyChange}
          activeCurrency={toCurrency}
        />
        <MoneyAmountInput
          value={convertedAmountTo}
          onInput={handleAmountInputChangeTo}
        />
      </Container>
    </div>
  );
};
