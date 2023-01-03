import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { randomMovie } from '../Interfaces/MovieInterfaces';
import RecommendComponent from '../Components/RecommendComponent';

const Recommend = () => {
    const [dataObj, setDataObj] = useState<randomMovie[]>([])
    const [count, setCount] = useState<number>(0)

    const  getRandomInt=(min:number, max:number):number=> {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
        // The maximum is exclusive and the minimum is inclusive
    }

    useEffect(()=>{
        let ignore = false ;
        const HandleFetchMovie =async()=>{

            let randomPageNumber = getRandomInt(1,450) ;
            
            if(randomPageNumber>0){
                let Url:string = `https://api.themoviedb.org/3/movie/top_rated?api_key=7dcd0053886fc8ec5f0fc4ee25fa55a1&language=zh-TW&page=${randomPageNumber}`
                await fetch(Url)
                .then(res=>res.json())
                .then(data=>{

                if(!ignore){
                    let results:randomMovie[] = data.results.map((ele:any)=>{
                        if(ele.poster_path){
                            return {
                              id :ele.id ,
                              title : ele.title ? ele.title : ele.original_title  ,
                              original_title : ele.original_title ,
                              backdrop_path :`https://image.tmdb.org/t/p/w500${ele.backdrop_path}` ,
                            }
                          }
                          else{
                            return ''
                          }
                    })
                    let filterResults = results.filter(ele => ele.id) ;
                    setDataObj([...dataObj , ...filterResults])
                }
            }) 
            }    
        }
        HandleFetchMovie()
        return()=>{
            ignore =true
        }
    },[])


  return (
    <RecommendComponent dataObj={dataObj} />  
  )
}

export default Recommend