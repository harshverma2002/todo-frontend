import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader'

const Profile = () => {

  const {user,loading,isAuthenticated} = useContext(Context)
  console.log(user)

  return (
    loading?
      <Loader/>
    :(
      <div className='login'>
        <h1>User details</h1>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>
    )
  )
}

export default Profile