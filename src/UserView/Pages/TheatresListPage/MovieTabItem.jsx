import { Tag } from "antd";
import moment from "moment";
import React from "react";

export default function MovieTabItem({ movie }) {
  let renderSchedule = (lstLichChieuTheoPhim) => (
    <div>
      {lstLichChieuTheoPhim.slice(0, 5).map((lichChieu, index) => (
        <p key={lichChieu.maLichChieu.toString() + index}>
          {moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YYYY hh:mm a")}
        </p>
      ))}
    </div>
  );
  return (
    <div className="flex items-center">
      <img className="w-1/5" src={movie.hinhAnh} alt={movie.maPhim} />
      <div className="text-white">
        <p>{movie.tenPhim}</p>
        {movie.hot ? <Tag color="#f50">HOT</Tag> : <></>}
        <p>Schedule:</p>
        {renderSchedule(movie.lstLichChieuTheoPhim)}
      </div>
    </div>
  );
}
