import React from 'react';

class HomePage extends React.Component {
  render() {
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
          <select id="countries"></select>
        </div>
      </div>
    );
  }
}

export default HomePage;
