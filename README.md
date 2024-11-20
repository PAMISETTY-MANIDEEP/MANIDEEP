markdown
# User Registration App

## Project Structure
user-registration-app/ ├── backend/ │ ├── server.js│ ├── ... ├── frontend/ │ ├── src/ │ ├── public/ │ ├── package.json│ ├── ...


## Backend Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) (or any other database you are using)

### Steps to Run Backend

1. **Navigate to the backend directory:**
   ```bash
   cd backend
Install dependencies:

bash
npm install
Set up environment variables: Create a .env file in the backend directory with the following content:

env
PORT=4000
MONGO_URI=your_mongodb_connection_string
Start the backend server:

bash
npm start
API Endpoints
GET /details: Retrieve all users

POST /details: Add a new user

PUT /details/:id: Update an existing user

DELETE /details/:id: Delete a user

Frontend Setup
Prerequisites
Node.js installed

Steps to Run Frontend
Navigate to the frontend directory:

bash
cd frontend
Install dependencies:

bash
npm install
Start the frontend development server:

bash
npm start
Running the Application
Ensure both the backend and frontend servers are running.

Open your browser and go to:

http://localhost:3000
Components and Routes
App.js
The main application component that sets up the routes for your application.

javascript
import React from 'react'
import Additems from './Components/Additems'
import Viewdetails from './Components/Viewdetails'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Components/Homepage'
import Update from './Components/Update'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/viewdetails' element={<Viewdetails />} />
          <Route path='/additems' element={<Additems />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
Additems.js
Component for adding new users.

javascript
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
      .then((res) => {
        console.log(res.data);
        alert("Data Submitted");
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };

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
Homepage.js
Component for the home page with navigation links.

javascript
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Homepage.css";

export default function Homepage() {
  return (
    <div className='home'>
      <Link to='/additems'>Register</Link>
      <Link to='/viewdetails/'>View Details</Link>
    </div>
  );
}
Update.js
Component for updating existing user details.

javascript
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/Update.css";

export default function Update() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  let payload = { name, email, dob };

  useEffect(() => {
    axios.get(`http://localhost:4000/details/${params.id}`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setDob(res.data.dob);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let params = useParams();

  function updata(e) {
    e.preventDefault();
    axios.put(`http://localhost:4000/details/${params.id}`, payload)
      .then(() => {
        alert('Data Updated');
      })
      .catch(() => {
        alert('Invalid');
      });
  }

  return (
    <div className='form'>
      <form action="" onSubmit={updata}>
        <h2>Update User</h2>
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
Viewdetails.js
Component for viewing and managing user details.

javascript
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Viewdetails.css";

function Viewdetails() {
  let [details, setDetails] = useState([]);
  let [force, setForce] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    function handleData() {
      axios.get(`http://localhost:4000/details/`)
        .then((res) => {
          setDetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    handleData();
  }, [force]);

  function deldata(id) {
    axios.delete(`http://localhost:4000/details/${id}`)
      .then(() => {
        alert('Data Deleted');
        setForce(force + 1);
      })
      .catch(() => {
        alert('Invalid');
      });
  }

  function edit(id) {
    navigate(`/update/${id}`);
  }

  return (
    <div>
      {details.map((i) => {
        return (
          <div className="map" key={i.id}>
            <h2>NAME: {i.name}</h2>
            <h2>EMAIL: {i.email}</h2>
            <h2>DOB: {i.dob}</h2>
            <button onClick={() => { deldata(i.id) }}>Delete</button>
            <button onClick={() => { edit(i.id) }}>Update</button>
          </div>
        );
      })}
    </div>
  );
}

export default Viewdetails;
