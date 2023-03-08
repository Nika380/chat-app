import { TextField, Button } from '@mui/material'
import { useNavigate, Link} from 'react-router-dom';
import { useState } from 'react';
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'


const Login = () => {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  

  const handleSubmit = async (e: any) => {
    e.preventDefault();


   try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  }
   catch (err){
    console.log(err);
   }
    
  }
 


  return (
    <div className='formContainer'>
    <div className='formWrapper'>
      <p className='logo'>Nika's Chat App</p>
      <p className='title'>Login</p>
        <form onSubmit={handleSubmit}>
          <TextField variant='outlined' label="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
          <TextField variant='outlined' label="password" type="password"  onChange={(e) => setPassword(e.target.value)}/>
          <Button variant='contained' type='submit'>Sign In</Button>
          <p>Do not have an account? <Link to="/register">Register</Link> </p>
        </form>
    </div>
</div>
  )

}

export default Login