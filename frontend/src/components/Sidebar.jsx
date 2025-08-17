import React from 'react'
import { LogOut, PanelRightOpen, X } from 'lucide-react'
import userImg from '../../public/userImg.webp'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthProvider'

function Sidebar({ setShowSideBar }) {

     const navigate = useNavigate();
     const [, setAuthUser] = useAuth();
     const user = JSON.parse(localStorage.getItem('user'));

     const handleLogout = async () => {
          const { data } = await axios.post('/api/users/logout', {
               withCredentials: true,
          });
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          alert(data.message);
          setAuthUser(null);
          navigate('/login');
     }

     return (
          <div className='h-full flex flex-col'>
               {/* Header */}
               <div className='flex items-center justify-between p-4 border-b border-gray-700'>
                    <div className='text-xl font-bold'>Chatbot AI</div>
                    <button onClick={() => setShowSideBar(false)}><PanelRightOpen className='text-gray-300 w-6 h-6' /></button>
               </div>

               {/* History */}
               <div className='flex-1 overflow-y-auto p-4 space-y-3'>
                    <button className='w-full bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl'>+ New Chat</button>
                    <div className='text-gray-500 text-sm text-center'>No chat history yet</div>
               </div>

               {/* Footer */}
               <div className='p-4 border-t border-gray-700'>
                    <div className='flex flex-col gap-3'>
                         <div className='flex items-center gap-2 cursor-pointer'>
                              <img className='rounded-full w-8 h-8' src={userImg} alt="" />
                              <span className='text-gray-300'>{user.firstName}</span>
                         </div>
                         <button onClick={handleLogout} className='flex items-center text-sm gap-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition'><LogOut />Logout</button>
                    </div>
               </div>
          </div>
     )
}

export default Sidebar
