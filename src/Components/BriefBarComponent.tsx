/** @format */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { movieElementProps } from "../Interfaces/MovieInterfaces"; //interface
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const BriefComponent = ({ movieCategory, useHookData }: movieElementProps) => {
  // 電影簡介的各個區塊
  // 接收陣列
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  
  const handleMoreMovie = (MoreMovie: string) => {
    navigate(`/MoreMovie/${MoreMovie}`);
  };
  
  const handleEachMovie = (id: number | undefined): void => {
    navigate(`/watchs/${id}`);
  };

  const handleRightScrollEvent = () => {
    if (count === 15) setCount(0);
    else setCount((prev) => prev + 5);
  };

  const handleLeftScrollEvent = () => {
    if (count !== 0) setCount((prev) => prev - 5);
  };

  useEffect(() => {
    const movePosition = () => {
      const element = document.getElementById(`${movieCategory}${count}`);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    };
    movePosition();
  }, [count]);

  return (
    <div className="brief home-brief">
      <div className="controll-bar">
        <h2
          onClick={() => {
            handleMoreMovie(movieCategory);
          }}
          className="home-title"
        >
          {movieCategory}...
        </h2>
      </div>
      <div className="leftArrow-element" onClick={handleLeftScrollEvent}>
        <MdKeyboardArrowLeft className="distance-arrow leftarrow-detail" />
      </div>

      <div className="brief-outerbox">
        {useHookData.map((ele, index) => {
          return (
            <div
              className="brief-element"
              id={`${movieCategory}${index}`}
              key={`${movieCategory}${index}`}
              onClick={() => {
                handleEachMovie(ele.id);
              }}
            >
              <div className="brief-img">
                <img src={ele.posterUrl} alt={ele.originalTitle} />
              </div>

              <div className="brief-hide">
                <p>{ele.title}</p>
                <p>{ele.originalTitle}</p>
                <p>上映日期：{ele.releaseDate}</p>
                <p>人氣：{ele.popularityPoints}</p>
                <p>評價：{ele.votePoints}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rightArrow-element" onClick={handleRightScrollEvent}>
        <MdKeyboardArrowRight className="distance-arrow rightarrow-detail" />
      </div>
    </div>
  );
};

export default BriefComponent;

// https://codesandbox.io/s/netflix-clone-c2397?file=/src/serviceWorker.js


// test