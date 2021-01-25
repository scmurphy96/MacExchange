import React from 'react';
import { connect } from 'react-redux';
import { fetchCountries } from '../store/countries';
import SelectCountry from './SelectCountry';
import Form from './Form';
// import Map from './ChoroplethMap';
import BubbleChart from './BubbleChart';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      country: '',
      total: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    for (let i = 0; i < this.props.countries.length; i++) {
      if (this.props.countries[i].name === this.state.country) {
        const divide =
          this.props.countries[52].price / this.props.countries[i].price;
        const result = Number(this.state.amount) * divide;
        this.setState({
          total: result.toFixed(2),
        });
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
          <h1>{`$${this.state.amount} is worth approximately $${this.state.total} in ${this.state.country}`}</h1>
        </div>
        <BubbleChart />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    countries: state.countriesReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
  };
};

export default connect(mapState, mapDispatch)(HomePage);
