import React, { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
export default function App(){
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'));
  return (
    <div>
      {!authed ? <Auth onAuth={()=>setAuthed(true)} /> : <Dashboard onLogout={()=>{localStorage.removeItem('token'); setAuthed(false);}} />}
    </div>
  )
}
