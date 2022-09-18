import { createSlice } from "@reduxjs/toolkit";

// =====================================================================

const initialState = [
  // id: null,
  // groupId: null,
  // studentId: null,
  // paymentCost: null,
  // centerCostPerLecture: null,
  // balance: null,
  // exams: null,
  // createdAt: null,
  // updatedAt: null,
];

// =====================================================================

const reducers = {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  setEnrolments: (state, action) => [...state, ...action.payload],

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  resetEnrolments: () => initialState,

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
};

// =====================================================================

const enrolmentsSlice = createSlice({
  name: "enrolments",
  initialState,
  reducers,
});

// =====================================================================

export const { setEnrolments, resetEnrolments } = enrolmentsSlice.actions;

// =====================================================================

export default enrolmentsSlice;
