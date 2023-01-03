import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';

const Signout = ({useAccessRight}:{useAccessRight:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const navigate = useNavigate();
    
    const [up, setUp] = useState<boolean>(true)
    const [briefDirection, setBriefDirection] = useState<string>('none')
    
    const handleHiddenElement =()=>{
        up ? setUp(false) : setUp(true)
        up ? setBriefDirection('flex') : setBriefDirection('none')
    }
    const HandleSignOut =()=>{
        localStorage.removeItem('username')
        useAccessRight(false)
        navigate("/");
    }
  return (
        <div className='signout'>
          <h3 onClick={handleHiddenElement}>會員功能<span>{up ?<MdKeyboardArrowDown/> :<MdKeyboardArrowUp/>}</span></h3>
          <p onClick={HandleSignOut} style={{'display':briefDirection}}>· 會員登出</p>
        </div>
        
  )
}

export default Signout