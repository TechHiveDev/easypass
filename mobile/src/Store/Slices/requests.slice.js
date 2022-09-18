import { createSlice } from "@reduxjs/toolkit";

// =====================================================================

const initialState = [
  // id: null,
  // fromUserId: null,
  // toUserId: null,
  // toGroupId: null,
  // requestType: null,
  // requestStatus: null,
  // note: null,
  // info: null,
  // createdAt: null,
  // updatedAt: null,
];

// =====================================================================

const reducers = {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  setRequests: (state, action) => [...state, ...action.payload],

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  resetRequests: () => initialState,

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
};

// =====================================================================

const requestsSlice = createSlice({ name: "requests", initialState, reducers });

// =====================================================================

export const { setRequests, resetRequests } = requestsSlice.actions;

// =====================================================================

export default requestsSlice;
