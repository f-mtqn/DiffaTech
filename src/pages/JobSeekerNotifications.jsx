import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatSidebar from '../components/ChatSidebar';
import { 
  Bell, 
  Briefcase, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  CheckCheck, 
  Trash2,
  ChevronRight
} from 'lucide-react';

const initialNotifications = [
  {
    id: 1,
    title: 'Undangan Wawancara: UI Designer',
    message: 'Selamat! PT Inklusif Tech Indonesia telah meninjau profil Anda dan mengundang Anda ke tahap wawancara online ramah disabilitas (disediakan live-captioning & teks pendamping).',
    time: '10 menit yang lalu',
    category: 'lamaran',
    read: false,
    actionText: 'Buka Pesan HRD',
    actionLink: '/chat',
    icon: Calendar,
    iconColor: 'bg-emerald-100 text-emerald-600',
  },
  {
    id: 2,
    title: 'Pesan Baru dari HRD Tokopedia',
    message: 'Halo, berkas portofolio Figma Anda sangat memuaskan. Apakah bersedia mendiskusikan opsi kerja remote (WFH) bersama tim kami?',
    time: '1 jam yang lalu',
    category: 'pesan',
    read: false,
    actionText: 'Balas Pesan',
    actionLink: '/chat',
    icon: MessageSquare,
    iconColor: 'bg-blue-100 text-blue-600',
  },
  {
    id: 3,
    title: 'Rekomendasi Lowongan Baru yang Cocok',
    message: 'Ada 2 lowongan baru yang sesuai keahlian Anda: Frontend Developer di Bukalapak (Full-Time Remote, ramah Disleksia & Tunadaksa).',
    time: '3 jam yang lalu',
    category: 'sistem',
    read: false,
    actionText: 'Lihat Lowongan',
    actionLink: '/dashboard',
    icon: Sparkles,
    iconColor: 'bg-amber-100 text-amber-600',
  },
  {
    id: 4,
    title: 'Lamaran Berhasil Terkirim ke Blibli',
    message: 'Lamaran Anda untuk posisi Quality Assurance Specialist telah diterima oleh sistem rekrutmen Blibli dan sedang dalam tahap peninjauan awal.',
    time: 'Kemarin, 14:20 WIB',
    category: 'lamaran',
    read: true,
    actionText: 'Lihat Lowongan',
    actionLink: '/dashboard',
    icon: Briefcase,
    iconColor: 'bg-purple-100 text-purple-600',
  },
  {
    id: 5,
    title: 'Profil Anda Siap Dilirik Perusahaan',
    message: 'Profil karier Anda telah dilengkapi dengan data keahlian dan preferensi disabilitas. Akun Anda kini tampil di daftar teratas rekomendasi kandidat bagi perusahaan mitra.',
    time: '2 hari yang lalu',
    category: 'sistem',
    read: true,
    actionText: 'Kelola Profil',
    actionLink: '/profile',
    icon: CheckCircle2,
    iconColor: 'bg-blue-100 text-blue-600',
  },
  {
    id: 6,
    title: 'Webinar Aksesibilitas Digital Dibuka',
    message: 'Pendaftaran workshop gratis "Membangun Antarmuka Aksesibel (WCAG 2.1) untuk Profesional Disabilitas" dibuka khusus anggota komunitas DiffaTech.',
    time: '3 hari yang lalu',
    category: 'sistem',
    read: true,
    actionText: 'Pelajari Lebih Lanjut',
    actionLink: '/about',
    icon: Sparkles,
    iconColor: 'bg-indigo-100 text-indigo-600',
  },
];

export default function JobSeekerNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filterTab, setFilterTab] = useState('semua'); // 'semua' | 'unread' | 'lamaran' | 'pesan' | 'sistem'

  // Mark single as read
  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  // Delete notification
  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter logic
  const filteredNotifications = notifications.filter((item) => {
    if (filterTab === 'unread') return !item.read;
    if (filterTab === 'lamaran') return item.category === 'lamaran';
    if (filterTab === 'pesan') return item.category === 'pesan';
    if (filterTab === 'sistem') return item.category === 'sistem';
    return true;
  });

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter'] flex">
      {/* Sidebar Platform on the left */}
      <ChatSidebar />

      {/* Right Content Area with Navbar */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />

        {/* Main Content */}
        <main className="pt-[68px] w-full max-w-[1024px] mx-auto px-6 py-8 flex flex-col gap-6">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#155DFC] shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1D293D]">
                    Pusat Notifikasi
                  </h1>
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
                onClick={markAllAsRead}
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
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notif) => {
                const IconComponent = notif.icon;
                return (
                  <div
                    key={notif.id}
                    onClick={() => toggleRead(notif.id)}
                    className={`rounded-2xl p-5 border transition-all cursor-pointer flex items-start gap-4 ${
                      notif.read
                        ? 'bg-white border-slate-100 hover:border-slate-200'
                        : 'bg-white border-blue-200 shadow-sm relative overflow-hidden'
                    }`}
                  >
                    {/* Unread Left Border Indicator */}
                    {!notif.read && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#155DFC]"></div>
                    )}

                    {/* Notification Category Icon */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${notif.iconColor}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Notification Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`text-sm sm:text-base truncate ${
                              notif.read ? 'font-semibold text-[#1D293D]' : 'font-bold text-[#0F172B]'
                            }`}
                          >
                            {notif.title}
                          </h3>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-[#155DFC] shrink-0"></span>
                          )}
                        </div>
                        <span className="text-xs text-[#90A1B9] shrink-0">{notif.time}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#62748E] leading-relaxed mb-3">
                        {notif.message}
                      </p>

                      {/* Action Button & Delete */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-50">
                        {notif.actionLink ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(notif.actionLink);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#155DFC] hover:underline cursor-pointer"
                          >
                            {notif.actionText}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span></span>
                        )}

                        <button
                          onClick={(e) => deleteNotification(notif.id, e)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
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
              /* Empty State */
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <Bell className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-[#1D293D] mb-1">
                  Tidak ada notifikasi
                </h3>
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
