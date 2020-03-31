import * as React from "react";
import { CirclePicker, ColorChangeHandler } from "react-color";
import "./styles.scss";

interface ColorPickerProps {
  onChange: ColorChangeHandler;
  selectedColor?: string;
}

const ColorPicker: React.FunctionComponent<ColorPickerProps> = ({
  selectedColor,
  onChange
}) => {
  return (
    <div className="color-picker">
      {selectedColor === undefined ? (
        <CirclePicker
          colors={[
            "#e91e63",
            "#9c27b0",
            "#3f51b5",
            "#21F6f3",
            "#4caf50",
            "#ffeb3b",
            "#FF8C00",
            "#000000"
          ]}
          width="auto"
          circleSize={25}
          onChangeComplete={onChange}
        />
      ) : (
        <div
          style={{ backgroundColor: selectedColor }}
          className="color-picker__selected-color"
        />
      )}
    </div>
  );
};

export default ColorPicker;
