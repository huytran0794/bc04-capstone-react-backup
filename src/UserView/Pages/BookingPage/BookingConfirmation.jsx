import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { movieServ } from "../../../services/movieServ";
import { numberWithCommas } from "../../../utils/utils";
import {
  setSelectedMovieInfo,
  setSelectedSeatList,
} from "../../redux/slices/movieSlice";
import BookingSuccess from "./BookingSuccess";
import { bookingUtils } from "./bookingUtils";

export default function BookingConfirmation() {
  let params = useParams();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let [isBookingSuccessOpen, setIsBookingSuccessOpen] = useState(false);
  let selectedSeatList = useSelector(
    (state) => state.movieSlice.selectedSeatList
  );
  let selectedMovieInfo = useSelector(
    (state) => state.movieSlice.selectedMovieInfo
  );

  useEffect(() => {
    if (selectedMovieInfo === null) {
      navigate(`/selectseat/${params.maLichChieu}`);
    }
  }, []);

  let getTotalPrice = () =>
    selectedSeatList.reduce((total, item) => total + item.giaVe, 0);

  let handleCloseBookingSuccess = () => {
    dispatch(setSelectedSeatList([]));
    dispatch(setSelectedMovieInfo(null));
    navigate("/");
  };

  let handleXacNhanDatVe = () => {
    let ticketsInfo = {
      maLichChieu: selectedMovieInfo.maLichChieu,
      danhSachVe: selectedSeatList,
    };
    movieServ
      .postBookingTicket(ticketsInfo)
      .then((res) => {
        console.log(res);
        setIsBookingSuccessOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let renderTicketDetails = () => {
    return (
      <>
        {selectedSeatList.map((item, index) => {
          return (
            <tr
              className="border-white/50 border-b"
              key={item.maGhe.toString() + index}
            >
              <th scope="row" className="py-4 px-6">
                {index + 1}
              </th>
              <td className="py-4 px-6 font-medium text-white whitespace-nowrap">
                {item.tenGhe}
              </td>
              <td className="py-4 px-6">
                {item.loaiGhe === "Thuong" ? "Thường" : "VIP"}
              </td>
              <td className="py-4 px-6">{numberWithCommas(item.giaVe)} đ</td>
              <td className="py-4 px-6">{numberWithCommas(item.giaVe)} đ</td>
            </tr>
          );
        })}
        <tr className="border-white/50 border-b text-lg">
          <td
            className="py-4 px-6 font-medium text-white whitespace-nowrap"
            colSpan={4}
          >
            TỔNG CỘNG:
          </td>
          <td className="py-4 px-6 font-medium text-white whitespace-nowrap">
            {numberWithCommas(getTotalPrice())} đ
          </td>
        </tr>
        <tr className="border-white/50 border-b">
          <td colSpan={4}></td>
          <td className="py-4 px-6 font-medium text-white whitespace-nowrap">
            <button
              type="button"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 rounded-lg focus:ring-red-900 font-medium text-white text-xl transition duration-300"
              onClick={handleXacNhanDatVe}
            >
              Đặt vé
            </button>
          </td>
        </tr>
      </>
    );
  };

  return (
    <div className="container max-w-screen-xl mx-auto">
      <h2 className="pb-3 mb-6 border-b-2 text-3xl text-white">Đặt vé</h2>
      {!selectedMovieInfo ? null : (
        <div className="movieInfo flex mb-5">
          <div className="movieInfo__cover w-1/6 h-80 mr-6 flex-shrink-0">
            <img
              src={selectedMovieInfo.hinhAnh}
              alt={selectedMovieInfo.tenPhim}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="movieInfo__detail">
            <p className="mb-2 font-bold text-2xl uppercase">
              {selectedMovieInfo.tenPhim}
            </p>
            <p className="mb-0 font-semibold text-lg">
              {selectedMovieInfo.tenCumRap}
            </p>
            <p className="mb-2 text-white/80">{selectedMovieInfo.diaChi}</p>
            <p className="mb-0 text-lg">{selectedMovieInfo.tenRap}</p>
            <p className="mb-0 text-white/70 text-[16px]">
              Ghế:{" "}
              <span className="font-semibold text-lg text-white">
                {bookingUtils.renderSelectedSeat(selectedSeatList)}
              </span>
            </p>
            <p className="mb-2 text-white/70 text-[16px]">
              Xuất chiếu:{" "}
              <span className="font-semibold text-lg text-white">
                {selectedMovieInfo.gioChieu} {selectedMovieInfo.ngayChieu}
              </span>
            </p>
          </div>
        </div>
      )}
      <div>
        <h3 className="pb-3 mb-6 border-b-2 text-3xl text-white">Chi tiết</h3>
        <div className="overflow-x-auto relative">
          <table className="w-full text-center text-gray-400">
            <thead className="uppercase bg-gray-700/70 text-white/70">
              <tr>
                <th scope="col" className="py-3 px-6">
                  STT
                </th>
                <th scope="col" className="py-3 px-6">
                  Ghế
                </th>
                <th scope="col" className="py-3 px-6">
                  Loại ghế
                </th>
                <th scope="col" className="py-3 px-6">
                  Đơn giá
                </th>
                <th scope="col" className="py-3 px-6">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody className="text-[16px]">{renderTicketDetails()}</tbody>
          </table>
        </div>
      </div>
      <BookingSuccess
        isBookingSuccessOpen={isBookingSuccessOpen}
        handleCloseBookingSuccess={handleCloseBookingSuccess}
        selectedSeatList={selectedSeatList}
        selectedMovieInfo={selectedMovieInfo}
      />
    </div>
  );
}
