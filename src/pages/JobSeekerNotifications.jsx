import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatSidebar from '../components/ChatSidebar';
import { useAuth } from '../context/AuthContext';
import {
  fetchNotifications, markNotificationRead,
  markAllNotificationsRead, deleteNotification, timeAgo
} from '../utils/api';
import {
  Bell, Briefcase, MessageSquare, Sparkles, CheckCircle2,
  Calendar, CheckCheck, Trash2, ChevronRight
} from 'lucide-react';

const getCategoryStyle = (category, type) => {
  const key = category || type || 'info';
  const map = {
    lamaran: { icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
    pesan: { icon: MessageSquare, color: 'bg-blue-100 text-blue-600' },
    sistem: { icon: Sparkles, color: 'bg-amber-100 text-amber-600' },
    success: { icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-600' },
    warning: { icon: Calendar, color: 'bg-orange-100 text-orange-600' },
    info: { icon: Bell, color: 'bg-blue-100 text-blue-600' },
  };
  return map[key] || map.info;
};

export default function JobSeekerNotifications() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState('semua');

  useEffect(() => {
    if (user) loadNotifications();
  }, [user]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await fetchNotifications(user.id);
      setNotifications(data);
    } catch (err) {
      console.error('Error loading notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (id) => {
    await markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_read: true } : item))
    );
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsRead(user.id);
    setNotifications((prev) => prev.map((item) => ({ ...item, is_read: true })));
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    await deleteNotification(id);
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredNotifications = notifications.filter((item) => {
    if (filterTab === 'unread') return !item.is_read;
    if (filterTab === 'lamaran') return item.category === 'lamaran';
    if (filterTab === 'pesan') return item.category === 'pesan';
    if (filterTab === 'sistem') return item.category === 'sistem';
    return true;
  });

  const unreadCount = notifications.filter((item) => !item.is_read).length;

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter'] flex">
      <ChatSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main className="pt-[68px] w-full max-w-[1024px] mx-auto px-6 py-8 flex flex-col gap-6">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#155DFC] shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1D293D]">Pusat Notifikasi</h1>
                  {unreadCount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-[#155DFC]">
                      {unreadCount} Baru
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#62748E] mt-1">
                  Pantau perkembangan lamaran kerja, pesan dari HRD, dan info karier inklusif Anda.
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#155DFC] bg-blue-50 hover:bg-blue-100 transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <CheckCheck className="w-4 h-4" />
                Tandai Semua Dibaca
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'semua', label: 'Semua' },
              { id: 'unread', label: `Belum Dibaca (${unreadCount})` },
              { id: 'lamaran', label: 'Lamaran Kerja' },
              { id: 'pesan', label: 'Pesan HRD' },
              { id: 'sistem', label: 'Info & Sistem' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  filterTab === tab.id
                    ? 'bg-[#155DFC] text-white shadow-sm'
                    : 'bg-white text-[#45556C] border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="flex flex-col gap-3">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-2/3" />
                  </div>
                </div>
              ))
            ) : filteredNotifications.length > 0 ? (
              filteredNotifications.map((notif) => {
                const { icon: IconComponent, color } = getCategoryStyle(notif.category, notif.type);
                return (
                  <div
                    key={notif.id}
                    onClick={() => handleToggleRead(notif.id)}
                    className={`rounded-2xl p-5 border transition-all cursor-pointer flex items-start gap-4 ${
                      notif.is_read
                        ? 'bg-white border-slate-100 hover:border-slate-200'
                        : 'bg-white border-blue-200 shadow-sm relative overflow-hidden'
                    }`}
                  >
                    {!notif.is_read && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#155DFC]" />
                    )}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-sm sm:text-base truncate ${notif.is_read ? 'font-semibold text-[#1D293D]' : 'font-bold text-[#0F172B]'}`}>
                            {notif.title}
                          </h3>
                          {!notif.is_read && (
                            <span className="w-2 h-2 rounded-full bg-[#155DFC] shrink-0" />
                          )}
                        </div>
                        <span className="text-xs text-[#90A1B9] shrink-0">{timeAgo(notif.created_at)}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#62748E] leading-relaxed mb-3">{notif.message}</p>
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-50">
                        {notif.action_link ? (
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate(notif.action_link); }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#155DFC] hover:underline cursor-pointer"
                          >
                            {notif.action_text || 'Lihat Detail'} <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        ) : <span />}
                        <button
                          onClick={(e) => handleDelete(notif.id, e)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Hapus notifikasi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <Bell className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-[#1D293D] mb-1">Tidak ada notifikasi</h3>
                <p className="text-xs sm:text-sm text-[#62748E] max-w-sm">
                  {filterTab === 'unread'
                    ? 'Semua notifikasi Anda telah ditandai sebagai dibaca.'
                    : 'Belum ada notifikasi baru untuk kategori yang Anda pilih saat ini.'}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
