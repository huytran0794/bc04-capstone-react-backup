import React from "react";
import { Card } from "antd";
import { webColor } from "../../constants/colorConstant";
import moment from "moment";
import { hideLongString } from "../../../utils/utils";
import { NavLink } from "react-router-dom";

export default function MoviesList({ moviesList }) {
  let renderMovieItem = (movie) => (
    <>
      <Card
        style={{
          width: "100%",
          height: 600,
          background: webColor.bgPrimary,
          color: "white",
        }}
        bordered={false}
        cover={
          <img
            alt={movie.biDanh}
            src={movie.hinhAnh}
            style={{ height: "400px", objectFit: "cover" }}
          />
        }
      >
        <p>{movie.tenPhim}</p>
        <p className="text-justify">{hideLongString(movie.moTa, 70)}</p>
        <p>Released {moment(movie.ngayKhoiChieu).format("MMM Do, YYYY")}</p>
        <div className="flex justify-between">
          <NavLink to={`/detail/${movie.maPhim}`}>
            <button>Details</button>
          </NavLink>
          <NavLink to={`/booking/${movie.maPhim}`}>
            <button>Get Tickets</button>
          </NavLink>
        </div>
      </Card>
    </>
  );
  return (
    <div className="grid grid-cols-5 gap-5">
      {moviesList.map((movie, index) => (
        <div key={movie.maPhim.toString() + index}>
          {renderMovieItem(movie)}
        </div>
      ))}
    </div>
  );
}

// {
//     "maPhim": 1480,
//     "tenPhim": "The Longest Rided 2010",
//     "biDanh": "the-longest-rided-2010",
//     "trailer": "https://youtu.be/uEDb35R7na8",
//     "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/thewalkingdead.jpg",
//     "moTa": "After an automobile crash, the lives of a young couple intertwine with a much older man, as he reflects back on a past love.",
//     "maNhom": "GP02",
//     "ngayKhoiChieu": "2022-09-25T12:10:53.49",
//     "danhGia": 10,
//     "hot": true,
//     "dangChieu": true,
//     "sapChieu": false
// }