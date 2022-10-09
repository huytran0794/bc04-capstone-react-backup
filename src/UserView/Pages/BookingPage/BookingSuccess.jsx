import React from "react";
import { createPortal } from "react-dom";
import { generalStyle } from "../../../styles/movieStyle";
import { bookingUtils } from "./bookingUtils";

export default function BookingSuccess({
  isBookingSuccessOpen,
  handleCloseBookingSuccess,
  selectedSeatList,
  selectedMovieInfo,
}) {
  if (!isBookingSuccessOpen) return null;
  return createPortal(
    <>
      <div style={generalStyle.modalOverlay}></div>
      <div style={generalStyle.modal}>
        <button onClick={handleCloseBookingSuccess}>Close</button>
        <p>{selectedMovieInfo.tenPhim}</p>
        <p>{selectedMovieInfo.ngayChieu}</p>
        <p>{selectedMovieInfo.gioChieu}</p>
        <p>Tên Rạp:</p>
        <p>{selectedMovieInfo.tenCumRap}</p>
        <p>{selectedMovieInfo.tenRap}</p>
        <p>Ghế:</p>
        <p>{bookingUtils.renderSelectedSeat(selectedSeatList)}</p>
        <p>Cảm ơn quý khách đã đặt vé cùng chúng tôi</p>
      </div>
    </>,
    document.getElementById("portal")
  );
}
