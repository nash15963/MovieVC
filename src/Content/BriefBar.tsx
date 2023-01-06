/** @format */

import React, { useEffect, useState } from "react";

import { movieBrief } from "../Interfaces/MovieInterfaces"; //interface
import BriefBarComponent from "../Components/BriefBarComponent";

const BriefBar = () => {
  const [nowPlayData, setNowPlayData] = useState<movieBrief[]>([]);
  const [popular, setPopular] = useState<movieBrief[]>([]);
  const [topRated, setTopRated] = useState<movieBrief[]>([]);
  const [upcoming, setUpcoming] = useState<movieBrief[]>([]);

  //4 types of movies  api
  const nowPlayDataUrl =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW&page=1";
  const popularUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW&page=1";
  const topRatedUrl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW&page=1";
  const upcomingUrl =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW&page=1";

  //to redirect the each movie Page

  const handleFetchData = (
    url: string,
    useHook: React.Dispatch<React.SetStateAction<movieBrief[]>>
  ) => {
    fetch(url)
      .then((res) => res.json())
      .then((myJson) => {
        // console.log(myJson);
        useHook(
          myJson.results.map((ele: any) => {
            return {
              id: ele.id,
              title: ele.title ? ele.title : ele.original_title,
              originalTitle: ele.original_title,
              overview: ele.overview,
              releaseDate: ele.release_date,
              votePoints: ele.vote_average,
              popularityPoints: ele.popularity,
              posterUrl: `https://image.tmdb.org/t/p/w500${ele.poster_path}`,
            };
          })
        );
      })
      .catch((err) => console.log(err));
  };
  // handle movie to Page

  useEffect(() => {
    handleFetchData(nowPlayDataUrl, setNowPlayData);
    handleFetchData(popularUrl, setPopular);
    handleFetchData(topRatedUrl, setTopRated);
    handleFetchData(upcomingUrl, setUpcoming);
  }, []);

  return (
    <div className="brief-grid">
      <BriefBarComponent movieCategory="Nowplay" useHookData={nowPlayData} />
      <BriefBarComponent movieCategory="Popular" useHookData={popular} />
      <BriefBarComponent movieCategory="Top Rated" useHookData={topRated} />
      <BriefBarComponent movieCategory="Upcoming" useHookData={upcoming} />
    </div>
  );
};

export default BriefBar;

//增加 拉軸款式
