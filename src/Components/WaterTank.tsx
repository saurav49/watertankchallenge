import React from "react";
import { WaterLevelType } from "../App";

const WaterTank = ({
  waterIndex,
  waterLevel,
  setWaterLevel,
  setIsBtnPressed,
}: {
  waterIndex: number;
  waterLevel: WaterLevelType;
  setWaterLevel: React.Dispatch<React.SetStateAction<WaterLevelType[]>>;
  setIsBtnPressed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [intervalId, setIntervalId] = React.useState<number>(0);
  return (
    <div className="flex flex-col items-start gap-4 w-[250px]">
      <button
        className="rounded-xl bg-green-600 border-2 border-green-600 text-white px-4 py-2 w-full uppercase font-bold hover:bg-green-500 hover:border-green-500"
        onMouseDown={() => {
          setIsBtnPressed(true);
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
        onMouseUp={() => {
          setIsBtnPressed(false);
          clearInterval(intervalId);
        }}
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
          className={"waterLevel"}
          id="water"
          style={{
            height: `${waterLevel[waterIndex]}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export { WaterTank };
