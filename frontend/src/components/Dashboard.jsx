import React, { useEffect, useState } from 'react';
import api from '../api';

function TaskItem({t, onToggle, onDelete}){
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={t.completed} onChange={()=>onToggle(t)} className="checkbox" />
        <div className={t.completed ? 'line-through text-slate-500' : ''}>{t.title}</div>
      </div>
      <button className="btn btn-sm btn-error" onClick={()=>onDelete(t._id)}>Delete</button>
    </div>
  )
}

export default function Dashboard({ onLogout }){
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');

  async function load(){ 
    try{
      const res = await api.get('/tasks', { headers: { Authorization: 'Bearer '+token }});
      setTasks(res.data);
    }catch(err){ setTasks([]); }
  }
  useEffect(()=>{ load(); }, []);

  async function add(){
    if(!text) return;
    await api.post('/tasks', { title: text }, { headers: { Authorization: 'Bearer '+token }});
    setText(''); load();
  }

  async function toggle(t){
    await api.put('/tasks/'+t._id, { title: t.title, completed: !t.completed }, { headers: { Authorization: 'Bearer '+token }});
    load();
  }

  async function remove(id){
    await api.delete('/tasks/'+id, { headers: { Authorization: 'Bearer '+token }});
    load();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <div className="flex gap-2">
            <button className="btn" onClick={onLogout}>Logout</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow mb-4">
          <div className="flex gap-2">
            <input value={text} onChange={e=>setText(e.target.value)} placeholder="New task" className="input input-bordered flex-1" />
            <button onClick={add} className="btn btn-primary">Add</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          {tasks.length === 0 ? <div className="text-slate-500">No tasks yet</div> :
            tasks.map(t=> <TaskItem key={t._id} t={t} onToggle={toggle} onDelete={remove} />)
          }
        </div>
      </div>
    </div>
  )
}
