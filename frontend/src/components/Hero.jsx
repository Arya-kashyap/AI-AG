import { ArrowUp, Bot, Globe, Paperclip, Mic, MicOff } from 'lucide-react'
import React, { useRef, useState, useEffect } from 'react'
import webLogo from '../../public/webLogo.jpg'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow as codeTheme } from 'react-syntax-highlighter/dist/esm/styles/prism'
import axios from 'axios'

function Hero() {
  const [inputValue, setInputValue] = useState("")
  const [typeMessage, setTypeMessage] = useState("")
  const [prompt, setPrompt] = useState([])
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false) // 🎙️ mic state
  const promptEndRef = useRef()
  const recognitionRef = useRef(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const storedPrompt = localStorage.getItem(`promptHistory_${user._id}`);
    if (storedPrompt) {
      setPrompt(JSON.parse(storedPrompt));
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem(`promptHistory_${user._id}`, JSON.stringify(prompt));
  }, [prompt]);

  useEffect(() => {
    promptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [prompt, loading])

  // 🎙️ Setup Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + " ";
        } else {
          interim += transcript;
        }
      }
      setInputValue(final + interim); // live text in input
    };

    recognitionRef.current = recognition;
  }, []);

  const handleToggleListening = () => {
    if (!recognitionRef.current) return;
    if (!listening) {
      recognitionRef.current.start();
      setListening(true);
    } else {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setTypeMessage(trimmed);
    setInputValue("");
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post('/api/prompts/promt',
        { contet: trimmed },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      setPrompt((prev) => [...prev,
      { role: 'user', content: trimmed },
      { role: 'assistant', content: data.reply }
      ]);
    } catch (error) {
      setPrompt((prev) => [...prev,
      { role: 'user', content: trimmed },
      { role: 'assistant', content: "Sorry, I couldn't process your request. Please try again later." }
      ]);
    } finally {
      setLoading(false);
      setTypeMessage(null);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div className='flex flex-col items-center justify-between flex-1 w-full px-4 pb-4'>
      {/* Greeting */}
      {!prompt?.length &&
        <div className='text-center'>
          <div className='flex items-center justify-center gap-2'>
            <img src={webLogo} alt="" className='h-10 w-10 rounded-full' />
            <h1 className='text-3xl font-semibold'>Hi! I'm Chatbot AI</h1>
          </div>
          <p className='text-gray-400 text-base mt-2'>How can i help you today?</p>
        </div>
      }

      {/* Chat Interface */}
      <div
        className="w-full max-w-4xl flex-1 overflow-y-scroll h-64 mt-6 mb-4 space-y-4 max-h-[55vh] px-1"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {prompt.map((msg, index) => (
          <div
            key={index}
            className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-start"
              }`}
          >
            {msg.role === "assistant" ? (
              <div className="w-full bg-[#232323] text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={codeTheme}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg mt-2"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-gray-800 px-1 py-0.5 rounded"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="w-[30%] bg-blue-600 text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap self-start">
                {msg.content}
              </div>
            )}
          </div>
        ))}

        {loading && typeMessage && (
          <div className="whitespace-pre-wrap px-4 py-3 rounded-2xl text-sm break-words
           bg-blue-600 text-white self-end ml-auto max-w-[40%]">{typeMessage}</div>
        )}

        {loading && (
          <div className="flex justify-start w-full">
            <div className="bg-[#2f2f2f] text-white px-4 py-3 rounded-xl text-sm animate-pulse">
              🤖Loading...
            </div>
          </div>
        )}
        <div ref={promptEndRef}></div>
      </div>

      {/* Input Box */}
      <div className='w-full max-w-4xl relative mt-auto'>
        <div className='bg-[#2f2f2f] rounded-[2rem] px-6 py-8 shadow-md'>
          <input
            type='text'
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Type your message or speak...'
            className='bg-transparent w-full text-white placeholder-gray-400 text-xl outline-none'
          />
          <div className='flex items-center justify-between mt-4 gap-4'>
            <div className='flex gap-2'>
              <button className='flex items-center gap-2 border border-gray-500 text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition'><Bot className='w-4 h-4' />DeepThink (R1)</button>
              <button className='flex items-center gap-2 border border-gray-500 text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition'><Globe className='w-4 h-4' />Search</button>
            </div>
            <div className='flex items-center gap-2'>
              <button className='text-gray-400 hover:text-white transition'><Paperclip className='w-5 h-5' /></button>

              {/* 🎙️ Voice Button */}
              <button
                onClick={handleToggleListening}
                className={`p-2 rounded-full ${listening ? "bg-red-600" : "bg-gray-500"} text-white transition`}
              >
                {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button onClick={handleSend} className='bg-gray-500 hover:bg-blue-900 p-2 rounded-full text-white transition'><ArrowUp className='w-4 h-4' /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
