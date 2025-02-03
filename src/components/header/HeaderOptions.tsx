import {TPreference} from "../../lib/types";
import UnitsSelector from "../header/UnitsSelector";
import ThemeSwitch from "../ui/ThemeSwitch";

type Props = {
  prefrence: TPreference;
  setPrefrence: React.Dispatch<React.SetStateAction<TPreference>>;
};

export default function HeaderOptions({prefrence, setPrefrence}: Props) {
  return (
    <div className="relative flex flex-row items-center gap-4 w-min h-full">
      <div className="relative w-max h-full">
        <UnitsSelector prefrence={prefrence} setPrefrence={setPrefrence} />
      </div>
      <ThemeSwitch />
    </div>
  );
}
