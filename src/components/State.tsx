import React, { createContext, useContext, useReducer, Reducer } from 'react';

interface StateProps {
  reducer: Reducer<any, any>;
  initialState: {};
  children: any;
}

export const StateContext = createContext({});

export const StateProvider = ({ reducer, initialState, children }: StateProps) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
