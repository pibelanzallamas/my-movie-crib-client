import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {
  id: null,
  email: null,
  name: null,
  lastname: null,
};

const userReducer = createReducer(initialState, {
  [setUser]: (state, action) => action.payload,
});

export default userReducer;
