import { Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { movieServ } from "../../../services/movieServ";

export default function DetailMovie() {
  let [movieDetail, setMovieDetail] = useState(null);

  let params = useParams();

  useEffect(() => {
    movieServ
      .getMovieDetail(params.maPhim)
      .then((res) => {
        // console.log(res);
        setMovieDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <p>Trailer</p>
      <p>{movieDetail?.tenPhim}</p>
      <NavLink to={`/booking/${movieDetail?.maPhim}`}>
        <button>Get Tickets</button>
      </NavLink>
      <div>
        <div>
          <p>Rating: {movieDetail?.danhGia}</p>
          <p>{moment(movieDetail?.ngayKhoiChieu).format("MMM DD,YYYY")}</p>
          {movieDetail?.hot ? <Tag color="#f50">HOT</Tag> : <></>}
        </div>
        <div>{movieDetail?.moTa}</div>
      </div>
    </div>
  );
}

// {
//   "maPhim": 1480,
//   "tenPhim": "The Longest Rided 2010",
//   "biDanh": "the-longest-rided-2010",
//   "trailer": "https://youtu.be/uEDb35R7na8",
//   "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/thewalkingdead.jpg",
//   "moTa": "After an automobile crash, the lives of a young couple intertwine with a much older man, as he reflects back on a past love.",
//   "maNhom": "GP02",
//   "hot": true,
//   "dangChieu": true,
//   "sapChieu": false,
//   "ngayKhoiChieu": "2022-09-25T12:10:53.49",
//   "danhGia": 10
// }
