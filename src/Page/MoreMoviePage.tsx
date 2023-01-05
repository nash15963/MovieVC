/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieBrief } from "../Interfaces/MovieInterfaces"; //interface
import InfinitieScrollComponent from "../Components/InfinitieScrollComponent";

const MoreMovie = () => {
  // fetch data
  // 判斷式url
  // 無限loading
  const { MoreMovie } = useParams();
  const [count, setCount] = useState<number>(1);
  const [movieData, setMovieData] = useState<movieBrief[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState(false);
  const navigate = useNavigate();

  const dataApi = () => {
    let url: string;
    if (MoreMovie === "Nowplay") {
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW&page=`;
      return url;
    } else if (MoreMovie === "Popular") {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW&page=`;
      return url;
    } else if (MoreMovie === "Top Rated") {
      url = `https://api.themoviedb.org/3/movie/top_rated?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW&page=`;
      return url;
    } else if (MoreMovie === "Upcoming") {
      url = `https://api.themoviedb.org/3/movie/upcoming?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW&page=`;
      return url;
    }
  };

  const fetchUrl = () => {
    const url = dataApi();
    // console.log(`${url}${count}`);  //error
    fetch(`${url}${count}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // console.log(data.total_pages ,`count:`,count) ;
        count < data.total_pages ? setHasMore(true) : setHasMore(false);
        const results: movieBrief[] = data.results.map((ele: any) => {
          if (ele.poster_path) {
            return {
              id: ele.id,
              title: ele.title ? ele.title : ele.original_title,
              originalTitle: ele.original_title,
              overview: ele.overview,
              releaseDate: ele.release_date,
              votePoints: ele.vote_average,
              popularityPoints: ele.popularity,
              posterUrl: ele.poster_path,
            };
          } else {
            return "";
          }
        });
        const filterResults = results.filter((ele) => ele.id);
        setMovieData([...movieData, ...filterResults]);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchUrl();
    }, 800);

    return () => {
      clearTimeout(timer);
    };
    // keyword ? fetchUrl(keyword) : console.log('wrong');
  }, [count]);

  return (
    <div className="more-movie">
      <h3
        className="moremovie-title"
        onClick={() => {
          navigate("/");
        }}
      >
        {MoreMovie}...
      </h3>
      <InfinitieScrollComponent
        movieData={movieData}
        hasMore={hasMore}
        setCount={setCount}
        count={count}
        loading={loading}
      />
    </div>
  );
};

export default MoreMovie;
