import React, { useContext, useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import { Context } from '../main'
import toast from 'react-hot-toast'
import axios from 'axios'
import { server } from '../main'

const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {isAuthenticated,setIsAuthenticated,loading,setloading} = useContext(Context)

  const submitHandler = async(e) =>{
    e.preventDefault() // app wont reload
    setloading(true)
    try {
      const {data}=await axios.post(`${server}/user/login`,{
          email,password
     },{
       headers:{
         "Content-Type":"application/json"
       },
       withCredentials:true,
     })
     toast.success(data.message)
     setloading(false)
     setIsAuthenticated(true)
    } 
    catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response.data.message)
      setIsAuthenticated(false)
    }
  }

  if(isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div>
      <section>
        <form onSubmit={submitHandler}>
          <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)} 
              type="email" 
              placeholder='Email'
              required
          />

          <input 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              type="password" 
              placeholder='Password'
              required
          />
          <button disabled={loading} type='submit'>Log in</button>
          <h4>or</h4>
          <Link to='/register'>Sign up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login