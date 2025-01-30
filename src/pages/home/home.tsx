import React, { useContext } from "react";
import { themeContext } from "../../context/theme/theme";
import AddNote from "../../components/add-note/add-note";
import Note from "../../components/note/note";
import { StateContext } from "../../context/state/state";
import "./home.css";

const Home = () => {
  const theme = useContext(themeContext);
  const { state } = useContext(StateContext);
  return (
    <div className={`home ${theme === "dark" ? "dark" : "light"}`}>
      <h1 className="note-app">Notes App [{state.notes.length}]</h1>
      <AddNote />
      {state.notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          priority={note.priority}
          createdAt={note.createdAt}
          updatedAt={note.updatedAt}
          note={note}
        />
      ))}
    </div>
  );
};
export default Home;
