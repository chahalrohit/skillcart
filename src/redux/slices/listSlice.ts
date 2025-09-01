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
  allItems: Product[];
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ListState = {
  allItems: [],
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
      state.allItems = data;
      state.items = data;
      state.loading = false;
    },
    fetchListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleFavourite: (state, action: PayloadAction<string>) => {
      const itemID = action.payload;
      // update in both arrays
      state.allItems = state.allItems.map((item) =>
        item.id === itemID ? { ...item, favourite: !item.favourite } : item
      );
      state.items = state.items.map((item) =>
        item.id === itemID ? { ...item, favourite: !item.favourite } : item
      );
    },
    searchItem: (state, action: PayloadAction<string>) => {
      const search = action.payload;
      if (search === "") {
        state.items = state.allItems;
      } else {
        state.items = state.allItems.filter((e: Product) => {
          return e.name.toLowerCase().includes(search.toLowerCase());
        });
      }
    },
  },
});

export const {
  fetchListRequest,
  fetchListStart,
  fetchListSuccess,
  fetchListFailure,
  toggleFavourite,
  searchItem,
} = listSlice.actions;
export default listSlice.reducer;
