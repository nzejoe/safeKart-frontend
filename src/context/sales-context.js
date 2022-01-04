import { useReducer, createContext } from "react";
import axios from "axios";

const initialState = {
  topSelling: undefined,
  orders: undefined,
  refresh: 0,
};

// REDUCER
const reducer = (state, actions) => {
  if (actions.type === "TOP_SELLING") {
    return { ...state, topSelling: actions.payload };
  }

  if (actions.type === "GET_ORDERS") {
    return { ...state, orders: actions.payload };
  }

  if (actions.type === "REFRESH_ORDERS") {
    const refreshUpdate = Math.random();
    return { ...state, refresh: refreshUpdate };
  }

  return initialState;
};

// SALES CONTEXT
export const SalesContext = createContext({
  topSelling: undefined,
  orders: undefined,
  refresh: 0,
  getTopSelling: () => {},
  getOrders: () => {},
  sendOrderUpdate: () => {},
});

// SALES CONTEXT PROVIDER
const SalesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getTopSellingproducts = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "orders/top_selling/",
      });

      dispatch({ type: "TOP_SELLING", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "orders/",
      });

      dispatch({ type: "GET_ORDERS", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const sendOrderUpdate = async(update) => {
       const { id } = update;
       try {
         const response = await axios({
           method: "PUT",
           url: `orders/order_update/${id}/`,
           data: update,
         });

         if (response.status === 200) {
             // if update was successful   
             dispatch({ type: "REFRESH_ORDERS" });
         }

       } catch (error) {
         console.log(error);
       }
  };

  const context = {
    topSelling: state.topSelling,
    orders: state.orders,
    refresh: state.refresh,
    getTopSelling: getTopSellingproducts,
    getOrders,
    sendOrderUpdate,
  };

  return (
    <SalesContext.Provider value={context}>{children}</SalesContext.Provider>
  );
};

export default SalesProvider;
