import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';

const Form = (props) => (
  <div>
    <form id="input-dollar-amount" onSubmit={props.handleSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>$</InputGroup.Text>
          <input
            name="amount"
            type="text"
            value={props.amount}
            onChange={props.handleChange}
          />
        </InputGroup.Prepend>
      </InputGroup>
      {/* <button type="submit">Submit</button> */}
    </form>
  </div>
);

export default Form;
