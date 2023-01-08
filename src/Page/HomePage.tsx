import { useEffect } from "react";
import BriefBar from '../Content/BriefBar';
import Recommend from '../Content/Recommend';



const HomePage = () => {
    
  useEffect(()=>{
    document.title= 'MovieVC'
  } ,[])

  return (
    <>
    <Recommend></Recommend>
    <BriefBar></BriefBar>
    </>
  )
}

export default HomePage

