import React, { useState, useEffect, useContext } from "react";
import { useMoralis } from "react-moralis";
import { GlobalContext } from "../context/globalContext";

export default function Login() {
  const { authenticate, isAuthenticated, Moralis } = useMoralis();
  const [siteData, setSiteData] = useContext(GlobalContext);
  const net = "bsc";

  const serverUrl = "https://gm18mivuwk5z.usemoralis.com:2053/server";
  const appId = "AMYsYeps07MJAF9833a2pW6AsLCI7YNuD91WReGu";
  Moralis.start({ serverUrl, appId });
  const [balance, setBalance] = useState({});
  const [tokens, setTokens] = useState([]);
  const [netWorth, setNetWorth] = useState(0);
  const init = async () => {
    let bal = await Moralis.Web3API.account.getTokenBalances({
      // address: "0x6e2673095545280f6f10e22eb861a555c6e94bec",
      address: "0x0211f3cedbef3143223d3acf0e589747933e8527",
      chain: net,
    });
    setBalance(bal);
  };
  const get = async () => {
    Object.keys(balance).map(async (asset) => {
      let options = {
        address: balance[asset].token_address,
        chain: net,
      };

      let data = {};
      data["name"] = balance[asset].name;
      data["symbol"] = balance[asset].symbol;
      data["address"] = balance[asset].token_address;
      data["balance"] = balance[asset].balance / 10 ** 18;
      try {
        let price = await Moralis.Web3API.token.getTokenPrice(options);
        data["price"] = price.usdPrice;
        let gotPrice = price.usdPrice * (balance[asset].balance / 10 ** 18);
        data["possesion"] = gotPrice;
      setNetWorth((prev) => prev + gotPrice); 

      } catch {
        data["price"] = "Undefined";
        data["possesion"] = "Undefined";
      }
      setTokens((prev) => [...prev, data]);
    });
    
    // setSiteData((prev) => ({
    //   ...prev,
    //   tokens,
    // }));
  };

  useEffect(() => {
    authenticate();
    init();
  }, []);
  useEffect(() => {
    setSiteData(prev =>({...prev, tokens}));
  }, [tokens])

  return (
    <div>
      {!isAuthenticated ? (
        <button
          onClick={() => {
            authenticate();
          }}
        >
          Authenticate
        </button>
      ) : (
        <>
          <h1>successfully authenticated</h1>
          <button onClick={() => get()}>get Tokens</button>
          <div className = "detail-box">
            {tokens != [] ? (
              tokens.map((key) => {
                return (
                  <div style={{ padding: "5px" }}>
                  <h4>
                    Name: {key.name} Price:{key.price} USD <br />
                    balance: {key.balance} {key.symbol}
                    <br />
                    Possesion: {key.possesion} USD
                    {/* Possesion: {(key.possesion).toFixed(2)} USD */}
                  </h4>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
          <h2>Networth :{netWorth.toFixed(2)} USD</h2>
        </>
      )}
    </div>
  );
}
