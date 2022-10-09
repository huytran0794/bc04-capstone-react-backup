import { Tabs } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { movieServ } from "../../../services/movieServ";
import MovieTabItem from "./MovieTabItem";

export default function TheatresListPage() {
  let [theatreChains, setTheatreChains] = useState(null);
  useEffect(() => {
    movieServ
      .getMoviesByTheatres()
      .then((res) => {
        console.log(res);
        setTheatreChains(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let renderTheatreChainsList = () =>
    theatreChains?.map((chain, index) => ({
      label: (
        <img className="w-16 h-16" src={chain.logo} alt={chain.maHeThongRap} />
      ),
      key: chain.maHeThongRap.toString() + index,
      children: (
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          style={{
            height: 400,
          }}
          items={renderTheatresList(chain.lstCumRap)}
        />
      ),
    }));
  let renderTheatresList = (lstCumRap) =>
    lstCumRap?.map((cumRap, index) => ({
      label: (
        <div className="text-left text-white hover:text-red-400">
          <p>{cumRap.tenCumRap}</p>
          <p>{cumRap.diaChi}</p>
        </div>
      ),
      key: cumRap.maCumRap.toString() + index,
      children: (
        <div style={{ height: "400px", overflowY: "scroll" }}>
          {cumRap.danhSachPhim.map((movie, index) => (
            <div key={movie.maPhim.toString() + index}>
              <MovieTabItem movie={movie} />
            </div>
          ))}
        </div>
      ),
    }));
  return (
    <div className="container mx-auto">
      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        style={{
          height: 500,
        }}
        items={renderTheatreChainsList()}
      />
    </div>
  );
}
