import { useContext, useEffect, useState } from "react";
import { NoteType, Priority } from "../note/note-type";
import { v4 as uuidv4 } from "uuid";
import Card from "../card/card";
import { themeContext } from "../../context/theme/theme";
import { StateContext } from "../../context/state/state";
import { ADD_NOTE, SET_EDIT_MODE, UPDATE_NOTE } from "../../actions";
import "./add-note.css";

const AddNote = () => {
  const theme = useContext(themeContext);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const { state, dispatch } = useContext(StateContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as Priority); //type assertion
  };

  const setNoteContent = (note: NoteType) => {
    setText(note.text);
    setPriority(note.priority);
  };

  useEffect(() => {
    if (state.noteToBeEditted && state.editMode) {
      setNoteContent(state.noteToBeEditted);
    }
  }, [state.noteToBeEditted, state.editMode]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (state.editMode) {
      dispatch({
        type: UPDATE_NOTE,
        payload: {
          id: state.noteToBeEditted!.id,
          text: text,
          priority: priority,
        },
      });
      dispatch({ payload: false, type: SET_EDIT_MODE });
      setText("");
      setPriority("low");
    } else {
      dispatch({
        payload: {
          id: uuidv4(),
          text: text,
          priority: priority,
        },
        type: ADD_NOTE,
      });
    }

    setText("");
    setPriority("low");
  };
  return (
    <Card bgColor={theme === "dark" ? "#333" : "#ddd"} height="15" padding="1">
      <form className="add-note">
        <input
          type="text"
          placeholder="Enter note title"
          value={text}
          onChange={handleChange}
        />
        <select
          value={priority}
          onChange={handlePriorityChange}
          className="select-priority"
        >
          <option value={"low"}>Low</option>
          <option value={"medium"}>Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <button className="add-btn" onClick={handleClick}>
          {state.editMode ? "Edit" : "Add"}
        </button>
      </form>
    </Card>
  );
};

export default AddNote;
