// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import Footer from './Components/Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize = {11} country= "in" category = "Business"/>
        <Footer/>
      </div>
    )
  }
}


