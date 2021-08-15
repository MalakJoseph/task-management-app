export type Font = keyof {
  smaller: "12px";
  small: "14px";
  medium: "16px";
  large: "18px";
  larger: "20px";
  "x-large": "22px";
  "xx-large": "24px";
};

export type Justify =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type Align =
  | "baseline"
  | "center"
  | "flex-start"
  | "flex-end"
  | "stretch";
