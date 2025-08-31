import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const createSagaMiddleware = require("redux-saga").default;

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export default store;
