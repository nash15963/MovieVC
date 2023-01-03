import React , { ChangeEvent } from 'react' ;
import { db } from '../assets/firebase.config' ;
import { collection,doc,getDoc,setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


interface singupInterface{
    setUsernameForSignup : React.Dispatch<React.SetStateAction<string>> ;
    setPasswordForSignup : React.Dispatch<React.SetStateAction<string>> ;
    setFlip : React.Dispatch<React.SetStateAction<boolean>> ;
    setmMmberMessage : React.Dispatch<React.SetStateAction<string>> ;
    usernameForSignup : string ;
    passwordForSignup : string ;
    memberMessage: string ;
    useAccessRight :React.Dispatch<React.SetStateAction<boolean>> ;
}

const Singup = ({ setUsernameForSignup ,setPasswordForSignup ,setFlip 
    ,setmMmberMessage ,usernameForSignup ,passwordForSignup ,memberMessage ,useAccessRight}:singupInterface) => {
    const navigate = useNavigate();
    const handleClick=()=>{
        
        const handleFetch = async()=>{
            if(usernameForSignup === '' || passwordForSignup===''){
                setmMmberMessage('請確認輸入帳號或密碼')
            }
            else{
                const docRef = doc(db , 'memberData' ,usernameForSignup)
                const docSnap = await getDoc(docRef);
                try{
                    if (docSnap.exists()) {
                        // console.log("Document data:", docSnap.data());
                        setmMmberMessage('這個帳號已有人使用')} 
                    else {
                        console.log("No such document!");
                        let usersCollectionRef = collection(db,'memberData');
                        await setDoc(doc(usersCollectionRef,usernameForSignup), {
                            password:passwordForSignup
                          }); 
                        setmMmberMessage('註冊成功')
                        useAccessRight(true)
                        localStorage.setItem('username' ,usernameForSignup)
                        navigate("/");
                      }
                  }
                  catch(error){
                    console.log('error')
                    setmMmberMessage('停滯時間過長，請重新整理網頁')
                  }
                  }
            }
            handleFetch()
        }
        

  return (
    <fieldset className='member-sign'>
        <legend>會員註冊</legend>
        <p>
            <input  type="text" 
                    required 
                    placeholder='username'
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                        setmMmberMessage('')
                        setUsernameForSignup(e.target.value)
                    }}/>
        </p>

        <p>
            <input  type="password" 
                    required 
                    placeholder='password'
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{setPasswordForSignup(e.target.value)}}
                
            />
        </p>
        <p className='member-note'>{memberMessage}</p> 
        <div><button onClick={handleClick}>Send</button></div>
        <p>已經有會員帳號了嗎？ <span onClick={()=>{setFlip(false)}}>登入會員</span></p>
        
    </fieldset>
  )
}

export default Singup