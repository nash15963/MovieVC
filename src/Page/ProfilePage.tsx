import React from 'react'
import UserListComponent from '../Components/UserListComponent'
import Signout from '../Member/Signout'

const ProfilePage = ({useAccessRight}:{useAccessRight:React.Dispatch<React.SetStateAction<boolean>>}) => {


  return (
    <div className='profile'>
      <UserListComponent/>
      <Signout useAccessRight={useAccessRight}/>

    </div>
  )
}

export default ProfilePage