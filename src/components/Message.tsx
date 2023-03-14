import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

function Message({ message }: any) {

  const {currentUser}  = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef<HTMLDivElement>(null);  
  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  },[]);


  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`} ref={ref}>
            <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        { message.img && 
          <img src={message.img} alt="" />}
      </div>
    </div>
  )
}


export default Message