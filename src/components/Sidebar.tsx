import React from 'react';
import Chats from './Chats';
import Navigation from './Navigation';
import Search from './Search';

function Sidebar() {
  return (
    <div className='sidebar'>
      <Navigation />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar