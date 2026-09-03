import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { fetchChatRooms, timeAgo } from '../utils/api';

const ChatList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadChats();
  }, [user]);

  const loadChats = async () => {
    setLoading(true);
    try {
      const data = await fetchChatRooms(user.id);
      setChatRooms(data);
    } catch (err) {
      console.error('Error loading chats:', err);
    } finally {
      setLoading(false);
    }
  };

  // Tentukan nama lawan bicara berdasarkan role user
  const getOtherName = (room) => {
    if (room.job_seeker_id === user.id) {
      return room.company_profile?.full_name || 'HRD Perusahaan';
    }
    return room.job_seeker_profile?.full_name || 'Kandidat';
  };

  const getInitial = (name) => (name || 'H').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter'] flex">
      <ChatSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
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
              <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="15" r="10" stroke="currentColor" strokeWidth="3" />
                <path d="M50 25V55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 35L70 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 35L35 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M30 55H70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M30 55V35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <circle cx="45" cy="75" r="18" stroke="currentColor" strokeWidth="3" />
                <circle cx="45" cy="75" r="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="75" cy="82" r="8" stroke="currentColor" strokeWidth="3" />
                <path d="M70 55L75 74" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M60 55L65 68H55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </section>

          {/* Chat List */}
          <h2 className="font-bold text-[18px] text-[#1D293D] mb-4">Daftar Pesan</h2>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-1/4" />
                    <div className="h-3 bg-slate-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : chatRooms.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-base text-[#1D293D] mb-1">Belum ada pesan</h3>
              <p className="text-sm text-[#62748E]">
                Pesan dari HRD perusahaan akan muncul di sini setelah lamaran kamu diproses.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {chatRooms.map((room) => {
                const name = getOtherName(room);
                const initial = getInitial(name);
                return (
                  <button
                    key={room.id}
                    onClick={() => navigate(`/chat/${room.id}`)}
                    className="w-full bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow text-left cursor-pointer"
                  >
                    <div className="w-11 h-11 bg-[#DBEAFE] rounded-full flex items-center justify-center shrink-0">
                      <span className="font-semibold text-[16px] text-[#3B5EEA]">{initial}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[15px] text-[#1D293D]">{name}</p>
                      <p className="font-normal text-[13px] text-[#62748E] truncate mt-0.5">
                        Klik untuk membuka percakapan
                      </p>
                    </div>
                    <span className="font-normal text-[12px] text-[#90A1B9] shrink-0">
                      {timeAgo(room.created_at)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatList;
