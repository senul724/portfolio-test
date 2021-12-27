import "./App.css";
import Dex from "./components/Dex";
import Login from "./components/login";
import MyChart from "./components/MyChart";
import { GlobalProvider } from "./context/globalContext";

function App() {
  return (
    <GlobalProvider>
      <>
        <h1 style={{textAlign:"center"}}>Portfolio Web Dapp</h1>
        <div className="App">
          <div className="box">
            <div className="box-item">
              <Login />
            </div>
            <div className="box-pie">
              <MyChart />
            </div>
          </div>
          <Dex/>
        </div>
      </>
    </GlobalProvider>
  );
}

export default App;
