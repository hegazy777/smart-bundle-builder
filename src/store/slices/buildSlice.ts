import type { BuildState } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: BuildState = {
  selections: {},
  history: [{}],
  historyIndex: 0,
  isDarkMode: false,
};

const buildSlice = createSlice({
  name: "build",
  initialState,
  reducers: {
    selectItem: (
      state,
      action: PayloadAction<{ category: string; itemId: string }>,
    ) => {
      const { category, itemId } = action.payload;

      if (state.selections[category] === itemId) {
        delete state.selections[category];
      } else {
        state.selections[category] = itemId;
      }

      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({ ...state.selections });
      state.history = newHistory;
      state.historyIndex = newHistory.length - 1;
    },

    undo: (state) => {
      if (state.historyIndex === 0) return;
      state.historyIndex -= 1;
      state.selections = { ...state.history[state.historyIndex] };
    },

    redo: (state) => {
      if (state.historyIndex === state.history.length - 1) return;
      state.historyIndex += 1;
      state.selections = { ...state.history[state.historyIndex] };
    },

    resetBuild: (state) => {
      state.selections = {};
      state.history = [{}];
      state.historyIndex = 0;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { selectItem, undo, redo, resetBuild, toggleDarkMode } =
  buildSlice.actions;
export default buildSlice.reducer;
