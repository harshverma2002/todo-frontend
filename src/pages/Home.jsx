import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Context, server } from '../main'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import Todoitem from '../components/todoitem'
import { Navigate } from 'react-router-dom'

const Home = () => {

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [loading,setloading] = useState(false)
  const [tasks,setTasks] = useState([])
  const [refresh,setRefresh] = useState(false)
  const {isAuthenticated} = useContext(Context)

  const updateHandler=async(id)=>{
    try {
      const {data} = await axios.put(`${server}/task/${id}`,{},{
        withCredentials:true
      })
      toast.success(data.message)
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }
    
  }
  const deleteHandler=async(id)=>{
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials:true
      })
      toast.success(data.message)
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const submitHandler = async(e)=>{
    e.preventDefault()
    try {
      setloading(true)
      const {data} = await axios.post(`${server}/task/new`,{
        title,
        description,
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      toast.success(data.message)
      setTitle("")
      setDescription("")
      setloading(false)
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setloading(false)
    }
  
  }
  useEffect(() => {
      axios
        .get(`${server}/task/mytasks`,{
        withCredentials:true
        })
        .then((res)=>{
          console.log(res.data.tasks)
          setTasks(res.data.tasks)
        })
        .catch(e=>{
          toast.error(e.response.message)
          console.log(e)
        })

  }, [refresh])

  if(!isAuthenticated) return <Navigate to={'/login'}/>

  return (
    <div className='container'>
      <form onSubmit={submitHandler}>
          <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)} 
              type="text" 
              placeholder='Title'
              required
          />

          <input 
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              type="text" 
              placeholder='Description'
              required
          />
          <button disabled={loading} type='submit'>Add task</button>
        </form>

      <section className="todocontainer">
        {
          tasks.map(i=>(
            <div key={i._id}>
              <Todoitem
                  id={i._id}
                  key={i._id} 
                  title={i.title} 
                  description={i.description}
                  isCompleted = {i.isCompleted} 
                  updateHandler={updateHandler}
                  deleteHandler={deleteHandler}
              />
            </div>
          ))
        }
      </section>
    </div>
  )
}

export default Home