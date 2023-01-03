import './CssFile/App.css'
import HomePage from './Page/HomePage'
import ErrorPage from './Page/ErrorPage';
import VideoPage from './Page/VideoPage';
import MoreMoviePage from './Page/MoreMoviePage';
// import outer file

// import Element
import Header from './Header/Header';
import Footer from './Footer/Footer';
import MemberPage from './Page/MemberPage';
//import package

import { BrowserRouter as Router ,Routes ,Route} from "react-router-dom";
import SearchPage from './Page/SearchPage';
import { useState } from 'react';

import { movieBrief } from './Interfaces/MovieInterfaces' ;  //interface
import ProfilePage from './Page/ProfilePage';


function App() {
  const [message, setMessage] = useState('');
  const [count, setCount] = useState<number>(1)
  const [movieData, setMovieData] = useState<movieBrief[]>([])
  const [accessRight, useAccessRight] = useState<boolean>(()=>{
    let certificate = localStorage.getItem('username'); 
    return certificate ?  true : false
  }) ; // login certificate
  return (
    <>
      <Router>
      <Header  message={message} setMessage={setMessage} setCount={setCount} setMovieData={setMovieData}
       accessRight={accessRight} useAccessRight={useAccessRight} />

        <Routes>

          <Route path='/' element={<HomePage />}></Route>
          <Route path='/watchs/:movieId' element={<VideoPage/>}/>
          
          
          <Route path='/MoreMovie/:MoreMovie' element={<MoreMoviePage/>}/>
          <Route path='/search/:query' element={<SearchPage 
          count={count} setCount={setCount} setMovieData={setMovieData} movieData={movieData}/>}/>

          <Route path='/profile' element={<ProfilePage useAccessRight={useAccessRight}/>}/>
          <Route path='/member' element={<MemberPage accessRight={accessRight} useAccessRight={useAccessRight}/>}/>
          <Route path='*' element={<ErrorPage/>}/>

        </Routes>

      <Footer/>

      </Router>
    </>
  )
}

export default App

// 增加load animation
// redux or usecontext