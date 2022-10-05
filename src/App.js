// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import Footer from './Components/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        {/* <News pageSize = {11} country= "in" category = "Business"/> */}

          <Routes>

            <Route exact path="/" element = {<News key="general" pageSize = {11} country= "in" category = "general"/>}/>
            <Route exact path="/general" element = {<News key="general" pageSize = {11} country= "in" category = "general"/>}/>
            <Route exact path="/business" element = {<News key="business" pageSize = {11} country = "in" category = "business"/>}/>
            <Route exact path="/entertainment" element = {<News key="entertainment" pageSize = {11} country = "in" category = "entertainment"/>}/>
            <Route exact path="/health" element = {<News key="health" pageSize = {11} country = "in" category = "health"/>}/>
            <Route exact path="/science" element = {<News key="science" pageSize = {11} country = "in" category = "science"/>}/>
            <Route exact path="/sports" element = {<News key="sports" pageSize = {11} country = "in" category = "sports"/>}/>
            <Route exact path="/technology" element = {<News key="technology" pageSize = {11} country = "in" category = "technology"/>}/>

          </Routes>
        <Footer/>
        </Router>
      </div>
    )
  }
}



