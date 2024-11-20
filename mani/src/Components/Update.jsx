import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import "../styles/Update.css";

export default function Update() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [dob, setDob] = useState('');
    let payload={name,email,dob}

    useEffect(()=>{
        axios.get(`http://localhost:4000/details/${params.id}`)
        .then((res)=>{
            setName(res.data.name)
            setEmail(res.data.email)
            setDob(res.data.dob)
        })
        .catch((err)=>{
           console.log(err)
        })


},[])
let params=useParams()
function updata(e){
    e.preventDefault()
    axios.put(`http://localhost:4000/details/${params.id}`,payload)
    .then(()=>{
        alert('dataupdated')
    })
    .catch(()=>{
        alert('invalid')
    })
}


  return (
    <div className='form'>
      <form action="" onSubmit={updata}>
              <h2>Add User</h2> 
              <label> Name: 
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> 
              </label>
              <label> Email: 
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> 
              </label>
              <label> Date of Birth: 
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} /> 
              </label>
              <button type="submit">Submit</button>
          </form>
    </div>
  )
}
