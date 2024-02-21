import React from "react";
import "./App.css";

const numberOfWaterTanks = 4;

function App() {
  return (
    <main className="bg-slate-100 w-screen min-h-screen p-10 flex items-start justify-between">
      {[...Array(numberOfWaterTanks).keys()].map((i) => {
        return <WaterTank key={i} />;
      })}
    </main>
  );
}

export default App;

const WaterTank = () => {
  const [intervalId, setIntervalId] = React.useState<number>(0);
  const [waterLevel, setWaterLevel] = React.useState<number>(0);
  return (
    <div className="flex flex-col items-start gap-4 w-[250px]">
      <button
        className="rounded-xl bg-green-600 border-2 border-green-600 text-white px-4 py-2 w-full uppercase font-bold hover:bg-green-500 hover:border-green-500"
        onMouseDown={() => {
          const interval = setInterval(() => {
            setWaterLevel((prevState) => prevState + 90);
          }, 1000);
          setIntervalId(interval);
        }}
        onMouseUp={() => clearInterval(intervalId)}
      >
        Add
      </button>
      <button
        className="rounded-xl bg-white border-2 border-red-600 text-red-600 px-4 py-2 w-full uppercase font-bold hover:border-red-500 hover:text-red-500 hover:bg-stone-100"
        onClick={() => setWaterLevel(0)}
      >
        Empty
      </button>

      <div className="border-4 border-slate-500 rounded-xl h-[450px] w-full mt-5 flex flex-col-reverse">
        <div
          className="w-full bg-sky-600 rounded-lg"
          id="water"
          style={{
            height: `${waterLevel}px`,
          }}
        ></div>
      </div>
    </div>
  );
};
