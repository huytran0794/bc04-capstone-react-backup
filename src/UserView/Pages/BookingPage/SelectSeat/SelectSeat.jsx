import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { movieServ } from "../../../../services/movieServ";
import { webColor } from "../../../constants/colorConstant";
import {
  setSelectedMovieInfo,
  setSelectedSeatList,
} from "../../../redux/slices/movieSlice";
import SeatDetails from "./SeatDetails";
import SelectedDetailTickets from "./SelectedDetailTickets";

export default function SelectSeat() {
  let [seatsList, setSeatsList] = useState(null);
  let [scheduleInfo, setScheduleInfo] = useState(null);
  let params = useParams();
  let dispatch = useDispatch();
  let selectedSeatList = useSelector((state) => {
    return state.movieSlice.selectedSeatList;
  });
  useEffect(() => {
    movieServ
      .getScheduleDetails(params.maLichChieu)
      .then((res) => {
        // console.log("res");
        setSeatsList(
          res.data.content.danhSachGhe.map(
            (seat) => (seat = { ...seat, selected: false })
          )
        );
        setScheduleInfo(res.data.content.thongTinPhim);
        dispatch(setSelectedSeatList([]));
        dispatch(setSelectedMovieInfo(null));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let handleSelectSeat = (seatInfo) => {
    let newSelectedSeatList = [...selectedSeatList];
    if (seatInfo.daDat) return;
    let selectedSeatIndex = newSelectedSeatList.findIndex(
      (item) => item.maGhe === seatInfo.maGhe
    );
    if (selectedSeatIndex === -1) {
      newSelectedSeatList.push(seatInfo);
      dispatch(setSelectedSeatList(newSelectedSeatList));
      return;
    }
    newSelectedSeatList.splice(selectedSeatIndex, 1);
    dispatch(setSelectedSeatList(newSelectedSeatList));
  };

  let renderSeats = () => {
    // console.log("run 2");
    return (
      <>
        <div className="max-w-lg mx-auto grid grid-cols-10 gap-4">
          {seatsList?.map((seatInfo, index) => (
            <SeatDetails
              key={seatInfo.maGhe.toString() + index}
              seatInfo={seatInfo}
              handleSelectSeat={handleSelectSeat}
              selectedSeatList={selectedSeatList}
            />
          ))}
        </div>
        <div className="max-w-lg mx-auto grid grid-cols-2">
          <div className="flex items-center mt-5">
            <div className="h-5 w-5 mr-3" style={webColor.seat.selected}></div>
            <p className="m-0">Đang chọn</p>
          </div>
          <div className="flex items-center mt-5">
            <div className="h-5 w-5 mr-3" style={webColor.seat.regular}></div>
            <p className="m-0">Thường</p>
          </div>
          <div className="flex items-center mt-5">
            <div className="h-5 w-5 mr-3" style={webColor.seat.booked}></div>
            <p className="m-0">Đã được đặt</p>
          </div>
          <div className="flex items-center mt-5">
            <div className="h-5 w-5 mr-3" style={webColor.seat.vip}></div>
            <p className="m-0">VIP (Prime)</p>
          </div>
        </div>
      </>
    );
  };
  // console.log("run");
  // console.log(selectedSeatList);
  return (
    <div className="container max-w-screen-md mx-auto">
      <div>
        <h2 className="text-white">BOOKING ONLINE</h2>
        <p>
          {scheduleInfo?.tenCumRap} | {scheduleInfo?.tenRap}
        </p>
        <p>
          Giờ chiếu: {scheduleInfo?.gioChieu} {scheduleInfo?.ngayChieu}
        </p>
      </div>
      <div className="my-5">
        <p className="py-2 bg-gray-600 text-center text-xl font-semibold text-white">
          Người/Ghế
        </p>
        <p className="py-2 text-center text-xl font-semibold text-gray-500">
          Màn hình
        </p>
        {renderSeats()}
      </div>
      <SelectedDetailTickets
        scheduleInfo={scheduleInfo}
        selectedSeatList={selectedSeatList}
      />
    </div>
  );
}

// {
//   "thongTinPhim": {
//     "maLichChieu": 25116,
//     "tenCumRap": "CGV - Parkson Đồng Khởi",
//     "tenRap": "Rạp 3",
//     "diaChi": "Tầng 5 Parkson Đồng Khởi, 35bis-45 Lê Thánh Tôn, Bến Nghé, Q.1",
//     "tenPhim": "The Longest Rided 2010",
//     "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/thewalkingdead.jpg",
//     "ngayChieu": "09/01/2019",
//     "gioChieu": "08:01"
//   },
//   "danhSachGhe": [
//     {
//       "maGhe": 76521,
//       "tenGhe": "01",
//       "maRap": 633,
//       "loaiGhe": "Thuong",
//       "stt": "01",
//       "giaVe": 75000,
//       "daDat": false,
//       "taiKhoanNguoiDat": null
//     }]}
