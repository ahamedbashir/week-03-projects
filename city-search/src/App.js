import React, {Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Card} from 'react-bootstrap';


function ZipCode(props) {
  const zipCodes = props.zipCodes;
  console.log(zipCodes)
  return (
  <div className = "mt-4">
    {zipCodes}
  </div>);
}


function City(props) {
  const cities = props.cities;
  console.log(cities)
  return (
  <div className = "mt-4">
    <Card style={{width: '25rem'}}>
    <Card.Header>{cities.City}, {cities.State}</Card.Header>
    <Card.Body>
    <ul>
      <li>State: {cities.State}</li>
      <li>Location: ({cities.Lat}, {cities.Long})</li>
      <li>Population (estimated): {cities.EstimatedPopulation}</li>
      <li>Total Wages: {cities.TotalWages}</li>
    </ul>
    </Card.Body>
    </Card>  
  </div>);
}

function CitySearchField(props) {
  return (<div  className = "body form-inline body row mt-3" style={{fontWeight: "bold"}}>
    <div style={{width: '25rem'}}> City Name: <input type="text" className="form-control form-inline" value = {props.city} onChange = {(event) => props.getZipCodes(event.target.value.toUpperCase())} placeholder = "Try NY"></input></div>
  
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
          <div className = "body">
            {this.state.zipCodes.map(zip => {
              return <ZipCode zipCodes= {zip}/>
              })
            }
          </div>
          :
          <div className = "body mt-3">
            <div style={{width: '25rem'}}>No Results</div>
          </div>
        }
    </div>
    );
  }
}

export default App;