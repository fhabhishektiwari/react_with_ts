import Card from "../card/card";
import { ColorDark, ColorLight, NoteType, Priority } from "./note-type";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { themeContext } from "../../context/theme/theme";
import { StateContext } from "../../context/state/state";
import { DELETE_NOTE, SET_EDIT_MODE, SET_NOTE_FOR_EDIT } from "../../actions";
import "./note.css";
import { deleteNote } from "../../services/note-service";

type NoteProps = {
  id: string;
  text: string;
  priority?: Priority;
  createdAt: Date;
  updatedAt: Date;
  note: NoteType;
};
const Note = (props: NoteProps) => {
  const theme = useContext(themeContext);
  const { dispatch } = useContext(StateContext);

  const editNote = (note: NoteType) => {
    dispatch({ payload: true, type: SET_EDIT_MODE });
    dispatch({ payload: note, type: SET_NOTE_FOR_EDIT });
  };

  const handleDelete = async () => {
    console.log("id:", props.id);
    await deleteNote(props.id);
    await dispatch({ payload: props.id, type: DELETE_NOTE });
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
        <div className="left-corner date">
          {props.updatedAt.toLocaleString()}
        </div>
        <div className="right-icons">
          <FaEdit onClick={() => editNote(props.note)} />
          <FaTrash onClick={handleDelete} />
        </div>
      </>
    </Card>
  );
};

export default Note;
