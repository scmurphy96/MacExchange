import React from 'react';
import { connect } from 'react-redux';
import { fetchCountries } from '../store/countries';
import SelectCountry from './SelectCountry';
import Form from './Form';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      country: '',
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
