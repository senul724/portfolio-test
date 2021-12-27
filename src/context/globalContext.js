import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {

  const [siteData, setSiteData] = useState({

    theAccount: null,
    network: null,
    nativeBalance:null,
    balance: null,
    contract:null,
    count:0,
    smartContract:null,
    tokens:[]
  });

  return (

    <GlobalContext.Provider value={[siteData, setSiteData]}>
      {props.children}
    </GlobalContext.Provider>
  );
};
