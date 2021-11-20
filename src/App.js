import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// redux
import { actions as userActions } from "./store/user-slice";

import Header from './components/Layout/Header';
// pages
import {
  Home,
  LoginPage,
  Store,
  UserRegisterPage,
  PasswordResetPage,
  PasswordResetConfirm,
  NotFound,
  PasswordResetComplete,
} from "./components/Pages";

import './App.css';

// set axios default baseURL
axios.defaults.baseURL = "http://localhost:8000";

function App() {
  const { refresh } = useSelector((state) => state.users);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(userActions.setUser());
  },[dispatch, refresh]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="store/" element={<Store />} />
        <Route path="accounts/login/" element={<LoginPage />} exact />
        <Route path="accounts/register/" element={<UserRegisterPage />} exact />
        <Route
          path="accounts/password_reset/"
          element={<PasswordResetPage />}
          exact
        />
        <Route
          path="accounts/password_reset_complete/"
          element={<PasswordResetComplete />}
          exact
        />
        <Route
          path="accounts/password_reset_confirm/:uidb64/:token"
          element={<PasswordResetConfirm />}
          exact
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
