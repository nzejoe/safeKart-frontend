import { useEffect} from "react";
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
  PasswordChangePage,
  CartPage,
  ProductDetailPage,
  CheckoutPage,
  PlaceOrderPage,
  PrivateRoute,
  PublicRoute,
  OrderConfirmedPage,
  OrderHistoryPage,
  OrderDetailPage,
} from "./components/Pages";

import './App.css';

// set axios default baseURL
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

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
        <Route path="store/:slug/" element={<ProductDetailPage />} exact />
        <Route
          path="accounts/login/"
          element={<PublicRoute children={<LoginPage />} />}
          exact
        />
        <Route
          path="accounts/register/"
          element={<PublicRoute children={<UserRegisterPage />} />}
          exact
        />
        <Route
          path="accounts/password_change/"
          element={<PrivateRoute children={<PasswordChangePage />} />}
          exact
        />
        <Route
          path="accounts/password_reset/"
          element={<PublicRoute children={<PasswordResetPage />} />}
          exact
        />
        <Route
          path="accounts/password_reset_complete/"
          element={<PublicRoute children={<PasswordResetComplete />} />}
          exact
        />
        <Route
          path="accounts/password_reset_confirm/:uidb64/:token"
          element={<PublicRoute children={<PasswordResetConfirm />} />}
          exact
        />
        <Route path="carts/" element={<CartPage />} exact />
        <Route
          path="checkout/"
          element={<PrivateRoute children={<CheckoutPage />} />}
          exact
        />
        <Route
          path="place_order/"
          element={<PrivateRoute children={<PlaceOrderPage />} />}
          exact
        />
        <Route
          path="order_confirmed/"
          element={<PrivateRoute children={<OrderConfirmedPage />} />}
        />
        <Route
          path="order_history/"
          element={<PrivateRoute children={<OrderHistoryPage />} />}
        />
        <Route
          path="order_history/:order_number/"
          element={<PrivateRoute children={<OrderDetailPage />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
