import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Layout from "./UserView/Layout/Layout";
import DetailPage from "./UserView/Pages/DetailPage/DetailPage";
import HomePage from "./UserView/Pages/HomePage/HomePage";
import LoginPage from "./UserView/Pages/LoginPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout Component={HomePage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detail/:id" element={<Layout Component={DetailPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
