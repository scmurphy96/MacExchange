import React from 'react';
import { connect } from 'react-redux';
import { fetchCountries } from '../store/countries';
import SelectCountry from './SelectCountry';
import Form from './Form';
import BubbleChart from './BubbleChart';
import { fetchExchangeRate } from '../store/exchanges';
import Button from 'react-bootstrap/Button';

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
      submitted: false,
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
        <div className="wrapper">
          <div className="section parallax">
            <h1 id="title">MacExchange</h1>
          </div>
          <div className="content">
            <p id="test">
              "The big mac index was invented by The Economist in 1986 as a
              lighthearted guide to whether currencies are at their “correct”
              level. It is based on the theory of purchasing-power parity (PPP),
              the notion that in the long run exchange rates should move towards
              the rate that would equalise the prices of an identical basket of
              goods and services (in this case, a burger) in any two countries.
              Burgernomics was never intended as a precise gauge of currency
              misalignment, merely a tool to make exchange-rate theory more
              digestible. Yet the Big Mac index has become a global standard,
              included in several economic textbooks and the subject of dozens
              of academic studies. For those who take their fast food more
              seriously, we also calculate a gourmet version of the index."
            </p>
          </div>
          <div className="forms">
            <div id="form-header">
              <h1>Calculate Currency</h1>
            </div>
            <br></br>
            <div id="form-select">
              <Form
                amount={this.state.amount}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
              <SelectCountry
                countries={this.props.countries}
                handleChange={this.handleChange}
              />
            </div>
            <br></br>
            <div id="calculate">
              <Button
                variant="outline-danger"
                size="lg"
                onClick={(e) => this.handleSubmit(e)}
              >
                Calculate
              </Button>
            </div>
            {console.log(this.state)}
            <div id="pop-up-text">
              {this.state.submitted === true ? (
                <p
                  className="pop"
                  id="test"
                >{`Based on the current exchange rate, ${this.state.amount} US Dollars is worth ${this.state.foreignPrice} ${this.props.rate.currencyName}(s). Based on the difference in Big Mac prices ($${this.state.dollarPrice} in ${this.state.country} vs. $5.66 in America) $${this.state.amount} in ${this.state.country} will go as far as $${this.state.total} would in America`}</p>
              ) : null}
            </div>
          </div>

          <div className="content2">
            <h1>Bubble Chart</h1>
          </div>
          <br></br>
          <BubbleChart />
        </div>
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
