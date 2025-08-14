import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
     return (
          <div className='min-h-screen flex flex-col items-center justify-center bg-[#1e1e1e] px-4'>
               <div className='max-w-md w-full bg-[#2f2f2f] rounded-2xl p-6 shadow-lg text-white'>
                    <h1 className='text-center font-bold mb-2'>Login</h1>

                    <div className='my-3'>
                         <input type="email" name='email' placeholder='Email' className='w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-[#7a6ff0]' />
                    </div>

                    <div className='my-3'>
                         <input type="password" name='password' placeholder='Password' className='w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-[#7a6ff0]' />
                    </div>

                    {/* <span className='text-red-600 text-sm my-3'>Error</span> */}

                    <p className='text-xs text-gray-400 my-3 text-center'>By signing up or logging in, you consent to Chatbot AI's <a href="" className='underline'>Terms of Use</a> and <a href="" className='underline'>Privacy Policy</a></p>

                    <button className='w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg font-semibold transition my-3'>Login</button>

                    <div className='flex justify-between px-2 text-sm mt-1'>
                         <p>Don't have an account?</p>
                         <Link to={'/signup'} className='text-indigo-500 hover:underline'>Signup</Link>
                    </div>
               </div>
          </div>
     )
}

export default Login
