import { configureStore } from "@reduxjs/toolkit";
import statusReducer from "./features/userStatus.feature";

const store = configureStore({
  reducer: {
    status: statusReducer,
  },
});

export default store;
