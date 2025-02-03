import {useState} from "react";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import {TLocation} from "../../lib/types";

type Props = {
  changeCity: (city: string) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  location: TLocation;
  resetCity: () => void;
  getWeatherData: (city: string) => Promise<void>;
};

export default function LocationHeader({
  changeCity,
  handleKeyPress,
  location,
  resetCity,
  getWeatherData,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useOutsideClick(() => {
    if (isEditing && location.city !== location.inititalCity) handleFetch();
    setIsEditing(false);
  });

  const editClickHandler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    if (isEditing) setIsEditing(false);
    else setIsEditing(true);
  };

  const handleFetch = () => {
    getWeatherData(location.city);
  };

  return (
    <div className="relative flex items-center gap-4 min-h-[35px]">
      <svg
        className="w-8 h-8"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path d="M352 192c0-88.4-71.6-160-160-160S32 103.6 32 192c0 15.6 5.4 37 16.6 63.4c10.9 25.9 26.2 54 43.6 82.1c34.1 55.3 74.4 108.2 99.9 140c25.4-31.8 65.8-84.7 99.9-140c17.3-28.1 32.7-56.3 43.6-82.1C346.6 229 352 207.6 352 192zm32 0c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192zm-240 0a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm48 80a80 80 0 1 1 0-160 80 80 0 1 1 0 160z" />
      </svg>
      {!isEditing && location ? (
        <h1 className="w-full h-full text-center text-xl md:text-2xl whitespace-nowrap">
          {location.country !== "" && `${location.country},`} {location.city}
        </h1>
      ) : (
        <input
          // @ts-ignore
          ref={ref}
          type="text"
          name="city"
          placeholder="Choose a city..."
          autoComplete="off"
          className="border-2 border-white bg-transparent px-0 rounded-md min-w-10 h-full text-center text-lg whitespace-nowrap outline-none"
          value={location.city}
          onChange={(e) => changeCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      )}
      <div className="flex items-center gap-2">
        {!isEditing ? (
          <svg
            onClick={editClickHandler}
            fill="white"
            className="w-4 h-4 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
          </svg>
        ) : (
          <svg
            onClick={handleFetch}
            className="w-4 h-max cursor-pointer"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
          </svg>
        )}
        <svg
          fill="white"
          onClick={resetCity}
          className="w-4 h-4 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
        </svg>
      </div>
    </div>
  );
}
