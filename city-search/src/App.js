import React, {Component } from 'react';
import logo from './logo.svg';
import './App.css';


function ZipCode(props) {
  const zipCodes = props.zipCodes;
  console.log(zipCodes)
  return (
  <div>
    {zipCodes}
    {/* <h1>{cities.City}, {cities.State}</h1>
    <ul>
      <li>State: {cities.State}</li>
      <li>Location: {cities.Lat}, {cities.Long}</li>
      <li>Population: {cities.EstimatedPopulation}</li>
      <li>Total Wages: {cities.TotalWages}</li>
    </ul> */}
  </div>);
}

function CitySearchField(props) {
  return (<div>
    City: <input type="text" value = {props.city} onChange = {(event) => props.getZipCodes(event.target.value.toUpperCase())} placeholder = "Try NY"></input>
  </div>);
}


class App extends Component {
  state = {
    city: "",
    zipCodes: ""
  }

  getZipCodes = async (city) => {
    this.setState({city: city, zipCodes: ""});
      const response = await fetch("http://ctp-zip-api.herokuapp.com/city/" + city);
      if(response.status !== 200) {
        console.log("No results")
      }
      else {
        const zipCodes = await response.json();
        console.log("zipCodes", zipCodes);
        this.setState({zipCodes: zipCodes})
      }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField getZipCodes= {this.getZipCodes} city = {this.state.city}/>
        {this.state.zipCodes?
          <div>
            {this.state.zipCodes.map(zip => {
              return <ZipCode zipCodes= {zip}/>
              })
            }
          </div>
          : <div>No Results</div>
        }
    </div>
    );
  }
}

export default App;
