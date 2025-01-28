import React, { useState } from "react";
import "./App.css";
import Note from "./components/note/note";
import { Notes } from "./components/note/data";
import AddNote from "./components/add-note/add-note";
import { NoteType } from "./components/note/note-type";

function App() {
  const [notes, setNotes] = useState(Notes);
  const [editMode, setEditMode] = useState(false);
  const [noteToBeEditted, setNoteToBeEditted] = useState<NoteType | null>(null);

  const addNote = (note: NoteType) => {
    setNotes([note, ...notes]);
  };

  const updateNote = (updateNote: NoteType) => {
    const index = notes.findIndex((note) => note.id === updateNote.id);
    let editedNotes = [...notes];
    editedNotes.splice(index, 1, updateNote);
    setNotes(editedNotes);
    setEditMode(false);
  };

  const editNote = (id: string) => {
    // console.log("Edit note with id:", id);
    const note = notes.find((note) => note.id === id);
    setEditMode(true);
    if (note) {
      setNoteToBeEditted(note);
    }
  };

  const deleteNote = (id: string) => {
    // console.log("Delete note with id:", id);
    const index = notes.findIndex((note) => note.id === id);
    let editedNotes = [...notes];
    editedNotes.splice(index, 1);
    setNotes(editedNotes);
  };

  return (
    <div className="App">
      <h1 className="note-app">Notes App [{notes.length}]</h1>
      <AddNote
        addNote={addNote}
        editMode={editMode}
        noteToBeEditted={noteToBeEditted}
        updateNote={updateNote}
      />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          priority={note.priority}
          editNote={editNote}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
}

export default App;
