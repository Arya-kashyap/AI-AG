import { ArrowUp, Bot, Globe, Paperclip } from 'lucide-react'
import React, {useState} from 'react'
import webLogo from '../../public/webLogo.jpg'

function Hero() {
  const [inputValue, setInputValue] = useState("")
  const [typeMessage, setTypeMessage] = useState("")

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if(!trimmed) return;
    setTypeMessage(trimmed);
    setInputValue("");
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }
  return (
    <div className='flex flex-col items-center justify-between flex-1 w-full px-4 pb-4'>
      {/* Greeting */}
      <div className='text-center'>
        <div className='flex items-center justify-center gap-2'>
          <img src={webLogo} alt="" className='h-10 w-10 rounded-full' />
          <h1 className='text-3xl font-semibold'>Hi! I'm Chatbot AI</h1>
        </div>
        <p className='text-gray-400 text-base mt-2'>How can i help you today?</p>
      </div>

      {/* Chat Interface */}
      <div className='w-full max-w-4xl flex-1 overflow-y-auto m-5 space-y-4 max-h-[60vh] px-1'>
        {typeMessage && (
          <div className='w-full flex justify-end'>
            <div className='bg-blue-500 text-white self-end px-4 py-2 rounded-lg shadow-md max-w-[75%]'>
              {typeMessage}
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className='w-full max-w-4xl relative mt-auto'>
        <div className='bg-[#2f2f2f] rounded-[2rem] px-6 py-8 shadow-md'>
          <input
            type='text'
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Type your message...'
            className='bg-transparent w-full text-white placeholder-gray-400 text-xl outline-none'
          />
          <div className='flex items-center justify-between mt-4 gap-4'>
            <div className='flex gap-2'>
              <button className='flex items-center gap-2 border border-gray-500 text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition'><Bot className='w-4 h-4' />DeepThink (R1)</button>
              <button className='flex items-center gap-2 border border-gray-500 text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition'><Globe className='w-4 h-4' />Search</button>
            </div>
            <div className='flex items-center gap-2'>
              <button className='text-gray-400 hover:text-white transition'><Paperclip className='w-5 h-5' /></button>
              <button onClick={handleSend} className='bg-gray-500 hover:bg-blue-900 p-2 rounded-full text-white transition'><ArrowUp className='w-4 h-4' /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
