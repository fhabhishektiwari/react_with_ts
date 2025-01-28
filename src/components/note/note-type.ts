export type Priority = "high" | "low" | "medium" | "urgent";

export type NoteType = {
  id: string;
  text: string;
  priority: Priority;
};

export enum Color {
  high = "#ffb266",
  medium = "#ffff00",
  low = "#008000",
  urgent = "#ff0000",
}
