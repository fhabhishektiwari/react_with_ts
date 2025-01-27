import React, { useState } from "react";
import "./App.css";
import Note from "./components/note/note";
import { Notes } from "./components/note/data";
import AddNote from "./components/add-note/add-note";
import { NoteType } from "./components/note/note-type";

function App() {
  const [notes, setNotes] = useState(Notes);

  const addNote = (note: NoteType) => {
    setNotes([note, ...notes]);
  };

  return (
    <div className="App">
      <h1 className="note-app">Notes App</h1>
      <AddNote addNote={addNote} />
      {notes.map((note) => (
        <Note key={note.id} text={note.text} priority={note.priority} />
      ))}
    </div>
  );
}

export default App;
