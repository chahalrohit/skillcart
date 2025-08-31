import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ListState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ListState = {
  items: [],
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    fetchListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchListSuccess: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchListStart, fetchListSuccess, fetchListFailure } =
  listSlice.actions;
export default listSlice.reducer;
