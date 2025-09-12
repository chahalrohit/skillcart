import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  givenName: string;
  id: string;
  email: string;
  name: string;
  familyName: string;
  photo: string;
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
    saveUserInfo: (state, action: PayloadAction<User>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { saveUserInfo } = authSlice.actions;
export default authSlice.reducer;
