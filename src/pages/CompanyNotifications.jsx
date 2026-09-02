import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySidebar from '../components/CompanySidebar';
import { 
  Bell, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Calendar, 
  CheckCheck, 
  Trash2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const initialCompanyNotifications = [
  {
    id: 1,
    title: 'Pelamar Baru: Hanif Almansyah',
    message: 'Kandidat Hanif Almansyah telah melamar untuk posisi "UI Designer". Memiliki pengalaman 12 tahun, menguasai Figma & Design System (Disabilitas: Tunarungu).',
    time: '15 menit yang lalu',
    category: 'pelamar',
    read: false,
    actionText: 'Tinjau Profil Kandidat',
    actionLink: '/company-candidate-detail',
    icon: Users,
    iconColor: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    title: 'Pelamar Baru: Michele',
    message: 'Michele telah melamar untuk posisi "Frontend Developer". Menguasai React, Tailwind CSS, serta standar aksesibilitas web WCAG (Disabilitas: Tunadaksa).',
    time: '2 jam yang lalu',
    category: 'pelamar',
    read: false,
    actionText: 'Lihat Daftar Pelamar',
    actionLink: '/company-applicants',
    icon: Users,
    iconColor: 'bg-emerald-100 text-emerald-600',
  },
  {
    id: 3,
    title: 'Lowongan "UI Designer" Mencapai 150+ Dilihat',
    message: 'Postingan lowongan pekerjaan Anda mendapatkan respon tinggi dari komunitas profesional disabilitas minggu ini.',
    time: '5 jam yang lalu',
    category: 'lowongan',
    read: false,
    actionText: 'Kelola Postingan Lowongan',
    actionLink: '/company-job-postings',
    icon: Briefcase,
    iconColor: 'bg-purple-100 text-purple-600',
  },
  {
    id: 4,
    title: 'Pengingat: Jadwal Interview Online Besok',
    message: 'Anda memiliki agenda wawancara online dengan kandidat Hanif Almansyah besok pukul 10:00 WIB. Mohon pastikan link Google Meet ramah caption telah aktif.',
    time: 'Kemarin, 16:45 WIB',
    category: 'pelamar',
    read: true,
    actionText: 'Detail Pelamar',
    actionLink: '/company-candidate-detail',
    icon: Calendar,
    iconColor: 'bg-amber-100 text-amber-600',
  },
  {
    id: 5,
    title: 'Lencana Perusahaan Inklusif Terverifikasi',
    message: 'Selamat! Akun perusahaan Anda telah memenuhi 100% kriteria Ramah Disabilitas DiffaTech dan kini berhak memasang badge verifikasi resmi di setiap postingan lowongan.',
    time: '3 hari yang lalu',
    category: 'sistem',
    read: true,
    actionText: 'Cek Profil Perusahaan',
    actionLink: '/company-profile',
    icon: ShieldCheck,
    iconColor: 'bg-emerald-100 text-emerald-600',
  },
  {
    id: 6,
    title: 'Tips Perekrutan Talenta Disabilitas',
    message: 'Pelajari panduan praktis menyediakan lingkungan kerja adaptif dan fasilitas teknologi penunjang bagi rekan kerja disabilitas dari modul HR DiffaTech.',
    time: '5 hari yang lalu',
    category: 'sistem',
    read: true,
    actionText: 'Baca Panduan',
    actionLink: '/about',
    icon: Sparkles,
    iconColor: 'bg-indigo-100 text-indigo-600',
  },
];

export default function CompanyNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialCompanyNotifications);
  const [filterTab, setFilterTab] = useState('semua'); // 'semua' | 'unread' | 'pelamar' | 'lowongan' | 'sistem'

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
    if (filterTab === 'pelamar') return item.category === 'pelamar';
    if (filterTab === 'lowongan') return item.category === 'lowongan';
    if (filterTab === 'sistem') return item.category === 'sistem';
    return true;
  });

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <CompanySidebar />

      <main className="flex-1 ml-64 p-6 lg:p-10 max-w-[1300px]">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Bell className="w-3.5 h-3.5" />
              Notifikasi Perusahaan
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              Pusat Pemberitahuan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Pantau lamaran baru dari talenta disabilitas, pembaruan lowongan kerja, dan jadwal wawancara.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
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
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              const IconComponent = notif.icon;
              return (
                <div
                  key={notif.id}
                  onClick={() => toggleRead(notif.id)}
                  className={`rounded-2xl p-5 border transition-all cursor-pointer flex items-start gap-4 ${
                    notif.read
                      ? 'bg-white border-gray-100 hover:border-gray-200'
                      : 'bg-white border-blue-200 shadow-sm relative overflow-hidden'
                  }`}
                >
                  {/* Unread Left Border Indicator */}
                  {!notif.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${notif.iconColor}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`text-sm sm:text-base truncate ${
                            notif.read ? 'font-semibold text-gray-800' : 'font-bold text-gray-900'
                          }`}
                        >
                          {notif.title}
                        </h3>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{notif.time}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                      {notif.message}
                    </p>

                    {/* Action & Delete */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-50">
                      {notif.actionLink ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(notif.actionLink);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                        >
                          {notif.actionText}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span></span>
                      )}

                      <button
                        onClick={(e) => deleteNotification(notif.id, e)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        title="Hapus pemberitahuan"
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
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                <Bell className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                Tidak ada pemberitahuan
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm">
                {filterTab === 'unread'
                  ? 'Semua notifikasi perusahaan telah dibaca.'
                  : 'Belum ada notifikasi baru untuk kategori ini.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
