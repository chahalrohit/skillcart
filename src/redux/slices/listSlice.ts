import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  favourite: boolean;
}

interface ListState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ListState = {
  items: [],
  loading: true,
  error: null,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    fetchListRequest: (state) => {
      // Ye reducer khali hai, bas saga ko trigger karega
    },
    fetchListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchListSuccess: (state, action: PayloadAction<Product[]>) => {
      const data = action.payload.map((e) => ({
        ...e,
        favourite: false,
      }));
      state.items = data;
      state.loading = false;
    },
    fetchListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleFavourite: (state, action: PayloadAction<string>) => {
      const itemID = action.payload;
      console.log("Reducer toggle called for:", itemID);
      state.items = state.items.map((item) =>
        item.id === itemID ? { ...item, favourite: !item.favourite } : item
      );
    },
  },
});

export const {
  fetchListRequest,
  fetchListStart,
  fetchListSuccess,
  fetchListFailure,
  toggleFavourite,
} = listSlice.actions;
export default listSlice.reducer;
