import { useState } from "react";
import "./add-note.css";
import { NoteType, Priority } from "../note/note-type";
import { v4 as uuidv4 } from "uuid";
import Card from "../card/card";
type AddNoteProps = {
  addNote: (note: NoteType) => void;
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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!text.trim()) return;
    props.addNote({
      id: uuidv4(),
      text: text,
      priority: priority,
    });
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
          Add
        </button>
      </form>
    </Card>
  );
};

export default AddNote;
