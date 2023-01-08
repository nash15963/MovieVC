/** @format */

// import basic modual
import { useState } from "react";
import "./CssFile/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import page
import HomePage from "./Page/HomePage";
import ErrorPage from "./Page/ErrorPage";
import VideoPage from "./Page/VideoPage";
import MemberPage from "./Page/MemberPage";
import MoreMoviePage from "./Page/MoreMoviePage";
import SearchPage from "./Page/SearchPage";
import ProfilePage from "./Page/ProfilePage";
// import Element
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { movieBrief } from "./Interfaces/MovieInterfaces"; //interface
import { AppCtx } from "./ContextHooks";

function App() {
  const [message, setMessage] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const [movieData, setMovieData] = useState<movieBrief[]>([]);
  const [accessRight, useAccessRight] = useState<boolean>(() => {
    const certificate: string | null = localStorage.getItem("username");
    return certificate ? true : false;
  }); // login certificate
  


  return (
    <>
      <AppCtx.Provider
        value={{
          message,
          setMessage,
          count,
          setCount,
          movieData,
          setMovieData,
          accessRight,
          useAccessRight,
        }}
      >
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/watchs/:movieId" element={<VideoPage />} />
            <Route path="/MoreMovie/:MoreMovie" element={<MoreMoviePage />} />
            <Route path="/search/:query" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/member" element={<MemberPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </Router>
      </AppCtx.Provider>
    </>
  );
}

export default App;

// 增加load animation
// redux or usecontext
