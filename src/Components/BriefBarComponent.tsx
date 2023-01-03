import { useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {  movieElementProps } from '../Interfaces/MovieInterfaces' ;  //interface
import { BiChevronRight } from 'react-icons/bi';



const BriefComponent = ({movieCategory ,useHookData}:movieElementProps) => {
  // 電影簡介的各個區塊
  // 接收陣列
  const [count, setCount] = useState(5)
  const navigate = useNavigate();
  const handleMoreMovie =(MoreMovie:string)=>{
    navigate(`/MoreMovie/${MoreMovie}`);
  }
  const handleEachMovie =(id:number|undefined):void=>{
    navigate(`/watchs/${id}`);
  }
  const handleScrollEvent=()=>{
    const exam = document.getElementById(`Nowplay0`) ;
    if(exam){
      const exStyle = exam.getBoundingClientRect() ;
      console.log(exStyle);
    }

    count !==15 ? setCount(state => state+5) : setCount(0) ; //when comes the end turn it back
    const element = document.getElementById(`${movieCategory}${count}`) ;
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' ,block: "nearest", inline: "start"});
    }
  }


  return (
    <div className='brief home-brief'>
    <div className="controll-bar">
    <h2 onClick={()=>{handleMoreMovie(movieCategory)}} className='home-title'>{movieCategory}...</h2>  
    <div className="distance-controller" onClick={handleScrollEvent}><BiChevronRight className="distance-arrow"/></div> 
    </div>
     

    <div className='brief-outerbox'> 
        {useHookData.map((ele ,index)=>{
          // console.log(`${movieCategory}${index}`) // `Nowplay12`
            return  <div className='brief-element' id={`${movieCategory}${index}`} key={`${movieCategory}${index}`} onClick={()=>{handleEachMovie(ele.id)}}>
                        <div className='brief-img'>
                            <img src={ele.posterUrl} alt={ele.originalTitle} />
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
    </div>
  )
}

export default BriefComponent


// https://codesandbox.io/s/netflix-clone-c2397?file=/src/serviceWorker.js



