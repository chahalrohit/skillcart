import { combineReducers } from "@reduxjs/toolkit";
import listReducer from "./slices/listSlice";

const rootReducer = combineReducers({
  list: listReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
