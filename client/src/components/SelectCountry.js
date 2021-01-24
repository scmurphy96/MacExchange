import React from 'react';

const SelectCountry = (props) => (
  <div>
    <select name="countries" onChange={props.handleChange}>
      {props.countries.map((country) => {
        return <option key={country.id}>{country.code}</option>;
      })}
    </select>
  </div>
);

export default SelectCountry;
