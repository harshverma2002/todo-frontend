import React, { useContext, useState } from 'react'
import { Link ,Navigate} from 'react-router-dom'
import axios from "axios"
import { Context, server } from '../main'
import toast from 'react-hot-toast'

const Register = () => {

  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context)

  const submitHandler = async(e) =>{
    e.preventDefault() // app wont reload
    setLoading(true)

    try {
      const {data}=await axios.post(`${server}/user/new`,{
        name,email,password
     },{
       headers:{
         "Content-Type":"application/json"
       },
       withCredentials:true,
     })
     toast.success(data.message)
     setLoading(false)
     setIsAuthenticated(true)
    } 
    catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
      setIsAuthenticated(false)
    }
  }

  if(isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div>
      <section>
        <form onSubmit={submitHandler}>
          <input 
              value={name} 
              onChange={(e)=>setName(e.target.value)} 
              type="text" 
              placeholder='Name'
              required
          />

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

          <button 
              type='submit'
              disabled={loading}
          >Sign up</button>

          <h4>or</h4>
          <Link to='/login'>Log In</Link>
        </form>
      </section>
    </div>
  )
}

export default Register