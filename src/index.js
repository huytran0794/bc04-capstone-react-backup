import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserView/redux/slices/userSlice";
import movieSlice from "./UserView/redux/slices/movieSlice";
import generalSlice from "./UserView/redux/slices/generalSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    movieSlice,
    generalSlice,
  },
  devTools: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
