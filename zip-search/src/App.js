import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { async } from 'q';


function City(props) {
  const cities = props.cities;
  console.log(cities)
  return (<div>
    <h1>{cities.City}, {cities.State}</h1>
    <ul>
      <li>State: {cities.State}</li>
      <li>Location: {cities.Lat}, {cities.Long}</li>
      <li>Population: {cities.EstimatedPopulation}</li>
      <li>Total Wages: {cities.TotalWages}</li>
    </ul>
  </div>);
}

function ZipSearchField(props) {
  return (<div>
    Zip Code: <input type="text" onChange = {(event) => props.getZipCode(event.target.value)} placeHolder = "Try 10016"></input>
  </div>);
}


class App extends Component {
  state = {
    zipCode: "",
    cities: "",
    city: "",
    zipCodes: ""
  }

  getZipCode = async (zip) => {
    // if(zip.length === 5) {
      this.setState({zipCode: zip});
      const response = await fetch("http://ctp-zip-api.herokuapp.com/zip/" + zip);
      if(response.status !== 200) {
        console.log("No results")
      }
      else {
        const cities = await response.json();
        console.log("cities", cities);
        this.setState({cities: cities})
      }
      
    // }
  }
  getCities = async () => {
    const response = await fetch("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zipCode);
    const cities = await response.json();
    console.log(cities);
    return cities;
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField getZipCode = {this.getZipCode}/>
        {this.state.cities?
          <div>
            {this.state.cities.map(city => {
              return <City cities = {city}/>
              })}
          </div>
          : null
        }
    </div>
    );
  }
}

export default App;
