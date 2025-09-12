import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  givenName: string | null;
  id: string;
  email: string;
  name: string | null;
  familyName: string | null;
  photo: string | null;
}

const initialState: User = {
  givenName: "",
  id: "",
  email: "",
  name: "",
  familyName: "",
  photo: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserInfo: (state, action: PayloadAction<User | undefined>) => {
      console.log("state : ", state);
      console.log("action : ", action);
      Object.assign(state, action.payload);
    },
  },
});

export const { saveUserInfo } = authSlice.actions;
export default authSlice.reducer;
