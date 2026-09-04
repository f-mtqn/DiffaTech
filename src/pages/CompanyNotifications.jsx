import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySidebar from '../components/CompanySidebar';
import { useAuth } from '../context/AuthContext';
import {
  fetchNotifications, markNotificationRead,
  markAllNotificationsRead, deleteNotification, timeAgo
} from '../utils/api';
import {
  Bell, Users, Briefcase, ShieldCheck, Calendar,
  CheckCheck, Trash2, ChevronRight, Sparkles
} from 'lucide-react';

const getCategoryIcon = (type) => {
  const map = {
    pelamar: { icon: Users, color: 'bg-blue-100 text-blue-600' },
    lowongan: { icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
    sistem: { icon: ShieldCheck, color: 'bg-emerald-100 text-emerald-600' },
    warning: { icon: Calendar, color: 'bg-amber-100 text-amber-600' },
    success: { icon: Sparkles, color: 'bg-emerald-100 text-emerald-600' },
    info: { icon: Bell, color: 'bg-blue-100 text-blue-600' },
  };
  return map[type] || { icon: Bell, color: 'bg-gray-100 text-gray-500' };
};

export default function CompanyNotifications() {
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
    if (filterTab === 'pelamar') return item.category === 'pelamar';
    if (filterTab === 'lowongan') return item.category === 'lowongan';
    if (filterTab === 'sistem') return item.category === 'sistem';
    return true;
  });

  const unreadCount = notifications.filter((item) => !item.is_read).length;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <CompanySidebar />
      <main className="flex-1 ml-64 p-6 lg:p-10 max-w-[1300px]">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Bell className="w-3.5 h-3.5" />
              Notifikasi Perusahaan
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Pusat Pemberitahuan</h1>
            <p className="text-sm text-gray-500 mt-1">
              Pantau lamaran baru dari talenta disabilitas, pembaruan lowongan kerja, dan jadwal wawancara.
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold text-xs shadow-sm transition-colors cursor-pointer self-start md:self-auto"
            >
              <CheckCheck className="w-4 h-4 text-blue-600" />
              Tandai Semua Dibaca
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-4">
          {[
            { id: 'semua', label: 'Semua' },
            { id: 'unread', label: `Belum Dibaca (${unreadCount})` },
            { id: 'pelamar', label: 'Pelamar Baru' },
            { id: 'lowongan', label: 'Status Lowongan' },
            { id: 'sistem', label: 'Sistem & Verifikasi' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
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
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse flex gap-4">
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
              const { icon: IconComponent, color } = getCategoryIcon(notif.category || notif.type);
              return (
                <div
                  key={notif.id}
                  onClick={() => handleToggleRead(notif.id)}
                  className={`rounded-2xl p-5 border transition-all cursor-pointer flex items-start gap-4 ${
                    notif.is_read
                      ? 'bg-white border-gray-100 hover:border-gray-200'
                      : 'bg-white border-blue-200 shadow-sm relative overflow-hidden'
                  }`}
                >
                  {!notif.is_read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600" />
                  )}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm sm:text-base truncate ${notif.is_read ? 'font-semibold text-gray-800' : 'font-bold text-gray-900'}`}>
                          {notif.title}
                        </h3>
                        {!notif.is_read && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />}
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{timeAgo(notif.created_at)}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">{notif.message}</p>
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-50">
                      {notif.action_link ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate(notif.action_link); }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                        >
                          {notif.action_text || 'Lihat Detail'} <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : <span />}
                      <button
                        onClick={(e) => handleDelete(notif.id, e)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                <Bell className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1">Tidak ada pemberitahuan</h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm">
                {filterTab === 'unread' ? 'Semua notifikasi perusahaan telah dibaca.' : 'Belum ada notifikasi baru untuk kategori ini.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
