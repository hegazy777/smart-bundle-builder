import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Item } from "../../types";
import { fetchdata } from "../../services/api";

interface ItemsState {
  items: Item[];
  isLoading: boolean;
  error: string | null;
}


const initialState: ItemsState = {
  items: [],
  isLoading: false,
  error: null,
};


export const loadItems = createAsyncThunk(
  "items/loadItems",
  async () => {
    const items = await fetchdata();
    return items;
  }
);



const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // builder.addCase(loadItems.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // });

    // نجح
    builder.addCase(loadItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items  = action.payload;
    });

    // // فشل
    // builder.addCase(loadItems.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message ?? "حصل خطأ";
    // });

  },
});

export default itemsSlice.reducer;