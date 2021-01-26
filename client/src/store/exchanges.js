import axios from 'axios';

const SET_EXCHANGE = 'SET_EXCHANGE';

const setExchange = (exchangeRate, currencyName) => ({
  type: SET_EXCHANGE,
  exchangeRate,
  currencyName,
});

export const fetchExchangeRate = (currency) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/exchanges/${currency}`);
      console.log(data);
      const exchangeRate =
        data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      const currencyName =
        data['Realtime Currency Exchange Rate']['4. To_Currency Name'];
      dispatch(setExchange(exchangeRate, currencyName));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {
  exchangeRate: '',
  currencyName: '',
};

export default function exchangeRateReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXCHANGE:
      return {
        ...state,
        exchangeRate: action.exchangeRate,
        currencyName: action.currencyName,
      };
    default:
      return state;
  }
}
