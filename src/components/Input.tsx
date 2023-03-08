import { Button, TextField} from '@mui/material'
import { useContext, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import {v4 as uuid} from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function Input() {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);


  const {currentUser}  = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleFileChange = (event: any) => {
    setImg(event.target.files[0]);
  }

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed', 
      (snapshot) => {
        
      }, 
      (error) => {
        console.log(error)
      }, 
      
        () => {
          console.log("Chat Id: " + data.chatId);
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className='input'>
        <TextField type="text" className='inputField' value={text} placeholder='Type Message'  variant="filled" onChange={(e) => setText(e.target.value)}/>
        <div className='send'>
            <label htmlFor="file">
              <AddPhotoAlternateIcon className='picture' style={{cursor:"pointer", width:"30px", height:"30px", color:"purple"}} />
            </label>
            <input type="file" id="file" style={{display: "none"}} onChange={handleFileChange} />
            <Button onClick={handleSend}> 
                 <SendIcon  style={{cursor:"pointer", width:"30px", height:"30px", color:"blue"}} />
            </Button>
        </div>
    </div>
  )
}

export default Input