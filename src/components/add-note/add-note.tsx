import { useEffect, useState } from "react";
import "./add-note.css";
import { NoteType, Priority } from "../note/note-type";
import { v4 as uuidv4 } from "uuid";
import Card from "../card/card";
type AddNoteProps = {
  addNote: (note: NoteType) => void;
  editMode: boolean;
  noteToBeEditted: NoteType | null;
  updateNote: (note: NoteType) => void;
};

const AddNote = (props: AddNoteProps) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
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
    if (props.noteToBeEditted && props.editMode) {
      setNoteContent(props.noteToBeEditted);
    }
  }, [props.noteToBeEditted, props.editMode]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (props.editMode) {
      props.updateNote({
        id: props.noteToBeEditted!.id,
        text: text,
        priority: priority,
      });
      setText("");
      setPriority("low");
    } else {
      props.addNote({
        id: uuidv4(),
        text: text,
        priority: priority,
      });
    }

    setText("");
    setPriority("low");
  };
  return (
    <Card bgColor="#rgb(165, 211, 197)" height="15" padding="1">
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
          {props.editMode ? "Edit" : "Add"}
        </button>
      </form>
    </Card>
  );
};

export default AddNote;
