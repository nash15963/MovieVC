import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from "react-router-dom";
import { movieBrief } from '../Interfaces/MovieInterfaces';
import { v4 as uuidv4 } from "uuid";
import { movieDetail } from '../Interfaces/MovieInterfaces'

// no more movie 需要處理
const RelativeMovieComponents = ({movieId ,setVideoData}:{
  movieId:string ;
  setVideoData:React.Dispatch<React.SetStateAction<movieDetail>>
}) => {

    const [data, setData] = useState<movieBrief[]>([])
    const [errorMake, setErrorMake] = useState<boolean>(false);
    
    let url:string = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW&page=1`
    const navigate = useNavigate();
    
    const handleEachMovie =(id:number|undefined):void=>{
        setVideoData({})
        navigate(`/watchs/${id}`);
    }
    
    const FetchMovieDetail =async(url:string)=>{
        await fetch(url)
          .then(res=>res.json())
          .then((myJson)=>{
            // console.log(myJson) ;
            (myJson.results.length === 0) && setErrorMake(true) ; //如果沒有查詢到資料，狀態控制為error   
            let results:movieBrief[] = myJson.results.map((ele:any)=>{
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
              }) 
            let filterResults = results.filter(ele => ele.id) ;
            let tenResults = filterResults.slice(0,6)
            setData([...tenResults])
          })
          .catch(err=>{
            console.log(err);
            setErrorMake(true)
          }
            )
      }

    useEffect(()=>{
    setErrorMake(false)
    const timer = setTimeout(() => {
        FetchMovieDetail(url)
    }, 800);

    return()=>{
        clearTimeout(timer);
    }
    },[movieId])
  
    return (
  <>

<div className='brief video-relative'>
<h3>也許你還喜歡...</h3>
  
  {data.length!== 0?
    <div className='brief-more'>
    {data.map((ele)=>{
        return  <div className='more-element' key={uuidv4()}>
                    <div className='brief-img' onClick={()=>{handleEachMovie(ele.id)}}>
                        <img src={`https://image.tmdb.org/t/p/w500${ele.posterUrl}`} alt={ele.originalTitle} />
                    </div>
                    
                    <div className='brief-hide'>
                        <p>{ele.title}</p>
                        <p>{ele.originalTitle}</p>
                        <p>上映日期：{ele.releaseDate}</p>
                        <p>人氣：{ele.popularityPoints}</p>
                        <p>評價：{ele.votePoints}</p>
                    </div>
                </div>
    })}
  </div>
  :
  <h5>目前還沒有提供相關資料</h5>
  
  }
</div>


  </>
  )
}

export default RelativeMovieComponents