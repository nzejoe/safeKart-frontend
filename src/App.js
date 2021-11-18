import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import Header from './components/Layout/Header';
// pages
import Store from './components/Pages/Store';
import Home from "./components/Pages/Home";

import './App.css';

// set axios default baseURL
axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="store/" element={<Store/>}/>
      </Routes>
    </Router>
  );
}

export default App;
