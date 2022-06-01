import './App.css';
import Bar from './Components/AppBar/AppBar';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Posts from './data'
import PostCard from './Components/AppBar/Card';
import { io } from "socket.io-client";



function App() {
  useEffect(()=>{
    const socket=io.connect("http://localhost:5000")
    console.log(socket)
  },[])
  const [user,setUser]=useState("")
  const [username,setUsername]=useState("")

  const handleChange=(e)=>{
    e.preventDefault()
    setUsername(e.target.value)

  }

const handleSubmit=()=>{
  setUser(username);
}
  return (
    <div className='App'>
      {user? (
       <div>
          <Bar user={user} />
       <div className='card'>
         {Posts.map((e)=>{
          return <PostCard props={e} user={user}  />
         })}
       
       </div>
       </div>
      ):(
        <div className='login'>
          <TextField id="standard-basic" name='name' label="USERNAME" variant="standard" onChange={(e)=>{handleChange(e)}}/>
        <Button id="button" variant="contained" onClick={()=>{handleSubmit()}}>Login</Button>

        </div>
        
      )
      
      }
        

    </div>
  )
}

export default App;
