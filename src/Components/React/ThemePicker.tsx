import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setTheme } from "../../Redux/themeSlice";
import { Theme } from "../../Models/Theme";
import { themes } from "../../Models/AppThemes";

export function ThemePicker() {
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Select a Theme</h3>
      {themes.map((theme) => {
        return (
          <Button style={theme.buttonPreviewStyle} onClick={() => dispatch(setTheme(theme))}>
            {theme.name}
          </Button>
        );
      })}
    </div>
  );
}
