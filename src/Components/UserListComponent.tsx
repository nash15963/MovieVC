import React, { useEffect, useState } from 'react'
import { db } from '../assets/firebase.config' ;
import { collection,doc,getDoc,setDoc ,updateDoc,arrayUnion,getDocs,deleteDoc } from "firebase/firestore";

import { movieBrief } from '../Interfaces/MovieInterfaces';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';



const UserListComponent = () => {
    const navigate = useNavigate();
    const [list, setList] = useState<movieBrief[]>([])
    const [up, setUp] = useState<boolean>(true)
    const [briefDirection, setBriefDirection] = useState<string>('none')
    
    const handleHiddenElement =()=>{
        up ? setUp(false) : setUp(true)
        up ? setBriefDirection('flex') : setBriefDirection('none')
    }

    const handleEachMovie=(id:number)=>{
        navigate(`/watchs/${id}`);
    }

    const handleDeleteMovie =async(id:number)=>{
        const permission = localStorage.getItem('username') ;
        if(id && permission){
            const docRef = doc(db , 'memberData' ,permission,'favorite',id.toString())
            const docSnap = await getDoc(docRef);
            // console.log(docSnap);
            try{
                if(docSnap.exists()){
                    await deleteDoc(doc(db, 'memberData' ,permission,'favorite',id.toString()));
                    console.log('done 1');
                    let filterResults = list.filter(ele => ele.id !== id)
                    console.log(filterResults);
                    setList([...filterResults])
                }
            }
            catch(err){
                console.log(err);
                console.log('err')
            }
        }
    }
    
    useEffect(()=>{
        let ignore = false ;
        const GetSQLData =async()=>{
            const permission = localStorage.getItem('username') ;
            if(permission){   //login in permission
                const querySnapshot = await getDocs(collection(db, "memberData",permission ,'favorite'));
                if(querySnapshot.size>0 && !ignore){ //render once
                    let Objs:movieBrief[] = []
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.id, " => ", doc.data().movieDetal);
                        let newObj = doc.data().movieDetal[0] ;
                        // console.log(newObj);
                        Objs.push(newObj) ;
                    });
                    // console.log(Objs) ;
                    setList([...Objs])
                }
                else{
                    setList([])
                }
            }
            
        }
        GetSQLData()
        return ()=>{
            ignore = true ;
        }
    },[])
    


    return (
        <>
      
      <div className='brief user-list'>
      <h3 onClick={handleHiddenElement}>您的精選片單<span>{up ?<MdKeyboardArrowDown/> :<MdKeyboardArrowUp/>}</span></h3>
        
        {list.length!== 0?
          <div className='brief-more' style={{'display':briefDirection}}>
          {list.map((ele)=>{
              return  <div className='more-element' key={uuidv4()}>
                          <div className='brief-img' onClick={()=>{ele.id ?handleEachMovie(ele.id):''}}>
                              <img src={`https://image.tmdb.org/t/p/w500${ele.posterUrl}`} alt={ele.originalTitle} />
                          </div>
                          <div className='delete' onClick={()=>{ele.id ?handleDeleteMovie(ele.id):''}}>x</div>
                      </div>
          })}
        </div>
        :
        <h5 style={{'display':briefDirection}}>您還沒挑選喜愛的片單</h5>
        
        }
      </div>
      
      
        </>
        )
}

export default UserListComponent