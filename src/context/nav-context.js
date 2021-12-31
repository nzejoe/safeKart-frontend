import { createContext, useReducer } from "react";

const initialState = {
  navHeight: undefined,
  setHeight: () => {},
};

const navReducer = (state, actions) => {
    if(actions.type === 'SET_HEIGHT'){
        const navRef = actions.payload;
        const navHeight = navRef.current && navRef.current.clientHeight;

        return { ...state, navHeight, }; // return new state snapshot
    }
  return initialState;
};

// navbar context
export const NavContext = createContext({
  navHeight: undefined,
  getNavRef: (ref) => {},
});

// navbar context provider
const NavProvider = ({ children }) => {
  const [state, dispatch] = useReducer(navReducer, initialState);

  const setNavheight = (ref)=>{
      dispatch({type: 'SET_HEIGHT', payload: ref})
  }

  const navContext = {
    navHeight: state.navHeight,
    getNavRef: setNavheight,
  };

  return (
    <NavContext.Provider value={navContext}>{children}</NavContext.Provider>
  );
};

export default NavProvider;
