import React from "react";
import "./App.css";
import { WaterTank } from "./Components/WaterTank";

const numberOfWaterTanks = 4;
export type WaterLevelType = {
  [tankIndex: number]: number;
};

function App() {
  const [waterLevel, setWaterLevel] = React.useState<WaterLevelType[]>(
    [...Array(numberOfWaterTanks).keys()].map((i) => ({
      [i]: 0,
    }))
  );
  const [isBtnPressed, setIsBtnPressed] = React.useState<boolean>(false);
  const [makeWaterLevelEqualTo, setMakeWaterLevelEqualTo] =
    React.useState<number>(0);
  React.useEffect(() => {
    let intervalId = 0;
    if (
      !waterLevel.every((level, idx) => level[idx] === waterLevel[0][0]) &&
      !isBtnPressed
    ) {
      intervalId = setInterval(() => {
        setWaterLevel((prevState) =>
          prevState.map((level, idx) =>
            level[idx] === makeWaterLevelEqualTo
              ? level
              : level[idx] < makeWaterLevelEqualTo
              ? { [idx]: level[idx] + 10 }
              : { [idx]: level[idx] - 10 }
          )
        );
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [waterLevel, isBtnPressed, makeWaterLevelEqualTo]);

  return (
    <main className="bg-slate-100 w-screen min-h-screen p-10 flex items-start justify-between">
      {[...Array(numberOfWaterTanks).keys()].map((i) => {
        return (
          <WaterTank
            key={i}
            waterIndex={i}
            currentWaterLevel={waterLevel[i]}
            waterLevel={waterLevel}
            setWaterLevel={setWaterLevel}
            setIsBtnPressed={setIsBtnPressed}
            setMakeWaterLevelEqualTo={setMakeWaterLevelEqualTo}
          />
        );
      })}
    </main>
  );
}

export default App;
