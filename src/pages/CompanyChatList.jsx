import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySidebar from '../components/CompanySidebar';
import { useAuth } from '../context/AuthContext';
import { fetchCompanyChatRooms, timeAgo } from '../utils/api';
import { MessageSquare, Search } from 'lucide-react';

const statusLabels = {
  review: 'Dalam Peninjauan',
  interview: 'Wawancara',
  accepted: 'Diterima',
  rejected: 'Ditolak',
  pending: 'Menunggu',
};

const statusColors = {
  review: 'bg-amber-50 text-amber-700 border-amber-200',
  interview: 'bg-blue-50 text-blue-700 border-blue-200',
  accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  pending: 'bg-slate-50 text-slate-600 border-slate-200',
};

export default function CompanyChatList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (user) loadRooms();
  }, [user]);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const data = await fetchCompanyChatRooms(user.id);
      setRooms(data);
    } catch (err) {
      console.error('Error loading company chats:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = rooms.filter((r) => {
    const name = r.job_seeker_profile?.full_name || '';
    const title = r.applications?.job_listings?.title || '';
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <CompanySidebar />
      <main className="flex-1 ml-64 p-6 lg:p-10 max-w-[1300px]">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            Komunikasi Kandidat
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Pesan & Chat</h1>
          <p className="text-sm text-gray-500 mt-1">
            Chat langsung dengan kandidat yang telah melamar posisi di perusahaan Anda.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari nama kandidat atau posisi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Chat Rooms List */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-1/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="h-3 bg-slate-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-4">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-base text-gray-900 mb-1">
              {search ? `Tidak ditemukan untuk "${search}"` : 'Belum ada percakapan'}
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              {search
                ? 'Coba kata kunci lain.'
                : 'Percakapan akan muncul di sini setelah Anda memulai chat dengan kandidat dari halaman detail pelamar.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((room) => {
              const name = room.job_seeker_profile?.full_name || 'Kandidat';
              const initial = name.charAt(0).toUpperCase();
              const jobTitle = room.applications?.job_listings?.title || 'Posisi';
              const status = room.applications?.status || 'review';
              const lastMsg = room.last_message_text;
              const lastTime = room.last_message_at;

              return (
                <button
                  key={room.id}
                  onClick={() => navigate(`/company-chat/${room.id}`)}
                  className="w-full bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md hover:border-gray-200 transition-all text-left cursor-pointer group"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-white flex items-center justify-center font-bold text-lg shrink-0 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all">
                    {initial}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-sm text-gray-900">{name}</p>
                      <span className="text-xs text-gray-400 shrink-0">{lastTime ? timeAgo(lastTime) : ''}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Melamar: <span className="font-medium text-gray-700">{jobTitle}</span>
                    </p>
                    {lastMsg ? (
                      <p className="text-xs text-gray-400 mt-1 truncate">{lastMsg}</p>
                    ) : (
                      <p className="text-xs text-blue-500 mt-1 italic">Belum ada pesan — mulai percakapan</p>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0">
                    <span className={`text-[11px] font-semibold px-2 py-1 rounded-full border ${statusColors[status] || statusColors.review}`}>
                      {statusLabels[status] || 'Review'}
                    </span>
                  </div>

                  {/* Arrow */}
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
