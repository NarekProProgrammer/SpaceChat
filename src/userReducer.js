import { createSlice } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const initialState = {
  userData: {},
  isLoggedIn: false,
  remember: false,
  imgLink: "",
  snackbar: {
    show: false,
    type: "",
    message: "",
  },
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
    setImgLink: (state, action) => {
      state.imgLink = action.payload;
      updateDoc(doc(db, "Users", state.userData.uid), {
        avatar: action.payload,
      });
    },
    setSnackbar: (state, action) => {
      state.snackbar = action.payload;
    },
    setRem: (state, action) => {
      state.remember = action.payload;
    },
  },
});

export const { setUser, setLog, setRem, setImgLink, setSnackbar } =
  UserSlice.actions;

export const getUser = (state) => state.user.userData;
export const getLog = (state) => state.user.isLoggedIn;
export const getRem = (state) => state.user.remember;
export const getImgLink = (state) => state.user.imgLink;
export const getSnackbar = (state) => state.user.snackbar;

export default UserSlice.reducer;
