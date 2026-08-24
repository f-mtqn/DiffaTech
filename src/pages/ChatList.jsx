import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Dummy chat data matching Figma design
const chatItems = [
  {
    id: 1,
    name: 'HR',
    initial: 'H',
    preview:
      'Hai Yuka, selamat ya! Kamu diterima di Company In untuk posisi UI Designer......',
    time: '12:45 AM',
  },
  {
    id: 2,
    name: 'HR',
    initial: 'H',
    preview:
      'Hai Yuka, selamat ya! Kamu diterima di Company In untuk posisi UI Designer......',
    time: '12:45 AM',
  },
  {
    id: 3,
    name: 'HR',
    initial: 'H',
    preview:
      'Hai Yuka, selamat ya! Kamu diterima di Company In untuk posisi UI Designer......',
    time: '12:45 AM',
  },
  {
    id: 4,
    name: 'HR',
    initial: 'H',
    preview:
      'Hai Yuka, selamat ya! Kamu diterima di Company In untuk posisi UI Designer......',
    time: '12:45 AM',
  },
  {
    id: 5,
    name: 'HR',
    initial: 'H',
    preview:
      'Hai Yuka, selamat ya! Kamu diterima di Company In untuk posisi UI Designer......',
    time: '12:45 AM',
  },
];

const ChatList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter']">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-[68px] w-full max-w-[1024px] mx-auto px-6 py-8">
        {/* Banner */}
        <section className="w-full rounded-2xl p-8 flex justify-between items-center bg-gradient-to-br from-[#2D52D6] to-[#3B5EEA] mb-6">
          <div className="max-w-lg">
            <h1 className="font-bold text-[24px] leading-[33px] text-white">
              Cari pekerjaan dengan mudah, tanpa halangan apa pun
            </h1>
            <p className="mt-1 font-normal text-[14px] text-[#BEDBFF]">
              Meningkatkan kepercayaan kepada disabilitas
            </p>
          </div>
          <div className="relative w-[120px] h-[110px] opacity-90 text-white/30">
            {/* Wheelchair illustration matching Figma */}
            <svg
              viewBox="0 0 120 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Head */}
              <circle
                cx="50"
                cy="15"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              {/* Body */}
              <path
                d="M50 25V55"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Arms */}
              <path
                d="M50 35L70 40"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M50 35L35 45"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Wheelchair seat */}
              <path
                d="M30 55H70"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Wheelchair back */}
              <path
                d="M30 55V35"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Wheel big */}
              <circle
                cx="45"
                cy="75"
                r="18"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle
                cx="45"
                cy="75"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
              />
              {/* Wheel small */}
              <circle
                cx="75"
                cy="82"
                r="8"
                stroke="currentColor"
                strokeWidth="3"
              />
              {/* Wheel support */}
              <path
                d="M70 55L75 74"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Footrest */}
              <path
                d="M60 55L65 68H55"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>

        {/* Chat List */}
        <h2 className="font-bold text-[18px] text-[#1D293D] mb-4">
          Daftar Pesan
        </h2>

        <div className="flex flex-col gap-3">
          {chatItems.map((chat) => (
            <button
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="w-full bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow text-left cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-11 h-11 bg-[#DBEAFE] rounded-full flex items-center justify-center shrink-0">
                <span className="font-semibold text-[16px] text-[#3B5EEA]">
                  {chat.initial}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[15px] text-[#1D293D]">
                  {chat.name}
                </p>
                <p className="font-normal text-[13px] text-[#62748E] truncate mt-0.5">
                  {chat.preview}
                </p>
              </div>

              {/* Time */}
              <span className="font-normal text-[12px] text-[#90A1B9] shrink-0">
                {chat.time}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ChatList;
