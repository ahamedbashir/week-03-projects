import React, {Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Card} from 'react-bootstrap';


function ZipCode(props) {
  const zipCode = props.zipCode;
  // const cities = props.getCities(zipCode);
  // console.log(cities);
  console.log(zipCode)
  return (
  <div className = "mt-4">
    {zipCode}
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
    zipCodes: "",
    cities: ""
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

  getCities = async (zip) => {
    this.setState({cities: ""});
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
          <h2>City Search</h2>
        </div>
        <CitySearchField getZipCodes= {this.getZipCodes} city = {this.state.city}/>
        {this.state.zipCodes?
          <div className = "body">
            {this.state.zipCodes.map(zip => {
              return <ZipCode zipCode= {zip} getCities = {this.getCities}/>
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