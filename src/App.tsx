import React from "react";
import "./App.css";

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
  React.useEffect(() => {
    let intervalId = 0;
    if (waterLevel.some((level, idx) => level[idx] > 0)) {
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
  }, [waterLevel]);

  return (
    <main className="bg-slate-100 w-screen min-h-screen p-10 flex items-start justify-between">
      {[...Array(numberOfWaterTanks).keys()].map((i) => {
        return (
          <WaterTank
            key={i}
            waterIndex={i}
            waterLevel={waterLevel[i]}
            setWaterLevel={setWaterLevel}
          />
        );
      })}
    </main>
  );
}

export default App;

const WaterTank = ({
  waterIndex,
  waterLevel,
  setWaterLevel,
}: {
  waterIndex: number;
  waterLevel: WaterLevelType;
  setWaterLevel: React.Dispatch<React.SetStateAction<WaterLevelType[]>>;
}) => {
  const [intervalId, setIntervalId] = React.useState<number>(0);
  return (
    <div className="flex flex-col items-start gap-4 w-[250px]">
      <button
        className="rounded-xl bg-green-600 border-2 border-green-600 text-white px-4 py-2 w-full uppercase font-bold hover:bg-green-500 hover:border-green-500"
        onMouseDown={() => {
          const interval = setInterval(() => {
            setWaterLevel((prevState) =>
              prevState.map((level, idx) =>
                idx === waterIndex
                  ? { [waterIndex]: 90 + level[idx] }
                  : { ...level }
              )
            );
          }, 1000);
          setIntervalId(interval);
        }}
        onMouseUp={() => clearInterval(intervalId)}
      >
        Add
      </button>
      <button
        className="rounded-xl bg-white border-2 border-red-600 text-red-600 px-4 py-2 w-full uppercase font-bold hover:border-red-500 hover:text-red-500 hover:bg-stone-100"
        onClick={() => {
          setWaterLevel((prevState) =>
            prevState.map((level, idx) =>
              idx === waterIndex ? { [waterIndex]: 0 } : { ...level }
            )
          );
        }}
      >
        Empty
      </button>

      <div className="border-4 border-slate-500 rounded-xl h-[450px] w-full mt-5 flex flex-col-reverse">
        <div
          className="w-full bg-sky-600 rounded-lg"
          id="water"
          style={{
            height: `${waterLevel[waterIndex]}px`,
          }}
        ></div>
      </div>
    </div>
  );
};
