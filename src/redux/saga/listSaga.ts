import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../services/api";
import {
  fetchListFailure,
  fetchListStart,
  fetchListSuccess,
} from "../slices/listSlice";

function* fetchListSaga(): Generator {
  try {
    yield put(fetchListStart());
    const response = yield call(
      api.get,
      "c53fb45e-5085-487a-afac-0295f62fb86e"
    );
    yield put(fetchListSuccess(response.data));
  } catch (error: any) {
    yield put(fetchListFailure(error.message));
  }
}

export function* watchListSaga(): Generator {
  yield takeLatest("list/fetchListRequest", fetchListSaga);
}
