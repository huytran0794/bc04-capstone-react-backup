import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isNotifyModalOpen: false,
};

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setNotifyModalOpen: (state) => {
      state.isNotifyModalOpen = true;
    },
    setNotifyModalClose: (state) => {
      state.isNotifyModalOpen = false;
    },
  },
});

export const { setNotifyModalOpen, setNotifyModalClose } = generalSlice.actions;

export default generalSlice.reducer;
