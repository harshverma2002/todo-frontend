import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios'
import { server } from '../main'
import toast from 'react-hot-toast'


const Header = () => {

  const {isAuthenticated,setIsAuthenticated} = useContext(Context)
  const {loading,setloading} = useContext(Context)
  
  const logoutHandler = async(e) =>{
    setloading(true)
    try {
      await axios.get(`${server}/user/logout`,{
       withCredentials:true,
     })

     toast.success("logged out")
     setIsAuthenticated(false)
     setloading(false)
    } 
    catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response.data.message)
      setIsAuthenticated(true)
    }
  }


  return (
    <nav className='header'>
        <div>
            <h2>TODO APP</h2>
        </div>
        <article>
            <Link className='nav-btn' to="/">Home</Link>
            <Link className='nav-btn'  to="/profile">Profile</Link>
            {
              isAuthenticated ?(
                <button disabled={loading} onClick={logoutHandler} className ='logout nav-btn'>Log out</button>
              )
              :(
                <Link className='nav-btn' to="/login">Login</Link>
              )
            }
        </article>
    </nav>
  )
}

export default Header