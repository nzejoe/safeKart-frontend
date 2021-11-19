import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// redux
import { actions as userActions } from "./store/user-slice";

import Header from './components/Layout/Header';
// pages
import { Home, LoginPage, Store, UserRegisterPage } from "./components/Pages";

import './App.css';

// set axios default baseURL
axios.defaults.baseURL = "http://localhost:8000";

function App() {
  const { refresh } = useSelector((state) => state.users);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(userActions.setUser())
  },[dispatch, refresh]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="store/" element={<Store />} />
        <Route path="accounts/login/" element={<LoginPage />} exact />
        <Route path="accounts/register/" element={<UserRegisterPage />} exact />
      </Routes>
    </Router>
  );
}

export default App;
