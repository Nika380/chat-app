import { TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { collection, doc, DocumentData, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import {db} from '../firebase'
import { AuthContext } from '../context/AuthContext';

function Search() {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState<DocumentData | null>(null);
  
  const {currentUser} = useContext(AuthContext);
  
  const handleSearch = async (e: any) => {
      const q = query(collection(db, "users"),
       where("email", "==", e.target.value));

       try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
       } catch (err){
          console.log(err);
       }
  }

  const handleKey = (e: any) => {
      e.code === "Enter" && handleSearch(e);
  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user?.uid
        ? currentUser.uid + user?.uid
        : user?.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user?.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        setUser(null);
        setUsername("")
      }
    } catch (err) {}

    
  };


  return (
    <div className='search'>
        <div className="searchForm" style={{padding: "10px"}}>
          <TextField type="text" label="search users with email" value={username} fullWidth color='info' onChange={(e) =>{ setUsername(e.target.value); handleSearch(e)}}  />
        </div>
        {user && <div className="userChat" onClick={handleSelect}>
          <img src={user?.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user?.displayName}</span>
          </div>
        </div>}
    </div>
  )
}

export default Search