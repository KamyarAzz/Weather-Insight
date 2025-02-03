import rain from "../../assets/images/rain.svg";
import snow from "../../assets/images/snow.svg";
import sun from "../../assets/images/sun.svg";
import wind from "../../assets/images/wind.svg";
import sunBehindCloud from "../../assets/images/sunBehnidCloud.svg";
import rainSun from "../../assets/images/rain-sun.svg";
import doubleClouds from "../../assets/images/double-clouds.svg";
import thunder from "../../assets/images/thunder.svg";

type Props = {type: string; className?: string};

export default function Cloud({type, className}: Props) {
  console.log(type);
  return (
    <img
      className={className}
      src={
        type === "Thunderstorm"
          ? thunder
          : type === "Drizzle"
          ? rainSun
          : type === "Clouds"
          ? doubleClouds
          : type === "Rain"
          ? rain
          : type === "Snow"
          ? snow
          : type === "Clear"
          ? sun
          : type === "Mist" ||
            type === "Smoke" ||
            type === "Haze" ||
            type === "Dust" ||
            type === "Fog" ||
            type === "Sand" ||
            type === "Dust" ||
            type === "Ash" ||
            type === "Squall" ||
            type === "Tornado"
          ? wind
          : sunBehindCloud
      }
      alt="cloud-with-rain-emoji"
    />
  );
}
