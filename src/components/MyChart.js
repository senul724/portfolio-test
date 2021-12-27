import React, { useContext, useState ,useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { GlobalContext } from "../context/globalContext";
import randomColor from "randomcolor";

export default function MyChart() {
  const [siteData, setSiteData] = useContext(GlobalContext);
  const [names, setNames] = useState([]);
  const [colors, setColors] = useState([]);
  //   const gotData = siteData.tokens;

  const getNames =() =>{
      setNames([]);
      setColors([]);
      siteData.tokens.map((element) =>{
        setNames((prev) => [...prev, element.name]);
        setColors((prev) => [...prev, randomColor()]);
      })
  }

  useEffect(() => {
      getNames();
      console.log(names.length);
  }, [siteData.tokens])

  return (
      <div className = "pie">
      {names.length !== 0 ? (
        <Doughnut
          data={{
            labels: names,
            datasets: [
              {
                data: siteData.tokens,
                backgroundColor: colors,
              },
            ],
          }}
          options={{
            // maintainAspectRatio: false,
            parsing: {
              key: "possesion"
            },
          }}
          height={100}
          width={100}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
