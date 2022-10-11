import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper modules
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { movieStyle } from "../../../styles/movieStyle";
import { movieServ } from "../../../services/movieServ";
import { NavLink } from "react-router-dom";

export default function MoviesBanner() {
  let [bannerList, setBannerList] = useState(null);
  let [isBannerHovered, setIsBannerHovered] = useState(false);

  useEffect(() => {
    movieServ
      .getMovieBanner()
      .then((res) => {
        console.log(res);
        setBannerList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderBannerDetails = () => {
    if (!bannerList) return null;
    return bannerList.map((banner, index) => {
      return (
        <SwiperSlide key={banner.maPhim.toString() + index}>
          <div
            style={movieStyle.bannerWrapper}
            onMouseEnter={() => setIsBannerHovered(true)}
            onMouseLeave={() => setIsBannerHovered(false)}
          >
            <img
              src={banner.hinhAnh}
              alt={banner.maPhim}
              style={movieStyle.bannerImage}
            />
            <div
              style={movieStyle.bannerOverlay}
              className={isBannerHovered ? "flex" : "hidden"}
            >
              <NavLink to={`/detail/${banner.maPhim}`}>
                <button
                  type="button"
                  class="mr-5 border focus:outline-none focus:ring-4 font-medium rounded-lg text-xl p-8 dark:bg-gray-800/75 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700/75 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Xem chi tiết
                </button>
              </NavLink>
              <NavLink to={`/booking/${banner.maPhim}`}>
                <button
                  type="button"
                  class="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-xl p-8 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Đặt vé
                </button>
              </NavLink>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {renderBannerDetails()}
    </Swiper>
  );
}

// {
//   "maBanner": 1,
//   "maPhim": 1282,
//   "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
// }
