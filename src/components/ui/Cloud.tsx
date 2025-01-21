import rain from "../../assets/images/rain.svg";
import snow from "../../assets/images/snow.svg";
import sun from "../../assets/images/sun.svg";
import wind from "../../assets/images/wind.svg";
import other from "../../assets/images/sunBehnidCloud.svg";

type Props = {type: string; className?: string};

export default function Cloud({type, className}: Props) {
  return (
    <img
      className={className}
      src={
        type === "Drizzle" || type === "Rain"
          ? rain
          : type === "Snow"
          ? snow
          : type === "Clear"
          ? sun
          : type === "Wind"
          ? wind
          : other
      }
      alt="cloud-with-rain-emoji"
    />
  );
}
