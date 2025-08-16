import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
     const [formData, setFormData] = useState({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
     });

     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     const handleChange = (e) => {
          const value = e.target.value;
          const name = e.target.name;
          setFormData({
               ...formData,
               [name]: value
          });
     }

     const handleSignup =async () => {
          setLoading(true);
          setError('');
          try {
               const {data} = await axios.post('/api/users/signup', {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
               }, {
                    withCredentials: true,
                    headers: {
                         'Content-Type': 'application/json'
                    }
               })
               alert(data.message || 'Signup successful!');
               await navigate('/login');
          } catch (error) {
               const msg = error?.response?.data?.errors || "Signup failed"
               setError(msg);
          }
          finally {
               setLoading(false);
          }
     }

     return (
          <div className='min-h-screen flex flex-col items-center justify-center bg-[#1e1e1e] px-4'>
               <div className='max-w-md w-full bg-[#2f2f2f] rounded-2xl p-6 shadow-lg text-white'>
                    <h1 className='text-center font-bold mb-2'>Sign Up</h1>

                    <div className='my-3'>
                         <input type="text"
                              name='firstName'
                              placeholder='First Name'
                              value={formData.firstName}
                              onChange={handleChange}
                              className='w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-[#7a6ff0]' />
                    </div>

                    <div className='my-3'>
                         <input type="text"
                              name='lastName'
                              placeholder='Last Name'
                              value={formData.lastName}
                              onChange={handleChange}
                              className='w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-[#7a6ff0]' />
                    </div>

                    <div className='my-3'>
                         <input type="email"
                              name='email'
                              placeholder='Email'
                              value={formData.email}
                              onChange={handleChange}
                              className='w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-[#7a6ff0]' />
                    </div>

                    <div className='my-3'>
                         <input type="password"
                              name='password'
                              placeholder='Password'
                              value={formData.password}
                              onChange={handleChange}
                              className='w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-[#7a6ff0]' />
                    </div>

                    {error && <p className='text-red-500 text-sm my-2'>{error}</p>}

                    <p className='text-xs text-gray-400 my-3 text-center'>By signing up or logging in, you consent to Chatbot AI's <a href="" className='underline'>Terms of Use</a> and <a href="" className='underline'>Privacy Policy</a></p>

                    <button disabled={loading} onClick={handleSignup} className='w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg font-semibold transition my-3'>{loading ? "Signing..." : "Signup"}</button>

                    <div className='flex justify-between px-2 text-sm mt-1'>
                         <p>Already have an account?</p>
                         <Link to={'/login'} className='text-indigo-500 hover:underline'>Login</Link>
                    </div>
               </div>
          </div>
     )
}

export default Signup
