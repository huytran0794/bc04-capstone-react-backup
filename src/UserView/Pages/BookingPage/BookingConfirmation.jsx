import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

  let selectedSeatList = useSelector(
    (state) => state.movieSlice.selectedSeatList
  );
  let selectedMovieInfo = useSelector(
    (state) => state.movieSlice.selectedMovieInfo
  );
  let [isBookingSuccessOpen, setIsBookingSuccessOpen] = useState(false);

  useEffect(() => {
    if (selectedMovieInfo === null) {
      navigate(`/selectseat/${params.maLichChieu}`);
    }
  }, []);

  let renderTicketDetails = () => {
    return (
      <>
        {selectedSeatList.map((item, index) => {
          return (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={item.maGhe.toString() + index}
            >
              <th scope="row" className="py-4 px-6">
                {index + 1}
              </th>
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.tenGhe}
              </td>
              <td className="py-4 px-6">
                {item.loaiGhe === "Thuong" ? "Thường" : "VIP"}
              </td>
              <td className="py-4 px-6">{numberWithCommas(item.giaVe)}</td>
              <td className="py-4 px-6">{numberWithCommas(item.giaVe)}</td>
            </tr>
          );
        })}
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            colSpan={4}
          >
            TỔNG CỘNG:
          </td>
          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {numberWithCommas(getTotalPrice())}
          </td>
        </tr>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td
            className="py-4 px-6 font-medium text-right text-gray-900 whitespace-nowrap dark:text-white"
            colSpan={5}
          >
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => {
                setIsBookingSuccessOpen(true);
              }}
            >
              Đặt vé
            </button>
          </td>
        </tr>
      </>
    );
  };

  let getTotalPrice = () =>
    selectedSeatList.reduce((total, item) => total + item.giaVe, 0);

  let handleCloseBookingSuccess = () => {
    dispatch(setSelectedSeatList([]));
    dispatch(setSelectedMovieInfo(null));
    navigate("/");
  };
  return (
    <div className="container mx-auto">
      <div className="flex items-center">
        <img
          className="w-1/5"
          src={selectedMovieInfo?.hinhAnh}
          alt={selectedMovieInfo?.tenPhim}
        />
        <div className="text-white">
          <p>{selectedMovieInfo?.tenPhim}</p>
          <p>
            {selectedMovieInfo?.gioChieu} {selectedMovieInfo?.ngayChieu}
          </p>
          <p>{selectedMovieInfo?.tenCumRap}</p>
          <p>{selectedMovieInfo?.tenRap}</p>
          <p>Ghế: {bookingUtils.renderSelectedSeat(selectedSeatList)}</p>
          <p>Tổng cộng: {getTotalPrice()}</p>
        </div>
      </div>
      <div>
        <p>Chi tiết</p>
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            <tbody>{renderTicketDetails()}</tbody>
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
