import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [namaLengkap, setNamaLengkap] = useState('Label');
  const [email, setEmail] = useState('Label');
  const [myAbout, setMyAbout] = useState('Label');
  const [alamat, setAlamat] = useState('Label');
  const [cvUrl, setCvUrl] = useState('');

  // Pengalaman (dynamic list)
  const [pengalaman, setPengalaman] = useState([
    { posisi: 'Label', perusahaan: 'Label', mulaiKerja: 'Label', akhirKerja: 'Label' },
  ]);

  // Sertifikasi (dynamic list)
  const [sertifikasi, setSertifikasi] = useState(['', '']);

  // Skills (dynamic list)
  const [skills, setSkills] = useState(['Job 1', 'Job 2']);

  // Bottom fields
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState('Label');
  const [jobType, setJobType] = useState('Remote, Full-Time');
  const [tahunPendidikan, setTahunPendidikan] = useState('Label');
  const [disabilitas, setDisabilitas] = useState('Label');

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // Pengalaman handlers
  const addPengalaman = () => {
    setPengalaman([
      ...pengalaman,
      { posisi: '', perusahaan: '', mulaiKerja: '', akhirKerja: '' },
    ]);
  };
  const updatePengalaman = (index, field, value) => {
    const updated = [...pengalaman];
    updated[index][field] = value;
    setPengalaman(updated);
  };

  // Sertifikasi handlers
  const addSertifikasi = () => {
    setSertifikasi([...sertifikasi, '']);
  };

  // Skills handlers
  const addSkill = () => {
    setSkills([...skills, '']);
  };
  const updateSkill = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: namaLengkap,
          about: myAbout,
          address: alamat,
          cv_url: cvUrl,
          pengalaman,
          sertifikasi,
          skills,
          pendidikan_terakhir: pendidikanTerakhir,
          job_type: jobType,
          tahun_pendidikan: tahunPendidikan,
          disabilitas,
        },
      });
      if (error) throw error;
      setIsEditing(false);
    } catch (err) {
      console.error('Gagal menyimpan:', err.message);
    } finally {
      setSaving(false);
    }
  };

  // Blue plus button component
  const AddButton = ({ onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="w-9 h-9 rounded-full bg-[#3B5EEA] flex items-center justify-center text-white shadow-md hover:bg-[#2D52D6] transition-colors shrink-0"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <div className="min-h-screen bg-white font-['Inter']">
      {/* HEADER — same as Dashboard */}
      <header className="fixed top-0 left-0 right-0 h-[68px] bg-white border-b border-slate-100 shadow-sm z-50 flex items-center justify-between px-8 py-3.5">
        <Link
          to="/dashboard"
          className="font-bold text-[18px] text-[#155DFC] tracking-tight"
        >
          diffaTech
        </Link>

        <nav className="flex items-center gap-7">
          <Link to="#" className="font-medium text-[14px] text-[#45556C]">
            Pelatihan & Skil
          </Link>
          <Link to="#" className="font-medium text-[14px] text-[#45556C]">
            Komunitas
          </Link>
          <Link to="#" className="font-medium text-[14px] text-[#45556C]">
            Tentang Kami
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/chat"
            className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors text-[#45556C] hover:text-[#155DFC]"
            title="Chat HRD"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium text-[14px]">Chat HRD</span>
          </Link>
          <Link
            to="/profile"
            className="font-semibold text-[14px] text-[#155DFC]"
          >
            {user?.email || 'User'}
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border-2 border-blue-700 text-blue-700 font-semibold text-[14px]"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-[68px] w-full max-w-[480px] mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden shrink-0">
              <div className="w-full h-full flex items-center justify-center text-white text-lg font-bold">
                {(user?.user_metadata?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-[16px] text-[#1D293D]">profile</h1>
              <p className="text-[13px] text-[#62748E]">{user?.email || 'm@example.com'}</p>
            </div>
          </div>
          {/* Edit icon */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-[#3B5EEA] hover:text-[#2D52D6] transition-colors p-1"
            title="Edit profil"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <hr className="border-slate-200 mb-6" />

        {/* Daftar Perusahaan Section Title */}
        <h2 className="font-bold text-[15px] text-[#1D293D] mb-5">Daftar Perusahaan</h2>

        {/* Nama Lengkap & Email — 2 columns */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-[13px] font-semibold text-[#1D293D] mb-1.5">Nama Lengkap</label>
            <input
              type="text"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white disabled:bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
              placeholder="Label"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-[#1D293D] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white disabled:bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
              placeholder="Label"
            />
          </div>
        </div>

        {/* My About */}
        <div className="mb-5">
          <label className="block text-[13px] font-semibold text-[#1D293D] mb-1.5">My About</label>
          <textarea
            value={myAbout}
            onChange={(e) => setMyAbout(e.target.value)}
            disabled={!isEditing}
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white disabled:bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all resize-none"
            placeholder="Label"
          />
        </div>

        {/* Divider */}
        <hr className="border-slate-200 mb-5" />

        {/* Alamat */}
        <div className="mb-5">
          <label className="block text-[13px] font-semibold text-[#1D293D] mb-1.5">Alamat</label>
          <input
            type="text"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white disabled:bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
            placeholder="Label"
          />
        </div>

        {/* CV (Masukan URL) */}
        <div className="mb-5">
          <label className="block text-[13px] font-semibold text-[#1D293D] mb-1.5">CV (Masukan URL)</label>
          <button
            type="button"
            disabled={!isEditing}
            className="w-full px-3 py-3 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white text-center hover:border-blue-300 transition-colors disabled:hover:border-gray-200"
          >
            Upload CV
          </button>
        </div>

        {/* Divider */}
        <hr className="border-slate-200 mb-5" />

        {/* Pengalaman */}
        <div className="mb-5">
          <h3 className="font-bold text-[13px] text-[#1D293D] mb-4">Pengalaman</h3>

          {pengalaman.map((exp, idx) => (
            <div key={idx} className="mb-4">
              {/* Posisi & Nama Perusahaan/Komunitas */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-[12px] font-semibold text-[#1D293D] mb-1">Posisi</label>
                  <input
                    type="text"
                    value={exp.posisi}
                    onChange={(e) => updatePengalaman(idx, 'posisi', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white disabled:bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
                    placeholder="Label"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#1D293D] mb-1">Nama Perusahaan/Komunitas</label>
                  <input
                    type="text"
                    value={exp.perusahaan}
                    onChange={(e) => updatePengalaman(idx, 'perusahaan', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white disabled:bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
                    placeholder="Label"
                  />
                </div>
              </div>

              {/* Mulai kerja & Akhir kerja */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#1D293D] mb-1">Mulai kerja</label>
                  <input
                    type="text"
                    value={exp.mulaiKerja}
                    onChange={(e) => updatePengalaman(idx, 'mulaiKerja', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white disabled:bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
                    placeholder="Label"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#1D293D] mb-1">Akhir kerja</label>
                  <input
                    type="text"
                    value={exp.akhirKerja}
                    onChange={(e) => updatePengalaman(idx, 'akhirKerja', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white disabled:bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
                    placeholder="Label"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add pengalaman button */}
          <div className="flex justify-end mt-1">
            <AddButton onClick={addPengalaman} />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-200 mb-5" />

        {/* Sertifikasi (Masukan URL) */}
        <div className="mb-5">
          <h3 className="font-bold text-[13px] text-[#1D293D] mb-3">Sertifikasi (Masukan URL)</h3>

          <div className="space-y-3">
            {sertifikasi.map((_, idx) => (
              <button
                key={idx}
                type="button"
                disabled={!isEditing}
                className="w-full px-3 py-3 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white text-center hover:border-blue-300 transition-colors disabled:hover:border-gray-200"
              >
                Upload Sertifikasi
              </button>
            ))}
          </div>

          {/* Add sertifikasi button */}
          <div className="flex justify-end mt-3">
            <AddButton onClick={addSertifikasi} />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-200 mb-5" />

        {/* Skills */}
        <div className="mb-5">
          <h3 className="font-bold text-[13px] text-[#1D293D] mb-3">Skills</h3>

          <div className="space-y-0">
            {skills.map((skill, idx) => (
              <div key={idx}>
                {isEditing ? (
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSkill(idx, e.target.value)}
                    className="w-full px-3 py-3 border-b border-gray-200 text-[14px] text-[#1D293D] bg-white outline-none focus:border-blue-400 transition-all"
                    placeholder="Skill"
                  />
                ) : (
                  <div className="w-full px-3 py-3 border-b border-gray-200 text-[14px] text-[#1D293D]">
                    {skill || '-'}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add skill button */}
          <div className="flex justify-end mt-3">
            <AddButton onClick={addSkill} />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-200 mb-5" />

        {/* Pendidikan Terakhir & Job Type — 2 columns */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-[13px] font-semibold text-[#3B5EEA] mb-1.5">Pendidikan Terakhir</label>
            <input
              type="text"
              value={pendidikanTerakhir}
              onChange={(e) => setPendidikanTerakhir(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white disabled:bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
              placeholder="Label"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-[#3B5EEA] mb-1.5">Job Type</label>
            <input
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white disabled:bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
              placeholder="Remote, Full-Time"
            />
          </div>
        </div>

        {/* Tahun Pendidikan & Disabilitas — 2 columns */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div>
            <label className="block text-[13px] font-semibold text-[#3B5EEA] mb-1.5">Tahun Pendidikan</label>
            <input
              type="text"
              value={tahunPendidikan}
              onChange={(e) => setTahunPendidikan(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white disabled:bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
              placeholder="Label"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-[#3B5EEA] mb-1.5">Disabilitas</label>
            <input
              type="text"
              value={disabilitas}
              onChange={(e) => setDisabilitas(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[13px] text-gray-400 bg-white disabled:bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
              placeholder="Label"
            />
          </div>
        </div>

        {/* Ubah Profil Button */}
        <div className="flex justify-center mb-10">
          <button
            type="button"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            disabled={saving}
            className="px-8 py-3 rounded-full bg-[#3B5EEA] text-white font-semibold text-[14px] flex items-center gap-2 hover:bg-[#2D52D6] transition-colors shadow-lg disabled:opacity-70"
          >
            {saving ? 'Menyimpan...' : 'Ubah Profil'}
            {!saving && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
