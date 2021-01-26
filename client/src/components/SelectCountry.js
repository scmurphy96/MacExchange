import React from 'react';

const SelectCountry = (props) => (
  <div id="select-country">
    <select name="country" className="select-css" onChange={props.handleChange}>
      <option>Select Country</option>
      {props.countries.map((country) => {
        return <option key={country.id}>{country.name}</option>;
      })}
    </select>
  </div>
);

export default SelectCountry;
