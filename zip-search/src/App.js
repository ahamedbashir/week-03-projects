import React, {Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Card, Col} from 'react-bootstrap';

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

function ZipSearchField(props) {
  return (
  <div className = "body form-inline body row mt-3" style={{fontWeight: "bold"}}>
    <div style={{width: '25rem'}}> Zip Code: <input type="number" className="form-control form-inline"  onChange = {(event) => props.getCities(event.target.value)} placeholder = "Try 10016"></input></div>
  </div>
  );
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
          <div className = "body">
            {this.state.cities.map(city => {
              return <City cities = {city}/>
              })}
          </div>
          : <div className = "body mt-3">
            <div style={{width: '25rem'}}>No Results</div>
            </div>
        }
        </div>  
    );
  }
}

export default App;
