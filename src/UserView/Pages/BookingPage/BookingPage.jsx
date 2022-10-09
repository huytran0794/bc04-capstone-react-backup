import { Tabs } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { movieServ } from "../../../services/movieServ";

export default function BookingPage() {
  let [bookingInfo, setBookingInfo] = useState(null);
  let params = useParams();
  useEffect(() => {
    movieServ
      .getMovieShowtimes(params.maPhim)
      .then((res) => {
        console.log(res);
        setBookingInfo(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChange = (key) => {
    console.log(key);
  };
  const renderTheatreChains = () => (
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      items={bookingInfo?.heThongRapChieu.map((heThongRap, index) => {
        return {
          label: (
            <img
              className="w-16 h-16"
              src={heThongRap.logo}
              alt={heThongRap.maHeThongRap}
            />
          ),
          key: heThongRap.maHeThongRap.toString() + index,
          children: renderTheatreList(heThongRap.cumRapChieu),
        };
      })}
    />
  );

  const renderTheatreList = (cumRapChieu) => (
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      items={cumRapChieu?.map((rapChieu, index) => {
        return {
          label: <span className="text-white">{rapChieu.tenCumRap}</span>,
          key: rapChieu.maCumRap.toString() + index,
          children: renderShowtimeList(rapChieu.lichChieuPhim),
        };
      })}
    />
  );

  const renderShowtimeList = (showtimeList) => {
    console.log(showtimeList);
    return (
      <div>
        {showtimeList.map((showtime, index) => (
          <NavLink
            to={`/selectseat/${showtime.maLichChieu}`}
            key={showtime.maLichChieu.toString() + index}
          >
            <button className="hover:text-blue-400 border border-white hover:border-blue-400 text-sm text-white text-center font-medium rounded-lg px-5 py-2.5 mr-2 mb-2">
              {moment(showtime.ngayChieuGioChieu).format("DD/MM/YYYY hh:mm a")}
            </button>
          </NavLink>
        ))}
      </div>
    );
  };

  return <div className="container mx-auto">{renderTheatreChains()}</div>;
}
