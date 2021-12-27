import React from "react";

export default function Dex() {
  return (
    <div className="swap">
      <h2 style = {{textAlign:"left"}}>swap</h2>
      <p style = {{textAlign:"left"}}>swap token</p>
      <div style = {{display:"flex", flexDirection:"row"}}>
        <div style = {{flex:1, backgroundColor:"blue"}}>amount</div>
        <div style = {{flex:1, backgroundColor:"blue"}}>select token</div>
      </div>
      <p style = {{textAlign:"left"}}>for token</p>
      <div style = {{display:"flex", flexDirection:"row"}}>
        <div style = {{flex:1, backgroundColor:"blue"}}>amount</div>
        <div style = {{flex:1, backgroundColor:"blue"}}>select token</div>
      </div>
    </div>
  );
}