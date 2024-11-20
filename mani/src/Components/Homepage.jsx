import React from 'react'
import {Link} from 'react-router-dom'
import "../styles/Homepage.css";
export default function Homepage() {
  return (
    <div className='home'>
        <Link to='/additems'>Register</Link>
        <Link to='viewdetails/'>View Details</Link>
    </div>
  )
}
