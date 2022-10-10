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

  let getYouTubeLink = (shortenLink) => {
    console.log(shortenLink);
    let youTubeIndex = shortenLink.indexOf("youtube.com/embed");
    if (youTubeIndex !== -1) {
      return shortenLink;
    }
    youTubeIndex = shortenLink.indexOf("youtu.be");
    return `https://www.youtube.com/embed/${shortenLink.slice(
      youTubeIndex + 9
    )}`;
  };

  return (
    <div className="container mx-auto">
      <iframe
        width="560"
        height="315"
        src={movieDetail ? getYouTubeLink(movieDetail.trailer) : null}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="movieShortDetails mb-5">
        <div className="flex items-center">
          <p className="mb-0 mr-2 font-bold text-2xl">{movieDetail?.tenPhim}</p>
          {movieDetail?.hot ? (
            <Tag color="#f50" className="font-bold">
              HOT
            </Tag>
          ) : (
            <></>
          )}
        </div>
        <p>
          Rating:{" "}
          <span className="font-semibold text-lg text-red-500">
            {movieDetail?.danhGia}
          </span>
          /10
        </p>
        <NavLink to={`/booking/${movieDetail?.maPhim}`}>
          <button
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            ĐẶT VÉ NGAY
          </button>
        </NavLink>
      </div>
      <div className="movieDesc flex">
        <div className="w-1/4 flex-shrink-0">
          <p className="mb-2 text-lg">Khởi chiếu:</p>
          <p className="mb-2 font-bold text-xl">
            {moment(movieDetail?.ngayKhoiChieu).format("MMM DD, YYYY")}
          </p>
        </div>
        <p className="mb-2 text-xl">{movieDetail?.moTa}</p>
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
