import Card from "../card/card";
import { ColorDark, ColorLight, NoteType, Priority } from "./note-type";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { themeContext } from "../../context/theme/theme";
import { StateContext } from "../../context/state/state";
import { DELETE_NOTE, SET_EDIT_MODE, SET_NOTE_FOR_EDIT } from "../../actions";
import "./note.css";

type NoteProps = {
  id: string;
  text: string;
  priority?: Priority;
  note: NoteType;
};
const Note = (props: NoteProps) => {
  const theme = useContext(themeContext);
  const { dispatch } = useContext(StateContext);

  const editNote = (note: NoteType) => {
    dispatch({ payload: true, type: SET_EDIT_MODE });
    dispatch({ payload: note, type: SET_NOTE_FOR_EDIT });
  };

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
          <FaEdit onClick={() => editNote(props.note)} />
          <FaTrash
            onClick={() => dispatch({ payload: props.id, type: DELETE_NOTE })}
          />
        </div>
      </>
    </Card>
  );
};

export default Note;
