import React from 'react';

const SelectCountry = (props) => (
  <div>
    <select name="country" onChange={props.handleChange}>
      <option>Select Country</option>
      {props.countries.map((country) => {
        return <option key={country.id}>{country.name}</option>;
      })}
    </select>
  </div>
);

export default SelectCountry;
