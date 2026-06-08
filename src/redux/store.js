import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { studentsReducer } from "./students/slice";
import { testsReducer } from "./tests/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    tests: testsReducer,
  },
});
