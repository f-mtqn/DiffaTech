import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CompanySidebar from '../components/CompanySidebar';
import { useAuth } from '../context/AuthContext';
import { fetchMessages, sendMessage, updateRoomLastMessage } from '../utils/api';
import { supabase } from '../utils/supabaseClient';
import { ArrowLeft, Send, Phone, Video, MoreHorizontal } from 'lucide-react';

const CompanyRoomChat = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (roomId && user) {
      loadMessages();
      loadRoomInfo();

      // Supabase Realtime subscription untuk pesan baru
      const channel = supabase
        .channel(`company-room:${roomId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `room_id=eq.${roomId}`,
          },
          (payload) => {
            const newMsg = payload.new;
            setMessages((prev) => {
              if (prev.find((m) => m.id === newMsg.id)) return prev;
              return [
                ...prev,
                {
                  id: newMsg.id,
                  senderId: newMsg.sender_id,
                  isMe: newMsg.sender_id === user?.id,
                  time: new Date(newMsg.sent_at).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
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
  }, [roomId, user]);

  const loadRoomInfo = async () => {
    try {
      const { data } = await supabase
        .from('chat_rooms')
        .select(`
          id, job_seeker_id, company_id, application_id,
          job_seeker_profile:profiles!job_seeker_id (full_name),
          company_profile:profiles!company_id (full_name),
          applications!application_id (
            id, status,
            job_listings!job_id (title)
          )
        `)
        .eq('id', roomId)
        .single();

      if (data) setRoomInfo(data);
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
        senderId: msg.sender_id,
        isMe: msg.sender_id === user?.id,
        senderName: msg.sender?.full_name || (msg.sender_id === user?.id ? 'Anda' : 'Kandidat'),
        time: new Date(msg.sent_at).toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        }),
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
    inputRef.current?.focus();

    // Optimistic UI
    const tempId = `temp-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        senderId: user.id,
        isMe: true,
        senderName: user?.user_metadata?.company_name || 'HRD',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        text: content,
      },
    ]);

    try {
      const sent = await sendMessage(roomId, user.id, content);
      // Update last message di room
      await updateRoomLastMessage(roomId, content);
      // Replace temp dengan ID asli
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, id: sent.id } : m))
      );
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const candidateName = roomInfo?.job_seeker_profile?.full_name || 'Kandidat';
  const jobTitle = roomInfo?.applications?.job_listings?.title || '';
  const appStatus = roomInfo?.applications?.status || '';

  const statusConfig = {
    review: { label: 'Dalam Peninjauan', color: 'text-amber-600 bg-amber-50' },
    interview: { label: 'Wawancara', color: 'text-blue-600 bg-blue-50' },
    accepted: { label: 'Diterima', color: 'text-emerald-600 bg-emerald-50' },
    rejected: { label: 'Ditolak', color: 'text-red-500 bg-red-50' },
  };
  const sc = statusConfig[appStatus] || statusConfig.review;

  return (
    <div className="flex min-h-screen max-h-screen bg-[#F8FAFC] font-sans">
      <CompanySidebar />

      {/* Main Chat Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen max-h-screen">
        {/* Chat Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 shrink-0 shadow-xs">
          <button
            onClick={() => navigate('/company-chat')}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
            {candidateName.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-gray-900 truncate">{candidateName}</h2>
              {appStatus && (
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${sc.color}`}>
                  {sc.label}
                </span>
              )}
            </div>
            {jobTitle && (
              <p className="text-xs text-gray-500 truncate">Melamar: {jobTitle}</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => roomInfo?.application_id && navigate(`/company-candidate-detail/${roomInfo?.applications?.id}`)}
              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Lihat Profil
            </button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 bg-gray-50/50">
          {/* Date separator */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium shrink-0">
              {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Memuat pesan...</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mx-auto mb-3">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-700">Mulai percakapan</p>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Kirim pesan pertama kepada <strong>{candidateName}</strong> untuk memulai komunikasi rekrutmen.
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg) =>
              msg.isMe ? (
                /* Company (Me) — Right side, blue bubble */
                <div key={msg.id} className="flex items-end justify-end gap-2 group">
                  <div className="flex flex-col items-end max-w-[65%]">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-xs">
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {msg.time}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0 mb-4">
                    HRD
                  </div>
                </div>
              ) : (
                /* Candidate — Left side, gray bubble */
                <div key={msg.id} className="flex items-end gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mb-4">
                    {candidateName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col max-w-[65%]">
                    <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-xs border border-gray-100">
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {msg.time}
                    </span>
                  </div>
                </div>
              )
            )
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-white border-t border-gray-100 px-5 py-4 flex items-end gap-3 shrink-0">
          <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-400 focus-within:bg-white transition-all">
            <textarea
              ref={inputRef}
              rows={1}
              placeholder={`Tulis pesan kepada ${candidateName}...`}
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                // Auto resize
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400 resize-none max-h-28 leading-relaxed"
              style={{ height: '24px' }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="w-11 h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all cursor-pointer shadow-sm shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyRoomChat;
