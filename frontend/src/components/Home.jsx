import React from 'react'
import Sidebar from './Sidebar'
import Hero from './Hero'
import { PanelRightOpen } from 'lucide-react';

function Home() {
     const [showSideBar, setShowSideBar] = React.useState(false);
     console.log({ showSideBar });
     return (
          <div className='flex h-screen bg-[#1e1e1e] text-white'>
               {/* Sidebar */}
               {showSideBar ?
                    <div className='w-[20%] bg-[#232327]'>
                         <Sidebar setShowSideBar={setShowSideBar} />
                    </div> :
                    <button onClick={() => {
                         setShowSideBar(true);
                    }}
                         style={{ height: '60px', marginLeft: '20px' }}><PanelRightOpen /> </button>
               }
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
