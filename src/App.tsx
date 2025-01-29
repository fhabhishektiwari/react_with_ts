import Home from "./pages/home/home";
import { themeContext } from "./context/theme/theme";
import { useEffect, useReducer, useState } from "react";
import Switch from "react-switch";
import { FaSun, FaMoon } from "react-icons/fa";
import { StateContext, StateType } from "./context/state/state";
// import { Notes } from "./components/note/data";
import "./App.css";
import {
  ADD_NOTE,
  DELETE_NOTE,
  INIT_NOTES,
  SET_EDIT_MODE,
  SET_NOTE_FOR_EDIT,
  UPDATE_NOTE,
} from "./actions";
import { getNotes } from "./services/note-service";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [checked, setChecked] = useState(false);

  const [state, dispatch] = useReducer(
    (state: StateType, action: { type: string; payload: any }) => {
      switch (action.type) {
        case INIT_NOTES:
          return { ...state, notes: action.payload };
        case SET_EDIT_MODE:
          return { ...state, editMode: action.payload };
        case SET_NOTE_FOR_EDIT:
          return { ...state, noteToBeEditted: action.payload };
        case ADD_NOTE:
          return { ...state, notes: [action.payload, ...state.notes] };
        case DELETE_NOTE:
          const index = state.notes.findIndex(
            (note) => note.id === action.payload
          );
          let editedNotes = [...state.notes];
          editedNotes.splice(index, 1);
          return { ...state, notes: editedNotes };
        case UPDATE_NOTE:
          const indexUpdated = state.notes.findIndex(
            (note) => note.id === action.payload.id
          );
          let editedNotesUpdated = [...state.notes];
          editedNotesUpdated.splice(indexUpdated, 1, action.payload);
          return { ...state, notes: editedNotesUpdated };
        default:
          return state;
      }
    },
    {
      notes: [],
      editMode: false,
      noteToBeEditted: null,
    }
  );

  const changeHandler = () => {
    setChecked(!checked);
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    async function initializeNotes() {
      const notes = await getNotes();
      dispatch({ type: INIT_NOTES, payload: notes });
    }
    initializeNotes();
  }, []);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <themeContext.Provider value={theme}>
        <Switch
          onChange={changeHandler}
          checked={checked}
          className="react-switch"
          uncheckedIcon={
            <FaMoon size={18} color="white" style={{ padding: "4px" }} />
          }
          checkedIcon={
            <FaSun size={18} color="orange" style={{ padding: "4px" }} />
          }
          offColor="#282c34"
          onColor="#ff0"
          onHandleColor="#282c34"
        />
        <Home />;
      </themeContext.Provider>
    </StateContext.Provider>
  );
};

export default App;
