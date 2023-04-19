import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  isLoggedIn: false,
  remember: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setLog: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    remember: (state, action) => {
      state.remember = action.payload;
    },
  },
});

export const { setUser, setLog, setRem } = UserSlice.actions;

export const getUser = (state) => state.user.userData;
export const getLog = (state) => state.user.isLoggedIn;
export const getRem = (state) => state.user.remember;

export default UserSlice.reducer;
