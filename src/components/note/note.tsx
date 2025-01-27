import Card from "../card/card";
import { NoteProps, Color } from "./note-type";
import "./note.css";

const Note = (props: NoteProps) => {
  return (
    <Card bgColor={props.priority && Color[props.priority]} height="2" padding="1">
      <div>{props.text}</div>
    </Card>
  );
};

export default Note;
