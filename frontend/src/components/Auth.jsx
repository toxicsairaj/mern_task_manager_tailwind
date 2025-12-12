import React, { useState } from 'react';
import api from '../api';

export default function Auth({ onAuth }){
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name:'', email:'', password:'' });

  async function submit(e){
    e.preventDefault();
    try{
      if(isLogin){
        const res = await api.post('/auth/login', { email: form.email, password: form.password });
        localStorage.setItem('token', res.data.token);
        onAuth();
      }else{
        await api.post('/auth/register', { name: form.name, email: form.email, password: form.password });
        setIsLogin(true);
      }
    }catch(err){
      alert('Auth error');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Task Manager</h2>
        <form onSubmit={submit} className="space-y-3">
          {!isLogin && <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="input input-bordered w-full" />}
          <input required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="input input-bordered w-full" />
          <input required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="input input-bordered w-full" />
          <button className="btn btn-primary w-full">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <div className="text-center mt-3">
          <button className="text-sm text-blue-600" onClick={()=>setIsLogin(!isLogin)}>{isLogin ? 'Switch to Register' : 'Switch to Login'}</button>
        </div>
      </div>
    </div>
  )
}
