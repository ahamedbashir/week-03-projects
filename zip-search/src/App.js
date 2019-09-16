import React, {Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  const cities = props.cities;
  console.log(cities)
  return (
  <div>
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
    Zip Code: <input type="number" onChange = {(event) => props.getCities(event.target.value)} placeholder = "Try 10016"></input>
  </div>);
}


class App extends Component {
  state = {
    zipCode: "",
    cities: "",
  }

  getCities = async (zip) => {
    this.setState({zipCode: zip, cities: ""});
    if(zip.length === 5) {
      this.setState({zipCode: zip, cities: ""});
      const response = await fetch("http://ctp-zip-api.herokuapp.com/zip/" + zip);
      if(response.status !== 200) {
        console.log("No results")
      }
      else {
        const cities = await response.json();
        // console.log("cities", cities);
        this.setState({cities: cities})
      }
      
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField getCities= {this.getCities}/>
        {this.state.cities?
          <div>
            {this.state.cities.map(city => {
              return <City cities = {city}/>
              })}
          </div>
          : <div>No Results</div>
        }
    </div>
    );
  }
}

export default App;
