import React, { useEffect, useState ,useRef ,useCallback} from 'react'
import { useNavigate,useParams } from "react-router-dom";
import InfinitieScrollComponent from '../Components/InfinitieScrollComponent';
import { movieBrief } from '../Interfaces/MovieInterfaces' ;  //interface

interface Props{
  movieData : movieBrief[] ;
  count : number ;
  setCount : React.Dispatch<React.SetStateAction<number>> ;
  setMovieData : React.Dispatch<React.SetStateAction<movieBrief[]>> ;
}

const SearchPage = ({movieData ,count ,setCount ,setMovieData}:Props) => {
  let { query } = useParams<{query:string}>() ;
  const [loading, setLoading] = useState<boolean>(true)
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [errorMake, setErrorMake] = useState<boolean>(false);


  let searchApi:string = `https://api.themoviedb.org/3/search/movie?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW&query=${query}&page=${count}` ;
  
  const fetchUrl =(url:string)=>{
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      // console.log(data.total_pages ,`count:`,count) ;
      // console.log(data.results) ;
      (data.results.length === 0) && setErrorMake(true) ; //如果沒有查詢到資料，狀態控制為error    
      (count<data.total_pages) ? setHasMore(true) :setHasMore(false) ; //如果資料頁數大於現在頁數，則狀態控制為還有頁數
      let results:movieBrief[] = data.results.map((ele:any)=>{
        if(ele.poster_path){
          return {
            id :ele.id ,
            title : ele.title ? ele.title : ele.original_title  ,
            originalTitle : ele.original_title ,
            overview :ele.overview ,
            releaseDate:ele.release_date ,
            votePoints :ele.vote_average ,
            popularityPoints :ele.popularity ,
            posterUrl :ele.poster_path ,
          }
        }
        else{
          return ''
        }
      
      }) ;
      let filterResults = results.filter(ele => ele.id) ;
      setMovieData([...movieData , ...filterResults])
      setLoading(false)
    })
    .catch(err=>{
      console.log(err);
      setErrorMake(true)
    }
      )
  }

  useEffect(()=>{
    setLoading(true) ;
    setErrorMake(false)
    count === 0 && setCount(1) ;
    const timer = setTimeout(() => {
        fetchUrl(searchApi)
    }, 800);

    return()=>{
      clearTimeout(timer);
    }
    // keyword ? fetchUrl(keyword) : console.log('wrong');
  },[count])


  return (
    <div className='search-page'>
    {!errorMake ?
      <InfinitieScrollComponent movieData={movieData} hasMore={hasMore} setCount={setCount} count={count} loading={loading} />
      :
      <p className='hasnoMovie'>目前沒有搜尋到您所提供的資訊</p>
    }
    </div>
  )
}

export default SearchPage

//上層邏輯 決定資料
//下層邏輯 提供組件元素 渲染畫面