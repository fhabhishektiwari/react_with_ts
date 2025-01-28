export type Priority = "high" | "low" | "medium" | "urgent";

export type NoteType = {
  id: string;
  text: string;
  priority: Priority;
};

export enum ColorLight {
  high = "#ffb266",
  medium = "#ffff00",
  low = "#008000",
  urgent = "#ff0000",
}

export enum ColorDark {
  high = "#66492d",
  medium = "#86862e",
  low = "#1f561f",
  urgent = "#591818",
}
