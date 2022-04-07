import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setTheme } from "../../Redux/themeSlice";
import { Theme } from "../../Models/Theme";
import { dark, light, night, redish, sun, aragon, pink } from "../../Models/AppThemes";

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
      case "redish":
        const redishTheme: Theme = redish;
        dispatch(setTheme(redishTheme));
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
        onClick={() => onSelectTheme("redish")}
        style={{ backgroundImage: "linear-gradient(147deg, #e0455f 0%, #44000b 74%)", color: "white" }}
      >
        Redish
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
        style={{ backgroundImage: "linear-gradient(to right, #b91d73, #f953c6)", color: "white" }}
      >
        Pink
      </Button>
    </div>
  );
}
