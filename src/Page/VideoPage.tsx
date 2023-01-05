/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { movieDetail } from "../Interfaces/MovieInterfaces";
import MessageBoardComponent from "../Components/MessageBoardComponent";
import RelativeMovieComponents from "../Components/RelativeMovieComponents";

import YouTube, { YouTubeProps } from "react-youtube";

import WaitingListComponent from "../Components/WaitingListComponent";
// 這頁右半部需要相似影片 done
// 錯誤網址處理 904551 done

type idType = {
  movieId: string;
};

const Watch = () => {
  const { movieId } = useParams<idType>();

  const [videoKey, setVideoKey] = useState<string>("");
  const [videoData, setVideoData] = useState<movieDetail>({});
  const [noVideo, setNoVideo] = useState(false);
  const [videoLoad, setVideoLoad] = useState(true);

  const [showMore, setShowMore] = useState(true);

  const FetchMovieDetail = async () => {
    if (movieId) {
      const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW`;
      await fetch(detailUrl)
        .then((res) => res.json())
        .then((myJson) => {
          setVideoData({
            // TODO:add other detail ?
            id: myJson.id,
            title: myJson.title ? myJson.title : myJson.original_title,
            originalTitle: myJson.original_title,
            overview: myJson.overview,
            releaseDate: myJson.release_date,
            votePoints: myJson.vote_average,
            popularityPoints: myJson.popularity,
            posterUrl: `https://image.tmdb.org/t/p/w500${myJson.poster_path}`,
          });
        });
    } else {
      setVideoData({});
    }
  };

  const FetchMovieVideo = async () => {
    if (movieId) {
      const EnVideoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=en-US`;
      await fetch(EnVideoUrl)
        .then((res) => res.json())
        .then((myJson) => {
          myJson.results.length !== 0
            ? setVideoKey(myJson.results[0].key)
            : setNoVideo(true);
        });
    } else {
      setNoVideo(true);
    }
    setVideoLoad(false);
  };

  // const opts: YouTubeProps["opts"] = {
  //   height: "390",
  //   width: "640",
  // };
  // youtube iframe package params

  const HandleHideDetail = () => {
    showMore ? setShowMore(false) : setShowMore(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setVideoLoad(true);
    const timer = setTimeout(() => {
      FetchMovieDetail();
      FetchMovieVideo();
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [movieId]);

  return (
    <div className="video-parent">
      <div className="size-controller">
        <div className="video-frame">
          {videoLoad ? (
            <div className="loading"></div>
          ) : noVideo ? (
            <h5>很抱歉，目前沒有關於這部電影的影片</h5>
          ) : (
            <YouTube videoId={videoKey} />
          )}
        </div>
      </div>

      {movieId ? (
        <div className="video-detail">
          <p>中文片名 ： {videoData.title}</p>
          <p>英文片名 ： {videoData.originalTitle}</p>

          {!showMore ? (
            <div className="hide-detail">
              <p>上映日期 ： {videoData.releaseDate}</p>
              <p>人氣分數 ： {videoData.popularityPoints} </p>
              <p>投票分數： {videoData.votePoints}</p>
              <p>電影簡介 ： {videoData.overview}</p>
            </div>
          ) : (
            ""
          )}

          <WaitingListComponent videoData={videoData} movieId={movieId} />
          {showMore ? (
            <p className="skip-line" onClick={HandleHideDetail}>
              完整資訊...
            </p>
          ) : (
            <p className="skip-line" onClick={HandleHideDetail}>
              更少資訊
            </p>
          )}
        </div>
      ) : (
        ""
      )}

      {movieId ? <MessageBoardComponent movieId={movieId} /> : ""}

      {movieId ? (
        <RelativeMovieComponents
          movieId={movieId}
          setVideoData={setVideoData}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Watch;

// 錯誤處理

// https://dev.to/stackfindover/youtube-loading-animation-using-html-and-css-44c2
// youtube loading animation
