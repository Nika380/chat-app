import React, { useContext } from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';

function Chat() {

  const {data} = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className='chatIcons'>
          <VideocamIcon width="30px" style={{cursor:"pointer"}}/>
          <PersonAddAlt1Icon width="30px" style={{cursor:"pointer"}}/>
          <MoreHorizIcon width="30px" style={{cursor:"pointer"}}/>
        </div>
      </div>
        <Messages />
        <Input />
    </div>
  )
}

export default Chat