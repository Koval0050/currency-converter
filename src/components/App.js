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
  const [convertedAmountFrom, setConvertedAmountFrom] = useState(1);
  const [convertedAmountTo, setConvertedAmountTo] = useState();

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
      setConvertedAmountTo(usdCurrency.rate);
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
      return ((amount * fromRate) / toRate).toFixed(4);
    }
  };

  //Функції зміни валюти
  const handleFromCurrencyChange = currency => {
    setFromCurrency(currency);

    setConvertedAmountFrom(
      calculateConvertedAmount(convertedAmountFrom, fromCurrency, currency)
    );
  };

  const handleToCurrencyChange = currency => {
    setToCurrency(currency);

    setConvertedAmountTo(
      calculateConvertedAmount(convertedAmountTo, toCurrency, currency)
    );
  };

  //функції зміни суми у полях вводу
  const handleAmountInputChangeFrom = newValue => {
    setConvertedAmountFrom(
      calculateConvertedAmount(newValue, fromCurrency, toCurrency)
    );
    console.log('from: ', convertedAmountFrom);
  };
  const handleAmountInputChangeTo = newValue => {
    setConvertedAmountTo(
      calculateConvertedAmount(newValue, toCurrency, fromCurrency)
    );
    console.log('To: ', convertedAmountTo);
  };

  return (
    <div className="appContainer">
      <Container>
        <CurrenciesList
          onClick={handleFromCurrencyChange}
          activeCurrency={fromCurrency}
        />
        <MoneyAmountInput
          value={convertedAmountTo}
          onInput={handleAmountInputChangeFrom}
        />
      </Container>
      <Container>
        <CurrenciesList
          onClick={handleToCurrencyChange}
          activeCurrency={toCurrency}
        />
        <MoneyAmountInput
          value={convertedAmountFrom}
          onInput={handleAmountInputChangeTo}
        />
      </Container>
    </div>
  );
};
