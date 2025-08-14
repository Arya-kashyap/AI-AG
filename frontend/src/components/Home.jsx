import React from 'react'
import Sidebar from './Sidebar'
import Hero from './Hero'

function Home() {
     return (
          <div className='flex h-screen bg-[#1e1e1e] text-white'>
               {/* Sidebar */}
               <div className='w-[20%] bg-[#232327]'>
                    <Sidebar />
               </div>
               {/* Main Content */}
               <div className='flex-1 flex flex-col w-full'>
                    <div className='flex-1 flex items-center justify-center px-6'>
                         <Hero />
                    </div>
               </div>
          </div>
     )
}

export default Home
