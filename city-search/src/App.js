import React, {Component } from 'react';
import logo from './logo.svg';
import './App.css';


function ZipCode(props) {
  // const cities = props.cities;
  // console.log(cities)
  // return (
  // <div>
  //   <h1>{cities.City}, {cities.State}</h1>
  //   <ul>
  //     <li>State: {cities.State}</li>
  //     <li>Location: {cities.Lat}, {cities.Long}</li>
  //     <li>Population: {cities.EstimatedPopulation}</li>
  //     <li>Total Wages: {cities.TotalWages}</li>
  //   </ul>
  </div>);
}

function CitySearchField(props) {
  return (<div>
    Zip Code: <input type="text" onChange = {(event) => props.getCities(event.target.value)} placeholder = "Try NY"></input>
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
        <CitySearchField getCities= {this.getCities}/>
        {this.state.zipCodes?
          <div>
            {this.state.cities.map(city => {
              return <City cities = {city}/>
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
