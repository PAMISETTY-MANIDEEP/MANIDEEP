import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Viewdetails.css";

function Viewdetails() {
    let[details,setDetails]=useState([])
    let[force,setForce]=useState('')
    let navigate=useNavigate()
    useEffect(()=>{
        function handleData(){
        axios.get(`http://localhost:4000/details/`)
        .then((res)=>{
            setDetails(res.data)
        })
        .catch((err)=>{
           console.log(err)
        })

    }
handleData()
},[force])
function deldata(id){
    axios.delete(`http://localhost:4000/details/${id}`)
    .then(()=>{
        alert('data deleted')
        setForce(force+1)

    })
    .catch(()=>{
        alert('invalid')
    })
}
function edit(id){
    navigate(`/update/${id}`)
}
  return (
    <div>
        {details.map((i)=>{
            return(
                <div className="map">
                    <h2>NAME:{i.name}</h2>
                <h2>EMAIL:{i.email}</h2>
                <h2>DOB:{i.dob}</h2>
                <button onClick={()=>{deldata(i.id)}}>delete</button>
                <button onClick={()=>{edit(i.id)}}> update</button>
                </div>
            )
        })}
    </div>
  )
}

export default Viewdetails