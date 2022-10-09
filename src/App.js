import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Layout from "./HOC/Layout/Layout";
import DetailMovie from "./UserView/Pages/DetailMovie/DetailMovie";
import HomePage from "./UserView/Pages/HomePage/HomePage";
import LoginPage from "./UserView/Pages/LoginPage/LoginPage";
import TheatresListPage from "./UserView/Pages/TheatresListPage/TheatresListPage";
import BookingPage from "./UserView/Pages/BookingPage/BookingPage";
import SelectSeat from "./UserView/Pages/BookingPage/SelectSeat/SelectSeat";
import BookingConfirmation from "./UserView/Pages/BookingPage/BookingConfirmation";
import SecureView from "./HOC/SecureView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout Component={HomePage} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/theatres/"
          element={<Layout Component={TheatresListPage} />}
        />
        <Route
          path="/detail/:maPhim"
          element={<Layout Component={DetailMovie} />}
        />
        <Route
          path="/booking/:maPhim"
          element={<Layout Component={BookingPage} />}
        />
        <Route
          path="/selectseat/:maLichChieu"
          element={
            <SecureView>
              <Layout Component={SelectSeat} />
            </SecureView>
          }
        />
        <Route
          path="/booking-confirm/:maLichChieu"
          element={
            <SecureView>
              <Layout Component={BookingConfirmation} />
            </SecureView>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
