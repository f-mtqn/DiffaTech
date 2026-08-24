import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Dummy messages matching Figma design
const initialMessages = [
  {
    id: 1,
    sender: 'hr',
    senderName: 'Hallan Han',
    avatar: null,
    time: '12:45 AM',
    text: 'Hai Yuka, selamat ya! 🎉\nKamu diterima di Company In untuk posisi UI Designer.\nKamu bisa langsung akses dashboard karyawan di website kami.\nTerima kasih sudah berproses bersama kami 🙏',
  },
  {
    id: 2,
    sender: 'user',
    senderName: 'Yuka Minato',
    avatar: null,
    time: '12:55 AM',
    text: 'Alhamdulillah, terima kasih banyak kak! 🙏\nSaya senang banget bisa bergabung 😊',
  },
];

const RoomChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const msg = {
      id: messages.length + 1,
      sender: 'user',
      senderName: 'Yuka Minato',
      avatar: null,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      text: newMessage.trim(),
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen max-h-screen flex flex-col bg-slate-50 font-['Inter']">
      {/* Navbar */}
      <Navbar />

      {/* Chat Area — below navbar */}
      <div className="flex-1 flex flex-col min-h-0 pt-[68px]">
        {/* Chat Header */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4 shrink-0">
          {/* Back to chat list */}
          <Link
            to="/chat"
            className="text-[#45556C] hover:text-[#155DFC] transition-colors mr-1"
            title="Kembali"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="#62748E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="#62748E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-[16px] text-[#1D293D]">
              name profile
            </h2>
            <p className="font-medium text-[12px] text-[#155DFC]">HR</p>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
          {messages.map((msg) =>
            msg.sender === 'hr' ? (
              /* HR Message - Left aligned */
              <div key={msg.id} className="flex items-start gap-3 max-w-[70%]">
                {/* Avatar */}
                <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="#62748E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="#62748E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  {/* Name + Time */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-bold text-[14px] text-[#1D293D]">
                      {msg.senderName}
                    </span>
                    <span className="font-normal text-[12px] text-[#90A1B9]">
                      {msg.time}
                    </span>
                  </div>

                  {/* Bubble */}
                  <div className="bg-[#F1F5F9] rounded-2xl rounded-tl-sm px-5 py-4">
                    <p className="text-[14px] text-[#314158] leading-[22px] whitespace-pre-line">
                      {msg.text}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* User Message - Right aligned */
              <div
                key={msg.id}
                className="flex items-start gap-3 max-w-[70%] self-end"
              >
                <div className="flex flex-col items-end">
                  {/* Time + Name */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-normal text-[12px] text-[#90A1B9]">
                      {msg.time}
                    </span>
                    <span className="font-bold text-[14px] text-[#1D293D]">
                      {msg.senderName}
                    </span>
                  </div>

                  {/* Bubble */}
                  <div className="bg-[#1447E6] rounded-2xl rounded-tr-sm px-5 py-4">
                    <p className="text-[14px] text-white leading-[22px] whitespace-pre-line">
                      {msg.text}
                    </p>
                  </div>
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 bg-slate-300 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="#45556C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="#45556C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-white border-t border-slate-100 px-6 py-4 flex items-center gap-3 shrink-0">
          {/* Text Input */}
          <div className="flex-1 flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full px-5 py-3">
            <input
              type="text"
              placeholder="Tulis pesan..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-[14px] text-[#1D293D] placeholder:text-[#90A1B9]"
            />
            {/* Mic Icon */}
            <button
              type="button"
              className="ml-2 text-[#90A1B9] hover:text-[#62748E] transition-colors"
              aria-label="Voice input"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 1C11.2044 1 10.4413 1.31607 9.87868 1.87868C9.31607 2.44129 9 3.20435 9 4V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V4C15 3.20435 14.6839 2.44129 14.1213 1.87868C13.5587 1.31607 12.7956 1 12 1Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 10V12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 19V23"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 23H16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            className="bg-[#1447E6] hover:bg-[#1038C4] text-white rounded-full px-6 py-3 flex items-center gap-2 font-semibold text-[14px] transition-colors cursor-pointer"
          >
            Send
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomChat;
