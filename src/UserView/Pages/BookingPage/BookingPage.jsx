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
        // console.log(res);
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
          children: renderShowtimeDatesList(rapChieu.lichChieuPhim),
        };
      })}
    />
  );

  const getShowtimeDatesList = (showtimeList) => {
    // if (!showtimeList) return;
    return showtimeList.reduce((showtimeDatesList, showtime) => {
      let indexOfDate = showtimeDatesList.findIndex((schedule) => {
        return (
          moment(schedule).format("DDMMYYYY") ===
          moment(showtime.ngayChieuGioChieu).format("DDMMYYYY")
        );
      });
      if (indexOfDate === -1) {
        let newShowtimeDates = [
          ...showtimeDatesList,
          showtime.ngayChieuGioChieu,
        ];
        return newShowtimeDates;
      }
      return showtimeDatesList;
    }, []);
  };

  const renderShowtimeDatesList = (showtimeList) => {
    let showtimeDatesList = getShowtimeDatesList(showtimeList);
    return (
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={showtimeDatesList?.map((date, index) => {
          let showtimeByDate = showtimeList.filter((showtimeDetail) => {
            return (
              moment(showtimeDetail.ngayChieuGioChieu).format("DDMMYYYY") ===
              moment(date).format("DDMMYYYY")
            );
          });
          return {
            label: (
              <span className="text-white">
                {moment(date).format("DD/MM/YYYY")}
              </span>
            ),
            key: date.toString() + index,
            children: renderShowtimeList(showtimeByDate),
          };
        })}
      />
    );
  };

  const renderShowtimeList = (showtimeList) => {
    console.log(showtimeList);

    return (
      <div>
        {showtimeList.map((showtime, index) => (
          <NavLink
            to={`/selectseat/${showtime.maLichChieu}`}
            key={showtime.maLichChieu.toString() + index}
          >
            <button className="hover:text-blue-400 border border-white hover:border-blue-400 text-sm text-white text-center font-medium rounded-lg px-5 py-2.5 m-2">
              {moment(showtime.ngayChieuGioChieu).format("hh:mm a")}
              {/* 2019-01-01T10:10:00 */}
            </button>
          </NavLink>
        ))}
      </div>
    );
  };

  return <div className="container mx-auto">{renderTheatreChains()}</div>;
}
