import {useState} from "react";
import {TPreference} from "../../lib/types";
import {useOutsideClick} from "../../hooks/useOutsideClick";

type Props = {
  prefrence: TPreference;
  setPrefrence: React.Dispatch<React.SetStateAction<TPreference>>;
};

export default function UnitsSelector({setPrefrence, prefrence}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useOutsideClick(() => setOpen(false));

  const openHandler = () => {
    setOpen(!open);
  };

  const clickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    selectedPrefrence: TPreference
  ) => {
    e.preventDefault();
    if (prefrence.type !== selectedPrefrence.type && open)
      setPrefrence(selectedPrefrence);
  };

  return (
    <div
      onClick={openHandler}
      ref={ref}
      className={`${
        open ? "max-h-40 bg-opacity-45" : "max-h-9 bg-opacity-0"
      } flex text-lg flex-col transition-all duration-300 absolute right-0 top-0.5 md:top-0 justify-start items-center gap-3 bg-white  rounded-full cursor-pointer overflow-hidden w-9`}
    >
      <div
        onClick={(e) => clickHandler(e, {type: "metric", unit: "°C"})}
        className={`${
          prefrence.type === "metric"
            ? "order-1"
            : "order-3 bg-white bg-opacity-0 hover:bg-opacity-50 duration-150"
        }
          rounded-full w-full h-full p-1.5 flex items-center justify-center
        `}
        title="Celsius"
      >
        °C
      </div>
      <div
        onClick={(e) => clickHandler(e, {type: "standard", unit: "K"})}
        className={`${
          prefrence.type === "standard"
            ? "order-1"
            : "order-3 bg-white bg-opacity-0 hover:bg-opacity-50 duration-150"
        }
          rounded-full w-full h-full p-1.5 flex items-center justify-center
        `}
        title="Kelvin"
      >
        K
      </div>
      <div
        onClick={(e) => clickHandler(e, {type: "imperial", unit: "°F"})}
        className={`${
          prefrence.type === "imperial"
            ? "order-1"
            : "order-3 bg-white bg-opacity-0 hover:bg-opacity-50 duration-150"
        }
          rounded-full w-full h-full p-1.5 flex items-center justify-center
        `}
        title="Fahrenheit"
      >
        °F
      </div>
    </div>
  );
}
