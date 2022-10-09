import React, { useEffect } from "react";
import { useState } from "react";
import { movieServ } from "../../../services/movieServ";
import MoviesBanner from "./MoviesBanner";
import MoviesList from "./MoviesList";

export default function HomePage() {
  let [movies, setMovies] = useState([]);
  useEffect(() => {
    movieServ
      .getMovieList()
      .then((res) => {
        console.log(res);
        setMovies(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto">
      <MoviesBanner />
      <MoviesList moviesList={movies} />
    </div>
  );
}
