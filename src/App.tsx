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
  React.useEffect(() => {
    let intervalId = 0;
    if (waterLevel.some((level, idx) => level[idx] > 0) && !isBtnPressed) {
      const sumOfAllWaterLevels = waterLevel.reduce(
        (acc, currValue, idx) => acc + currValue[idx],
        0
      );
      const makeWaterLevelEqualTo = Math.round(
        sumOfAllWaterLevels / waterLevel.length
      );
      intervalId = setInterval(() => {
        setWaterLevel((prevState) =>
          prevState.map((level, idx) =>
            level[idx] !== makeWaterLevelEqualTo
              ? level[idx] < makeWaterLevelEqualTo
                ? { [idx]: level[idx] + 11.25 }
                : { [idx]: level[idx] - 11.25 }
              : level
          )
        );
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [waterLevel, isBtnPressed]);

  return (
    <main className="bg-slate-100 w-screen min-h-screen p-10 flex items-start justify-between">
      {[...Array(numberOfWaterTanks).keys()].map((i) => {
        return (
          <WaterTank
            key={i}
            waterIndex={i}
            waterLevel={waterLevel[i]}
            setWaterLevel={setWaterLevel}
            setIsBtnPressed={setIsBtnPressed}
          />
        );
      })}
    </main>
  );
}

export default App;
