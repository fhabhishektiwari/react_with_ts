import Card from "../card/card";
import { ColorDark, ColorLight, Priority } from "./note-type";
import { FaEdit, FaTrash } from "react-icons/fa";

import "./note.css";
import { useContext } from "react";
import { themeContext } from "../../context/theme/theme";

type NoteProps = {
  id: string;
  text: string;
  priority?: Priority;
  editNote: (id: string) => void;
  deleteNote: (id: string) => void;
};
const Note = (props: NoteProps) => {
  const theme = useContext(themeContext);
  return (
    <Card
      bgColor={
        theme === "dark"
          ? props.priority && ColorDark[props.priority]
          : props.priority && ColorLight[props.priority]
      }
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
