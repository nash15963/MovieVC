import { useContext, useEffect, useState } from 'react' ;
import Login from '../Member/Login' ;
import Singup from '../Member/Singup' ;

import { AppCtx } from '../ContextHooks';


const MemberPage = () => {
  const { useAccessRight } = useContext(AppCtx) 

    const [usernameForSignup , setUsernameForSignup] = useState('')
    const [passwordForSignup , setPasswordForSignup] = useState('')

    const [username , setUsername] = useState('user')
    const [password , setPassword] = useState('user')

    const [memberMessage , setmMmberMessage] = useState('')
    const [flip , setFlip] = useState(false)
    
    useEffect(() => {
      document.title = "MovieVC";
    }, []);
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