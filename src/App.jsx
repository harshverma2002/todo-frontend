import { Routes,Route, BrowserRouter as Router} from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context } from "./main"
import { server } from "./main"

function App() {

  const {setUser,setIsAuthenticated,setloading} = useContext(Context)

  useEffect(() => {
    setloading(true)
    axios.get(`${server}/user/me`,{
      withCredentials:true,
    })
    .then((res)=>{
      setUser(res.data.user) 
      setIsAuthenticated(true)
      setloading(false)
    })
    .catch((error)=>{
      setIsAuthenticated(false)
      setloading(false)
    })
  }, [])
  

  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App
