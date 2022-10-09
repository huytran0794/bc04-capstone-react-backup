import { createSlice } from "@reduxjs/toolkit";
import { localServ } from "../../../services/localServ";

let user = localServ.user.get() ? localServ.user.get() : null;

const initialState = {
  isLogin: false,
  user,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    removeUserInfo: (state) => {
      state.user = null;
    },
  },
});

// console.log(userSlice);

export const { setUserInfo, removeUserInfo } = userSlice.actions;

export default userSlice.reducer;
