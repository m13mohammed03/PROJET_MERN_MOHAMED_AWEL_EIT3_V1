import React, { useState } from 'react'
import "./adduser.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'


const AddUser = () => {

  const users = {
    name:"",
    email:"",
    address:""
  }

  const [user,setUser] = useState(users)
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const {name,value} = e.target;
    console.log(name,value);
    
    setUser({...user,[name]:value})

  }

  const submitForm = async(e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/user",user)
    .then((response)=>{
      // 
      toast.success(response.data.message,{position:"top-right"})
      navigate("/");
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
      <div className='addUser'>
        <Link to="/" type="button" class="btn btn-secondary"><i class="fa-solid fa-backward"></i> Retour</Link>
        <h3>Ajouter utilisateur</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Nom: </label>
          <input type="text" id='name' onChange={inputHandler} name='name' placeholder='Inserer votre nom' autoComplete='off' />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email: </label>
          <input type="email" id='email' onChange={inputHandler} name='email' placeholder='Inserer votre email' autoComplete='off' />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address: </label>
          <input type="text" id='address' onChange={inputHandler} name='address' placeholder='Inserer votre address' autoComplete='off' />
        </div>
        <div className='inputGroup'>
          <button type="submit" class="btn btn-primary">Confirmer</button>
        </div>
      </form>   
      </div>
  )
}

export default AddUser