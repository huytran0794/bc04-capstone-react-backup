import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../../../utils/utils";
import { setSelectedMovieInfo } from "../../../redux/slices/movieSlice";
import { bookingUtils } from "../bookingUtils";

export default function SelectedDetailTickets({
  scheduleInfo,
  selectedSeatList,
}) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let getTotalPrice = () =>
    selectedSeatList.reduce((total, item) => total + item.giaVe, 0);

  let handleBookingConfirm = () => {
    dispatch(setSelectedMovieInfo(scheduleInfo));
    navigate(`/booking-confirm/${scheduleInfo.maLichChieu}`);
  };

  return (
    <div className="flex justify-between">
      <img
        src={scheduleInfo?.hinhAnh}
        alt={scheduleInfo?.tenPhim}
        className="w-20"
      />
      <p>{scheduleInfo?.tenPhim}</p>
      <div>
        <table>
          <tbody>
            <tr>
              <td>Rạp</td>
              <td>{scheduleInfo?.tenCumRap}</td>
            </tr>
            <tr>
              <td>Suất chiếu</td>
              <td>
                {scheduleInfo?.gioChieu}, {scheduleInfo?.ngayChieu}
              </td>
            </tr>
            <tr>
              <td>Phòng chiếu</td>
              <td>{scheduleInfo?.tenRap}</td>
            </tr>
            <tr>
              <td>Ghế</td>
              <td>{bookingUtils.renderSelectedSeat(selectedSeatList)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <p>Tổng cộng:</p>
        <p>{numberWithCommas(getTotalPrice())} đ</p>
      </div>

      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={handleBookingConfirm}
      >
        XÁC NHẬN
      </button>
    </div>
  );
}
