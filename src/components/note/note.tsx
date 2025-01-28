import Card from "../card/card";
import { Color, Priority } from "./note-type";
import { FaEdit, FaTrash } from "react-icons/fa";

import "./note.css";

type NoteProps = {
  id: string ;
  text: string;
  priority?: Priority;
  editNote: (id: string) => void;
  deleteNote: (id: string) => void;
};
const Note = (props: NoteProps) => {
  return (
    <Card
      bgColor={props.priority && Color[props.priority]}
      height="2"
      padding="1"
    >
      <>
        <div>{props.text}</div>
        <div className="right-icons">
          <FaEdit onClick={() => props.editNote(props.id)} />
          <FaTrash onClick={() => props.deleteNote(props.id)} />
        </div>
      </>
    </Card>
  );
};

export default Note;
