import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { fetchMessages, sendMessage, updateRoomLastMessage } from '../utils/api';
import { supabase } from '../utils/supabaseClient';

const RoomChat = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [otherName, setOtherName] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (roomId) {
      loadMessages();
      loadRoomInfo();
      // Subscribe realtime untuk pesan baru
      const channel = supabase
        .channel(`room:${roomId}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` },
          (payload) => {
            const newMsg = payload.new;
            setMessages((prev) => {
              // Hindari duplikasi
              if (prev.find((m) => m.id === newMsg.id)) return prev;
              return [
                ...prev,
                {
                  id: newMsg.id,
                  sender: newMsg.sender_id === user?.id ? 'user' : 'hr',
                  senderName: newMsg.sender_id === user?.id ? (user?.user_metadata?.full_name || 'Kamu') : otherName || 'HRD',
                  time: new Date(newMsg.sent_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                  text: newMsg.content,
                },
              ];
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [roomId]);

  const loadRoomInfo = async () => {
    try {
      const { data } = await supabase
        .from('chat_rooms')
        .select(`
          job_seeker_id, company_id,
          job_seeker_profile:profiles!job_seeker_id(full_name),
          company_profile:profiles!company_id(full_name)
        `)
        .eq('id', roomId)
        .single();

      if (data) {
        const name = data.job_seeker_id === user?.id
          ? data.company_profile?.full_name || 'HRD'
          : data.job_seeker_profile?.full_name || 'Kandidat';
        setOtherName(name);
      }
    } catch (err) {
      console.error('Error loading room info:', err);
    }
  };

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await fetchMessages(roomId);
      const mapped = data.map((msg) => ({
        id: msg.id,
        sender: msg.sender_id === user?.id ? 'user' : 'hr',
        senderName: msg.sender?.full_name || (msg.sender_id === user?.id ? 'Kamu' : 'HRD'),
        time: new Date(msg.sent_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        text: msg.content,
      }));
      setMessages(mapped);
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !user || !roomId) return;

    const content = newMessage.trim();
    setNewMessage('');

    // Optimistic UI update
    const tempId = `temp-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        sender: 'user',
        senderName: user?.user_metadata?.full_name || 'Kamu',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        text: content,
      },
    ]);

    try {
      await sendMessage(roomId, user.id, content);
      // Update last_message di room agar ChatList company bisa menampilkan preview
      await updateRoomLastMessage(roomId, content);
    } catch (err) {
      console.error('Error sending message:', err);
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen max-h-screen flex bg-slate-50 font-['Inter']">
      <ChatSidebar showUserProfile />
      <div className="flex-1 flex flex-col min-h-screen max-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col min-h-0 pt-[68px]">
          {/* Chat Header */}
          <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4 shrink-0">
            <Link to="/chat" className="text-[#45556C] hover:text-[#155DFC] transition-colors mr-1" title="Kembali">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className="w-10 h-10 bg-[#DBEAFE] rounded-full overflow-hidden flex items-center justify-center shrink-0">
              <span className="font-bold text-[#3B5EEA] text-sm">{(otherName || 'H').charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h2 className="font-bold text-[16px] text-[#1D293D]">{otherName || 'HRD Perusahaan'}</h2>
              <p className="font-medium text-[12px] text-[#155DFC]">HR</p>
            </div>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-sm text-slate-400">Memuat pesan...</div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-sm text-slate-400">Belum ada pesan. Mulai percakapan!</p>
                </div>
              </div>
            ) : (
              messages.map((msg) =>
                msg.sender === 'hr' ? (
                  /* HR / Other Message — Left */
                  <div key={msg.id} className="flex items-start gap-3 max-w-[70%]">
                    <div className="w-10 h-10 bg-[#DBEAFE] rounded-full overflow-hidden flex items-center justify-center shrink-0">
                      <span className="font-bold text-[#3B5EEA] text-sm">{(msg.senderName || 'H').charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-bold text-[14px] text-[#1D293D]">{msg.senderName}</span>
                        <span className="font-normal text-[12px] text-[#90A1B9]">{msg.time}</span>
                      </div>
                      <div className="bg-[#F1F5F9] rounded-2xl rounded-tl-sm px-5 py-4">
                        <p className="text-[14px] text-[#314158] leading-[22px] whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* User Message — Right */
                  <div key={msg.id} className="flex items-start gap-3 max-w-[70%] self-end">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-normal text-[12px] text-[#90A1B9]">{msg.time}</span>
                        <span className="font-bold text-[14px] text-[#1D293D]">{msg.senderName}</span>
                      </div>
                      <div className="bg-[#1447E6] rounded-2xl rounded-tr-sm px-5 py-4">
                        <p className="text-[14px] text-white leading-[22px] whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-slate-300 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                      <span className="font-bold text-white text-sm">{(msg.senderName || 'K').charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                )
              )
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <div className="bg-white border-t border-slate-100 px-6 py-4 flex items-center gap-3 shrink-0">
            <div className="flex-1 flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full px-5 py-3">
              <input
                type="text"
                placeholder="Tulis pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-[14px] text-[#1D293D] placeholder:text-[#90A1B9]"
              />
              <button type="button" className="ml-2 text-[#90A1B9] hover:text-[#62748E] transition-colors" aria-label="Voice input">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1C11.2044 1 10.4413 1.31607 9.87868 1.87868C9.31607 2.44129 9 3.20435 9 4V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V4C15 3.20435 14.6839 2.44129 14.1213 1.87868C13.5587 1.31607 12.7956 1 12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 10V12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 23H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <button
              onClick={handleSend}
              className="bg-[#1447E6] hover:bg-[#1038C4] text-white rounded-full px-6 py-3 flex items-center gap-2 font-semibold text-[14px] transition-colors cursor-pointer"
            >
              Send
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomChat;
