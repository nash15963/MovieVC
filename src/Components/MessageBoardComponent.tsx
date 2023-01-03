import { uuidv4 } from '@firebase/util';
import React, { useEffect, useState,ChangeEvent } from 'react'
import { useParams } from "react-router-dom";

import { db } from '../assets/firebase.config' ;
import { collection,doc,getDoc,setDoc ,updateDoc,arrayUnion } from "firebase/firestore";

interface boardType{
    movieId :string
}
interface movieMessageInterface{
    message:string ;
    date:string ;
    author: string ;
}

const MessageBoardComponent = ({movieId}:boardType) => {

    const [message, setMessage] = useState<string>('')
    const [inputMessage, setInputMessage] = useState<string>('請輸入訊息 ...')
    const [boardMessage, setBoardMessage] = useState<movieMessageInterface[]>([])
    let certificate = localStorage.getItem('username');  //模擬cookie是否存取登入權

    const handleClick =()=>{
        if(typeof certificate === 'string'){
            const handleFetch =async(certificate:string)=>{
                let date = new Date().toDateString();
                if(message === ''){
                    setInputMessage('請輸入您的想法')
                }
                else{
                    const docRef = doc(db , 'messageBoard' ,movieId)
                    const docSnap = await getDoc(docRef);
                    try{
                        if (docSnap.exists()) {
                            let CollectionRef = doc(db , 'messageBoard' ,movieId)
                            await updateDoc(CollectionRef, {
                                allMessage: arrayUnion({
                                    author : certificate ,
                                    message :message ,
                                    date :date
                                })
                            });
                            setBoardMessage([...boardMessage ,{message :message ,date :date ,author : certificate}]);
                            setMessage('') ;
                        }
                        else {
                            await setDoc(doc(db , 'messageBoard' ,movieId), {
                                allMessage:[{
                                    author : certificate ,
                                    message :message ,
                                    date : date
                                }]
                              }); 
                              setBoardMessage([...boardMessage ,{message :message ,date :date ,author : certificate}]);
                              setMessage('') ;
                        }
                      }
                      catch(error){
                        console.log('error')
                        console.log(error);
                      }
                }
            }
            handleFetch(certificate)
        }
        else{
            alert('請先登入會員')
            setInputMessage('請登入會員')
            setMessage('請先登入會員')
        }
        
        

        
    }

    useEffect(()=>{
        let ignore = false ;
        const GetSQLData =async()=>{
            if(!ignore){
                const docRef = doc(db , 'messageBoard' ,movieId)
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    let newmessageArray = docSnap.data().allMessage ;
                    setBoardMessage([...newmessageArray])
                }
                else{
                    setBoardMessage([])
                }
            }
            
        }
        GetSQLData()
        return ()=>{
            ignore = true ;
        }
    },[movieId])

  return (
    <div className='board'>
       
        <div className='board-type'>
            <input type="text"
            value={message}
            placeholder={inputMessage}
            onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                setMessage(event.target.value)
        }}/>
            <button onClick={handleClick} 
            style={message!==''?{ background:'rgba(239, 134, 205, 0.869)'} :{ background:'rgb(199, 197, 197)' }}>留言</button>
        </div>
        
        {boardMessage.length !==0?
         <div className='board-view'>
         {boardMessage.map((event)=>{
             let headPhoto = event.author.slice(0,1) ;
             return <div key={uuidv4()} className='board-message'>
                 <p>
                <span className='board-date'>{event.date}</span>    
                <span className='headPhoto'>{headPhoto}</span>
                <span className='board-author'>@ &nbsp;{event.author}</span>
                 </p>
                 <p className='allmessage'>{event.message}</p>
             </div>
         })}
     </div>
     :
     <h5>目前還沒有觀眾留言，趕快留言成為第一個</h5>
    }
       

    </div>
  )
}

export default MessageBoardComponent
