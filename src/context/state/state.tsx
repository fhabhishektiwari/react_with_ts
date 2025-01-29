import { createContext } from "react";
import { NoteType } from "../../components/note/note-type";
import { ALL_ACTION_TYPES } from "../../actions";
export type StateType = {
  notes: NoteType[];
  editMode: boolean;
  noteToBeEditted: NoteType | null;
};

export type ActionType = {
  type: ALL_ACTION_TYPES;
  payload: any;
};
export const StateContext = createContext<{
  state: StateType;
  dispatch: (action: ActionType) => void;
}>(
  {} as {
    state: StateType;
    dispatch: (action: ActionType) => void;
  }
);
