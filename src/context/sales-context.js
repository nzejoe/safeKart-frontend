import { useReducer, createContext } from "react";
import axios from 'axios'

const initialState = {
  topSelling: undefined,
  getTopSelling: () => {},
};

const reducer = (state, actions)=>{
    if(actions.type === 'TOP_SELLING'){
    return { ...state, topSelling: actions.payload}
    }
    return initialState;
}

export const SalesContext = createContext({
  topSelling: undefined,
  getTopSelling: ()=>{},
});


const SalesProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(reducer, initialState);

    const getTopSellingproducts = async() => {
        try {
            const response =  await axios({
               method: "GET",
               url: "orders/top_selling/",
             })
            
             dispatch({type: 'TOP_SELLING', payload: response.data});
        } catch (error) {
            console.log(error)
        }

    }

    const salesContext = {
      topSelling: state.topSelling,
      getTopSelling: getTopSellingproducts,
    };

    return <SalesContext.Provider value={salesContext}>
        { children }
    </SalesContext.Provider>
}

export default SalesProvider;