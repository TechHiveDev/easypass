import { createSlice } from "@reduxjs/toolkit";

// =====================================================================

const initialState = {
  accessToken: null,
  refreshToken: null,
  currentCompoundId: 1,
  user: {
    email: null,
    id: null,
    name: "user name",
    permission: "",
    address: "user address ",
    userType: "user type",
    info: null,
    updatedAt: null,
    createdAt: null,
  },
};

// =====================================================================

const reducers = {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  setAuthUser: (state, action) => ({ ...state, ...action.payload }),

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  setAccesToken: (state, action) => ({ ...state, accessToken: action.payload }),

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  setUser: (state, action) => ({ ...state, user: { ...action.payload } }),

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~



  setCompountId: (state, action) => {
    state.currentCompoundId = action.payload;
  },
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  resetAuthUser: () => initialState,

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
};

// =====================================================================

const auhthSlice = createSlice({ name: "auth", initialState, reducers });

// =====================================================================

export const { setAuthUser, setAccesToken, setUser, resetAuthUser, setCompountId } =
  auhthSlice.actions;

// =====================================================================

export default auhthSlice;
