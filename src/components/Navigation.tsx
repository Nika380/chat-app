import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import {auth} from '../firebase';
import { AuthContext } from '../context/AuthContext';

function Navigation() {

  const {currentUser} = useContext(AuthContext);



  return (
    <div className='navigation'>
      <span className='logo'> Nika's Chat</span>
    <div className='user'>
      <img src={currentUser.photoURL} alt="" />
      <span>{currentUser.displayName}</span>
      <Button variant='contained' color='secondary' style={{width:"80px", height:"25px", fontSize:"10px"}} onClick={() => signOut(auth)}>Log out</Button>
    </div>
    </div>
  )
}

export default Navigation