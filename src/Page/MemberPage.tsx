import React, { useState } from 'react' ;
import Login from '../Member/Login' ;
import Singup from '../Member/Singup' ;

const MemberPage = ({accessRight,useAccessRight}:{accessRight:boolean;useAccessRight:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [usernameForSignup , setUsernameForSignup] = useState('')
    const [passwordForSignup , setPasswordForSignup] = useState('')

    const [username , setUsername] = useState('user')
    const [password , setPassword] = useState('user')

    const [memberMessage , setmMmberMessage] = useState('')
    const [flip , setFlip] = useState(false)

  return (
    <div className='member'>

        {flip ?
        <Singup setUsernameForSignup={setUsernameForSignup} setPasswordForSignup={setPasswordForSignup} setFlip={setFlip}
        setmMmberMessage={setmMmberMessage} usernameForSignup={usernameForSignup} passwordForSignup={passwordForSignup}
        memberMessage={memberMessage} useAccessRight={useAccessRight}
        />
        :
        <Login setUsername={setUsername} setPassword={setPassword} setFlip={setFlip} username={username} 
        password={password} setmMmberMessage={setmMmberMessage} memberMessage={memberMessage} useAccessRight={useAccessRight}
        />
    }
       
    </div>
  )
}

export default MemberPage

// 控制會員狀態