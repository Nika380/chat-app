import { useState } from 'react';
import {Button, InputLabel, TextField} from '@mui/material'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, db, storage} from '../firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate, Link } from 'react-router-dom';


function Register() {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [file, setFile] = useState(new Blob);
  const navigate = useNavigate();

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  }
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();


   try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    
    const storageRef = ref(storage, email);
  
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_changed', 
      (snapshot) => {
        
      }, 
      (error) => {
        console.log(error)
      }, 
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL
          })
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
        });
      }
    );
    
   }
   catch (err){
    console.log(err);
   }
    

 
  }

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
          <p className='logo'>Nika's Chat App</p>
          <p className='title'>Register</p>
            <form onSubmit={handleSubmit}>
              <TextField variant='outlined' label="display name" onChange={(e) => setDisplayName(e.target.value)}/>
              <TextField variant='outlined' label="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
              <TextField variant='outlined' label="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
              <TextField type="file" id="file" style={{display:'none'}} onChange={handleFileChange}/>  
              <InputLabel htmlFor="file" style={{cursor:"pointer"}}> <AddPhotoAlternateIcon /> Add Profile Picture</InputLabel>         
              <Button variant='contained' type='submit'>Sign Up</Button>
              <p>Already Have an account? <Link to="/login">Sign In</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Register
