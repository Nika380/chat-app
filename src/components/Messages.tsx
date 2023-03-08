import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase';
import Message from './Message'

function Messages() {

  const {data} = useContext(ChatContext);
  const [messages, setMessages] = useState<DocumentData>([]);

  useEffect(() => {
    
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })
  
    return () => {
      unSub();
    }
  }, [data.chatId]);
  
  
  return (
    <div className='messages'>
      {messages.map((mess: any) => {
        return (
          <Message message={mess} key={mess.id}/>
        )
        
      })}


    </div>
  )
}

export default Messages