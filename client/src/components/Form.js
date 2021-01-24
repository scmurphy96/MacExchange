import React from 'react';

const Form = (props) => (
  <div>
    <form id="input-dollar-amount" onSubmit={props.handleSubmit}>
      <label htmlFor="dollar-amount">Dollar Amount:</label>
      <input
        name="amount"
        type="text"
        value={props.amount}
        onChange={props.handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default Form;
