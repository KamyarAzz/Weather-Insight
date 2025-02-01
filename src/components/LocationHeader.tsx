import {useState} from "react";
import {useOutsideClick} from "../hooks/useOutsideClick";
import {TLocation} from "../lib/types";

type Props = {
  changeCity: (city: string) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  location: TLocation;
  resetCity: () => void;
};

export default function LocationHeader({
  changeCity,
  handleKeyPress,
  location,
  resetCity,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useOutsideClick(() => setIsEditing(false));

  const editClickHnadler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    if (isEditing) setIsEditing(false);
    else setIsEditing(true);
  };

  return (
    <header className="relative flex items-center">
      {!isEditing && location ? (
        <h1 className="min-w-[185px] min-h-[35px] text-2xl text-center">
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
          className="bg-white bg-opacity-95 border-b-2 border-b-pink-200 rounded-tl-[10px] rounded-br-[10px] min-w-[185px] min-h-[35px] text-center text-xl outline-none"
          value={location.city}
          onChange={(e) => changeCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      )}
      <div className="-right-[4.75rem] bottom-2 absolute flex items-center gap-2">
        <svg
          onClick={editClickHnadler}
          className="w-4 h-4 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
        </svg>
        <svg
          onClick={resetCity}
          className="w-4 h-4 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
        </svg>
      </div>
    </header>
  );
}
