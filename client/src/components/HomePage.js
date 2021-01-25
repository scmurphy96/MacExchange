import React from 'react';
import { connect } from 'react-redux';
import { fetchCountries } from '../store/countries';
import SelectCountry from './SelectCountry';
import Form from './Form';
// import Map from './ChoroplethMap';
import BubbleChart from './BubbleChart';
import { fetchExchangeRate } from '../store/exchanges';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      country: '',
      foreignPrice: 0,
      dollarPrice: 0,
      total: 0,
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    for (let i = 0; i < this.props.countries.length; i++) {
      if (this.props.countries[i].name === this.state.country) {
        await this.props.fetchExchangeRate(this.props.countries[i].currency);
        const foreign =
          Number(this.props.rate.exchangeRate) * this.state.amount;
        const dollarPrice =
          this.props.countries[i].price / Number(this.props.rate.exchangeRate);
        const result = 5.66 / dollarPrice;
        const total = result * Number(this.state.amount);
        this.setState({
          foreignPrice: foreign.toFixed(2),
          dollarPrice: dollarPrice.toFixed(2),
          total: total.toFixed(2),
          submitted: true,
        });
        // const divide =
        //   this.props.countries[52].price / this.props.countries[i].price;
        // const result = Number(this.state.amount) * divide;
        // this.setState({
        //   total: result.toFixed(2),
        // });
      }
    }
  }

  componentDidMount() {
    this.props.fetchCountries();
  }
  render() {
    return (
      <div>
        <div id="title">
          <h1>Welcome to MacExchange!</h1>
        </div>
        <Form
          amount={this.state.amount}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <SelectCountry
          countries={this.props.countries}
          handleChange={this.handleChange}
        />
        <div>
          {this.state.submitted === true ? (
            <h1>{`Based on the current exchange rate, $${this.state.amount} is worth ${this.state.foreignPrice} ${this.props.rate.currencyName}. Based on the difference in Big Mac prices, $${this.state.amount} in ${this.state.country} will be worth as much as $${this.state.total} in America`}</h1>
          ) : null}
        </div>
        <BubbleChart />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    countries: state.countriesReducer,
    rate: state.exchangeRateReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchExchangeRate: (currency) => dispatch(fetchExchangeRate(currency)),
  };
};

export default connect(mapState, mapDispatch)(HomePage);
