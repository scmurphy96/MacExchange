import React from 'react';
import { connect } from 'react-redux';
import { fetchCountries } from '../store/countries';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchCountries();
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <div id="title">
          <h1>Welcome to MacExchange!</h1>
        </div>
        <div>
          <form id="input-dollar-amount" onSubmit={this.handleSubmit}>
            <label htmlFor="dollar-amount">Dollar Amount:</label>
            <input name="dollar-amount" type="number" min="0" step="any" />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <select id="countries">
            {this.props.countries.map((country) => {
              return <option key={country.id}>{country.code}</option>;
            })}
          </select>
        </div>
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
