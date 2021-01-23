import axios from 'axios';

const SET_COUNTRIES = 'SET_COUNTRIES';

const setCountries = (countries) => ({
  type: SET_COUNTRIES,
  countries,
});

export const fetchCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/countries');
      dispatch(setCountries(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

export default function countriesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COUNTRIES:
      return action.countries;
    default:
      return state;
  }
}
