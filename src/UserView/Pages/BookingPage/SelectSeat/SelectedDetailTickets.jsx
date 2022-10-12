import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../../../utils/utils";
import { setSelectedMovieInfo } from "../../../redux/slices/movieSlice";
import { bookingUtils } from "../bookingUtils";

export default function SelectedDetailTickets({
  scheduleInfo,
  selectedSeatList,
  setIsNotifyModalOpen,
}) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let getTotalPrice = () =>
    selectedSeatList.reduce((total, item) => total + item.giaVe, 0);

  let handleBookingConfirm = () => {
    if (selectedSeatList.length === 0) {
      setIsNotifyModalOpen(true);
      return;
    }
    dispatch(setSelectedMovieInfo(scheduleInfo));
    navigate(`/booking-confirm/${scheduleInfo.maLichChieu}`);
  };

  return (
    <div className="flex justify-between border-t border-white/50 p-5">
      <img
        src={scheduleInfo?.hinhAnh}
        alt={scheduleInfo?.tenPhim}
        className="w-32 object-cover"
      />
      <p className="w-1/6 mb-0 px-3 uppercase font-semibold text-xl">
        {scheduleInfo?.tenPhim}
      </p>
      <div>
        <table className="text-lg">
          <tbody>
            <tr>
              <td className="align-top">Rạp</td>
              <td className="pl-4 font-semibold">{scheduleInfo?.tenCumRap}</td>
            </tr>
            <tr>
              <td>Suất chiếu</td>
              <td className="pl-4 font-semibold">
                {scheduleInfo?.gioChieu}, {scheduleInfo?.ngayChieu}
              </td>
            </tr>
            <tr>
              <td>Phòng chiếu</td>
              <td className="pl-4 font-semibold">{scheduleInfo?.tenRap}</td>
            </tr>
            <tr>
              <td>Ghế</td>
              <td className="pl-4 font-semibold">
                {bookingUtils.renderSelectedSeat(selectedSeatList)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-1/6 flex justify-center font-semibold text-right text-lg">
        <div>
          <p className="mb-2">Tổng cộng:</p>
          <p className="mb-0">{numberWithCommas(getTotalPrice())} đ</p>
        </div>
      </div>
      <button
        type="button"
        className="w-1/6 px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl focus:ring-4 focus:outline-none focus:ring-red-900 font-medium text-xl text-white transition duration-300"
        onClick={handleBookingConfirm}
      >
        XÁC NHẬN
      </button>
    </div>
  );
}
