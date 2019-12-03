import React from "react";
import AppBar from "./components/appbarcomponent";
import "./App.css";

function App(props) {
  return (
    <div className="App">
      <AppBar
        setWallet={props.setWallet}
        wallet={props.wallet}
        walletAddress={props.walletAddress}
        logout={props.logout}
        setTab={props.setTab}
      />
      {props.children}
    </div>
  );
}

export default App;
