import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { async } from 'q';


function City(props) {
  return (<div>
    {props.getCities}
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
    
    console.log(zip);
    if(zip.length === 5) {
      this.setState({zipCode: zip});
      const response = await fetch("http://ctp-zip-api.herokuapp.com/zip/" + zip);
      const cities = await response.json();
      console.log(cities);
      this.setState({cities: cities})
    }
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
        <div>
          <City  getCities = {this.getCities}/>
          <City />
        </div>
      </div>
    );
  }
}

export default App;
