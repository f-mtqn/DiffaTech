import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import { fetchChatRooms, timeAgo } from '../utils/api';
import { supabase } from '../utils/supabaseClient';
import { MessageSquare, Trash2, Search, X } from 'lucide-react';

const ChatList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // room id to confirm delete
  const [search, setSearch] = useState('');

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

  // Nama lawan bicara
  const getOtherName = (room) => {
    if (room.job_seeker_id === user?.id) {
      return room.company_profile?.full_name || 'HRD Perusahaan';
    }
    return room.job_seeker_profile?.full_name || 'Kandidat';
  };

  const getInitial = (name) => (name || 'H').charAt(0).toUpperCase();

  // Hapus semua pesan & room (hapus riwayat, bukan keluar)
  const handleDeleteChat = async (roomId) => {
    setDeletingId(roomId);
    try {
      // Hapus semua pesan di room ini
      await supabase.from('messages').delete().eq('room_id', roomId);
      // Hapus room
      await supabase.from('chat_rooms').delete().eq('id', roomId);
      setChatRooms((prev) => prev.filter((r) => r.id !== roomId));
    } catch (err) {
      console.error('Gagal menghapus chat:', err);
      alert('Gagal menghapus percakapan. Coba lagi.');
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  const filtered = chatRooms.filter((room) => {
    const name = getOtherName(room);
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter'] flex">
      <ChatSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main className="pt-[68px] w-full max-w-[900px] mx-auto px-6 py-8">
          {/* Banner */}
          <section className="w-full rounded-2xl p-8 flex justify-between items-center bg-gradient-to-br from-[#2D52D6] to-[#3B5EEA] mb-6">
            <div className="max-w-lg">
              <h1 className="font-bold text-[22px] leading-[30px] text-white">Kotak Masuk Chat</h1>
              <p className="mt-1 font-normal text-[14px] text-[#BEDBFF]">
                Pesan dari HRD perusahaan tempat kamu melamar
              </p>
            </div>
            <div className="relative w-[100px] h-[90px] opacity-80 text-white/30">
              <svg viewBox="0 0 100 90" fill="none">
                <path d="M90 10H10C5.58 10 2 13.58 2 18V65C2 69.42 5.58 73 10 73H30L50 88L70 73H90C94.42 73 98 69.42 98 65V18C98 13.58 94.42 10 90 10Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="30" cy="41" r="5" fill="currentColor"/>
                <circle cx="50" cy="41" r="5" fill="currentColor"/>
                <circle cx="70" cy="41" r="5" fill="currentColor"/>
              </svg>
            </div>
          </section>

          {/* Search & Title */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="font-bold text-[18px] text-[#1D293D]">
              Percakapan {chatRooms.length > 0 && <span className="text-blue-600">({chatRooms.length})</span>}
            </h2>
            {chatRooms.length > 0 && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:ring-2 focus:ring-blue-500 w-40"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-2 top-2.5 cursor-pointer">
                    <X className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Confirm Delete Modal */}
          {confirmDelete && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-bold text-base text-gray-900 text-center mb-2">Hapus Percakapan?</h3>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Semua pesan dalam percakapan ini akan dihapus permanen dan tidak bisa dikembalikan.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleDeleteChat(confirmDelete)}
                    disabled={deletingId === confirmDelete}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60 cursor-pointer"
                  >
                    {deletingId === confirmDelete ? 'Menghapus...' : 'Hapus'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chat List */}
          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-1/4" />
                    <div className="h-3 bg-slate-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-14 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-400 mx-auto mb-4">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-[#1D293D] mb-1">
                {search ? `Tidak ada percakapan dengan "${search}"` : 'Belum ada pesan'}
              </h3>
              <p className="text-sm text-[#62748E] max-w-xs mx-auto">
                {search
                  ? 'Coba cari nama lain.'
                  : 'Pesan dari HRD perusahaan akan muncul di sini setelah lamaran kamu diproses.'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((room) => {
                const name = getOtherName(room);
                const initial = getInitial(name);
                const lastMsg = room.last_message_text;
                const lastTime = room.last_message_at || room.created_at;

                return (
                  <div
                    key={room.id}
                    className="group w-full bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md hover:border-slate-200 transition-all"
                  >
                    {/* Avatar */}
                    <button
                      onClick={() => navigate(`/chat/${room.id}`)}
                      className="w-12 h-12 bg-gradient-to-br from-[#3B5EEA] to-[#2D52D6] rounded-full flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <span className="font-bold text-[18px] text-white">{initial}</span>
                    </button>

                    {/* Info — clickable */}
                    <button
                      onClick={() => navigate(`/chat/${room.id}`)}
                      className="flex-1 min-w-0 text-left cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-[15px] text-[#1D293D] truncate">{name}</p>
                        <span className="font-normal text-[12px] text-[#90A1B9] shrink-0">{timeAgo(lastTime)}</span>
                      </div>
                      <p className="font-normal text-[13px] text-[#62748E] truncate mt-0.5">
                        {lastMsg || <span className="italic text-[#90A1B9]">Klik untuk membuka percakapan</span>}
                      </p>
                    </button>

                    {/* Action Buttons — visible on hover */}
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => navigate(`/chat/${room.id}`)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold transition-colors cursor-pointer"
                        title="Buka Chat"
                      >
                        Buka
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setConfirmDelete(room.id); }}
                        disabled={deletingId === room.id}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors cursor-pointer disabled:opacity-50"
                        title="Hapus Percakapan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
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
