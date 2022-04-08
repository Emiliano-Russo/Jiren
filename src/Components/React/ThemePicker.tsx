import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setTheme } from "../../Redux/themeSlice";
import { Theme } from "../../Models/Theme";
import { dark, light, night, jiren, sun, aragon, pink } from "../../Models/AppThemes";

export function ThemePicker() {
  const dispatch = useDispatch();

  function onSelectTheme(type: string) {
    switch (type) {
      case "dark":
        const darkTheme: Theme = dark;
        dispatch(setTheme(darkTheme));
        break;
      case "light":
        const lightTheme: Theme = light;
        dispatch(setTheme(lightTheme));
        break;
      case "night":
        const nightTheme: Theme = night;
        dispatch(setTheme(nightTheme));
        break;
      case "jiren":
        const jirenTheme: Theme = jiren;
        dispatch(setTheme(jirenTheme));
        break;
      case "sun":
        const sunTheme: Theme = sun;
        dispatch(setTheme(sunTheme));
        break;
      case "aragon":
        const aragonTheme: Theme = aragon;
        dispatch(setTheme(aragonTheme));
        break;
      case "pink":
        const pinkTheme: Theme = pink;
        dispatch(setTheme(pinkTheme));
        break;
    }
  }

  return (
    <div>
      <h3>Select a Theme</h3>
      <Button style={{ backgroundColor: "black", color: "white" }} onClick={() => onSelectTheme("dark")}>
        Dark
      </Button>
      <Button onClick={() => onSelectTheme("light")}>Light</Button>
      <Button
        onClick={() => onSelectTheme("night")}
        style={{ backgroundImage: "linear-gradient(315deg, #0cbaba 0%, #380036 74%)", color: "white" }}
      >
        Night
      </Button>
      <Button
        onClick={() => onSelectTheme("jiren")}
        style={{ backgroundImage: "linear-gradient(147deg, #e0455f 0%, #44000b 74%)", color: "white" }}
      >
        Jiren
      </Button>
      <Button
        onClick={() => onSelectTheme("sun")}
        style={{ backgroundImage: "linear-gradient(180deg, #76daff 0%, #fcd000 74%)", color: "black" }}
      >
        Beach
      </Button>
      <Button
        onClick={() => onSelectTheme("aragon")}
        style={{ backgroundImage: "linear-gradient(to right, #FAFFD1, #A1FFCE)", color: "black" }}
      >
        Aragon
      </Button>
      <Button
        onClick={() => onSelectTheme("pink")}
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(117,32,214,1) 0%, rgba(179,21,149,1) 31%, rgba(246,24,118,1) 100%)",
          color: "white",
        }}
      >
        Pink
      </Button>
    </div>
  );
}
