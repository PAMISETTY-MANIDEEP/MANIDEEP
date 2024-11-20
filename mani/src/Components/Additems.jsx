import React, { useState } from 'react';
import axios from 'axios';
import "../styles/Additems.css";

function Additems() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [dob, setDob] = useState('');

    const handleSubmit = (event) => { 
        event.preventDefault(); 
        axios.post("http://localhost:4000/details", { name, email, dob })
         .then((res) => {console.log(res.data);
            alert("Data Submited")
          }) 
         .catch(error => { console.error('There was an error adding the user!', error); });
    }; // Ensure this closing brace is here

    return (
      <div className='additems'>
          <form action="" onSubmit={handleSubmit}>
              <h2>ADD USER</h2> 
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
    );
}

export default Additems;
