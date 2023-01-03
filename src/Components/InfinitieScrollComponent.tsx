import React, { useRef ,useCallback } from 'react'
import { useNavigate,useParams } from "react-router-dom";
import { movieBrief } from '../Interfaces/MovieInterfaces' ;  //interface
import { v4 as uuidv4 } from "uuid";

interface PropsInterfaces{
    movieData : movieBrief[] ;
    hasMore : boolean ;
    setCount : React.Dispatch<React.SetStateAction<number>> ;
    count : number ;
    loading : boolean ;

}

const InfinitieScrollComponent = ({movieData ,hasMore ,setCount,count ,loading}:PropsInterfaces) => {
    
  const navigate = useNavigate();
  const handleEachMovie =(id:number|undefined):void=>{
    navigate(`/watchs/${id}`);
  }

  const observer = useRef<IntersectionObserver|null>(null);
  const options = {
    root: null,
    threshold: 1.0,
  };

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {

      if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
            setCount(count + 1)
        }
      }, options);
      if (node) observer.current.observe(node);

    },
    [movieData]
  );

  return (
    <>

      <div className='brief'>
      <div className='brief-more'>
        {movieData.map((ele)=>{
            return  <div className='more-element' key={uuidv4()} ref={lastElementRef} onClick={()=>{handleEachMovie(ele.id)}}>
                        <div className='brief-img'>
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
        {/* <div className='load-content'>{loading?<span className ="loader"></span>:''}</div> */}
      {loading ? <div className='load-content'><span className ="loader"></span></div> : ''}
      </div>
      </div>

    
    </>
  )
}

export default InfinitieScrollComponent

