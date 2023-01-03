import React, { useState ,useEffect } from 'react'
import { db } from '../assets/firebase.config' ;
import { collection,doc,getDoc,setDoc ,updateDoc,arrayUnion ,deleteDoc} from "firebase/firestore";
import { movieDetail } from '../Interfaces/MovieInterfaces' ;




const WaitingListComponent = ({ videoData ,movieId }:{videoData:movieDetail ,movieId:string}) => {

    const [color, setColor] = useState('#918f8f')
    const [like, setLike] = useState(false)

    const handleClick =async()=>{
        const permission = localStorage.getItem('username')
        if(videoData.id && permission){
            const docRef = doc(db , 'memberData' ,permission,'favorite',movieId)
            const docSnap = await getDoc(docRef);
            console.log(docSnap);
            try{
                if(docSnap.exists()){
                    await deleteDoc(doc(db, 'memberData' ,permission,'favorite',movieId));
                    console.log('done 1');
                    setColor('#918f8f')
                    setLike(false)
                }
                else{
                    await setDoc(docRef,{movieDetal:[{...videoData}]})
                    console.log('done 2')
                    setColor('rgba(255, 0, 132)')
                    setLike(true)
                }
            }
            catch(err){
                console.log(err);
                console.log('err')
            }
        }
        else if(!videoData.id){
            alert('請重新整理網頁')
        }
        else if(!permission){
            alert('請登入會員')
        }
        else{
            alert('請重新整理網頁，不要壞壞')
        }
    }

    useEffect(()=>{
        const permission = localStorage.getItem('username') ;
        const GetSQLData =async()=>{
            if(permission){
                const docRef = doc(db , 'memberData' ,permission,'favorite',movieId)
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    // let likeMovie = docSnap.data().movieDetal ;
                    // console.log(likeMovie);
                    setColor('rgba(255, 0, 132)')
                    setLike(true)
                }
                else{
                    setColor('#918f8f')
                    setLike(false)
                }
            }
            
        }
        GetSQLData()
    },[movieId])

  return (
    <div className='heart-element'>
        <div className='heart' onClick={handleClick} style={{backgroundColor:color}}>
            <div className='heart-before' style={{backgroundColor:color}}></div>
            <div className='heart-after' style={{backgroundColor:color}}></div>
        </div>
        <p className='heart-click'>{like ? '從片單移除' : '加入喜愛片單'}</p>
    </div>
    
  )
}

export default WaitingListComponent

// 
