import { all } from "redux-saga/effects";
import { watchListSaga } from "./saga/listSaga";

export default function* rootSaga() {
  yield all([watchListSaga()]);
}
