import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';

// Modal: Job Type
const JobTypeModal = ({ onClose, selected, onSave }) => {
  const jobTypes = [
    'Remote', 'Full-Time', 'Part-Time', 'Freelance', 'Hybrid', 'Internship', 'Contract',
  ];
  const [localSelected, setLocalSelected] = useState(
    selected ? selected.split(', ').filter(Boolean) : []
  );

  const toggle = (type) => {
    setLocalSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-md w-[659px] max-w-[95vw] p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-[24px] leading-8 text-black">Pilih Tipe Pekerjaan</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <hr className="border-[#D1D1D1]" />
        {/* Options */}
        <div className="flex flex-wrap gap-6">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggle(type)}
              className={`px-6 py-2 rounded-2xl text-[20px] leading-8 font-medium transition-colors ${
                localSelected.includes(type)
                  ? 'bg-[#1D4FD7] text-white'
                  : 'bg-[#F3F7FF]/80 text-black'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-8">
          <button
            onClick={onClose}
            className="px-9 py-3 rounded border border-[#1D4FD7] text-[#1D4FD7] font-medium text-[16px] bg-[#FAFAFA]"
          >
            Batal
          </button>
          <button
            onClick={() => { onSave(localSelected.join(', ')); onClose(); }}
            className="px-9 py-3 rounded bg-[#1D4FD7] text-white font-bold text-[16px]"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal: Disability
const DisabilityModal = ({ onClose, selected, onSave }) => {
  const disabilities = [
    'Tunanetra', 'Tunarungu', 'Tunadaksa', 'Tunawicara', 'Disleksia',
  ];
  const [localSelected, setLocalSelected] = useState(
    selected ? selected.split(', ').filter(Boolean) : []
  );

  const toggle = (d) => {
    setLocalSelected((prev) =>
      prev.includes(d) ? prev.filter((t) => t !== d) : [...prev, d]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-md w-[659px] max-w-[95vw] p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-[24px] leading-8 text-black">Pilih Tipe Disabilitas</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <hr className="border-[#D1D1D1]" />
        {/* Options */}
        <div className="flex flex-wrap gap-6">
          {disabilities.map((d) => (
            <button
              key={d}
              onClick={() => toggle(d)}
              className={`px-6 py-2 rounded-2xl text-[20px] leading-8 font-medium transition-colors ${
                localSelected.includes(d)
                  ? 'bg-[#1D4FD7] text-white'
                  : 'bg-[#F3F7FF]/80 text-black'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-8">
          <button
            onClick={onClose}
            className="px-9 py-3 rounded border border-[#1D4FD7] text-[#1D4FD7] font-medium text-[16px] bg-[#FAFAFA]"
          >
            Batal
          </button>
          <button
            onClick={() => { onSave(localSelected.join(', ')); onClose(); }}
            className="px-9 py-3 rounded bg-[#1D4FD7] text-white font-bold text-[16px]"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast notification
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#1D4FD7] text-white px-6 py-3 rounded-2xl shadow-xl">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="font-semibold text-[15px]">{message}</span>
    </div>
  );
};

// Add button (blue +)
const AddButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-8 h-9 rounded-xl bg-[#155DFC] flex items-center justify-center text-white shadow-sm hover:bg-[#1447E6] transition-colors shrink-0"
  >
    <span className="font-bold text-[18px] leading-none">+</span>
  </button>
);

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Form state — always editable
  const [namaLengkap, setNamaLengkap] = useState('');
  const [emailField, setEmailField] = useState('');
  const [myAbout, setMyAbout] = useState('');
  const [alamat, setAlamat] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [pengalaman, setPengalaman] = useState([
    { posisi: '', perusahaan: '', mulaiKerja: '', akhirKerja: '' },
  ]);
  const [sertifikasi, setSertifikasi] = useState(['', '']);
  const [skills, setSkills] = useState(['', '']);
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState('');
  const [jobType, setJobType] = useState('');
  const [tahunPendidikan, setTahunPendidikan] = useState('');
  const [disabilitas, setDisabilitas] = useState('');

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [showJobTypeModal, setShowJobTypeModal] = useState(false);
  const [showDisabilityModal, setShowDisabilityModal] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // Pengalaman handlers
  const addPengalaman = () =>
    setPengalaman([...pengalaman, { posisi: '', perusahaan: '', mulaiKerja: '', akhirKerja: '' }]);
  const updatePengalaman = (index, field, value) => {
    const updated = [...pengalaman];
    updated[index][field] = value;
    setPengalaman(updated);
  };

  // Sertifikasi handlers
  const addSertifikasi = () => setSertifikasi([...sertifikasi, '']);
  const updateSertifikasi = (index, value) => {
    const updated = [...sertifikasi];
    updated[index] = value;
    setSertifikasi(updated);
  };

  // Skills handlers
  const addSkill = () => setSkills([...skills, '']);
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
      setToast('Profil berhasil disimpan!');
    } catch (err) {
      setToast('Gagal menyimpan. Coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] text-[13px] text-[#1D293D] bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all placeholder:text-[#CAD5E2]';

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Inter']">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-white border-b border-[#F1F5F9] z-40 flex items-center justify-between px-8">
        <Link to="/dashboard" className="font-bold text-[18px] text-[#155DFC] tracking-tight">
          diffaTech
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/profile" className="font-semibold text-[14px] text-[#155DFC]">
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
      <main className="pt-[60px] w-full flex justify-center">
        <div className="w-full max-w-[672px] px-6 py-10 flex flex-col gap-0">

          {/* TOP BANNER — disability-friendly badge + heading */}
          <div className="flex flex-col items-center gap-3 mb-8">
            {/* Badge */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] rounded-full px-3 py-1.5 shadow-sm">
              {/* Accessibility icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="5" r="2" fill="#62748E"/>
                <path d="M12 7v5M9 9l-3 5h4l1 4h2l1-4h4l-3-5" stroke="#62748E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium text-[12px] text-[#62748E]">disability-friendly</span>
            </div>
            {/* Heading */}
            <h1 className="font-bold text-[24px] leading-8 text-center text-[#155DFC]">
              Update profile <span className="text-[#1D293D]">kamu, supaya </span>HR kamu melirik
            </h1>
            {/* Subtext */}
            <p className="font-medium text-[14px] text-[#2B7FFF] text-center">
              Ribuan lowongan{' '}
              <span className="font-normal text-[#62748E]">dari perusahaan yang peduli aksesibilitas</span>
            </p>
          </div>

          {/* FORM CARD */}
          <div className="bg-white border border-[#F1F5F9] rounded-2xl shadow-sm p-6 flex flex-col gap-6">

            {/* Profile Header — avatar + name */}
            <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
                  {(user?.user_metadata?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-semibold text-[14px] text-[#1D293D]">
                    {user?.user_metadata?.full_name || 'profile'}
                  </h2>
                  <p className="text-[12px] text-[#90A1B9]">{user?.email || 'm@example.com'}</p>
                </div>
              </div>
              {/* Edit icon button */}
              <button className="p-2 border border-[#E2E8F0] rounded-xl text-[#62748E] hover:text-blue-600 hover:border-blue-300 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Daftar Perusahaan Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[14px] text-[#314158]">Daftar Perusahaan</h3>

              {/* Nama Lengkap & Email */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-[#45556C]">Nama Lengkap</label>
                  <input type="text" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} className={inputClass} placeholder="Nama lengkap kamu"/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-[#45556C]">Email</label>
                  <input type="email" value={emailField} onChange={(e) => setEmailField(e.target.value)} className={inputClass} placeholder="email@contoh.com"/>
                </div>
              </div>

              {/* My About */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#45556C]">My About</label>
                <textarea value={myAbout} onChange={(e) => setMyAbout(e.target.value)} rows={4} className={`${inputClass} resize-none`} placeholder="Ceritakan sedikit tentang dirimu..."/>
              </div>

              {/* Alamat */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#45556C]">Alamat</label>
                <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} className={inputClass} placeholder="Kota, Provinsi"/>
              </div>

              {/* CV */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#45556C]">CV (Masukan URL)</label>
                <div className="relative">
                  <input type="text" value={cvUrl} onChange={(e) => setCvUrl(e.target.value)} className={inputClass} placeholder="Upload CV"/>
                  {!cvUrl && (
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none text-[13px] text-[#90A1B9]">
                      Upload CV
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Pengalaman */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-[14px] text-[#314158]">Pengalaman</h3>
              {pengalaman.map((exp, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-semibold text-[#45556C]">Posisi</label>
                      <input type="text" value={exp.posisi} onChange={(e) => updatePengalaman(idx, 'posisi', e.target.value)} className={inputClass} placeholder="Posisi"/>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-semibold text-[#45556C]">Nama Perusahaan/Komunitas</label>
                      <input type="text" value={exp.perusahaan} onChange={(e) => updatePengalaman(idx, 'perusahaan', e.target.value)} className={inputClass} placeholder="Perusahaan"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[12px] font-semibold text-[#45556C]">Mulai kerja</label>
                      <input type="text" value={exp.mulaiKerja} onChange={(e) => updatePengalaman(idx, 'mulaiKerja', e.target.value)} className={inputClass} placeholder="Bulan Tahun"/>
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex-1 flex flex-col gap-1">
                        <label className="text-[12px] font-semibold text-[#45556C]">Akhir kerja</label>
                        <input type="text" value={exp.akhirKerja} onChange={(e) => updatePengalaman(idx, 'akhirKerja', e.target.value)} className={inputClass} placeholder="Bulan Tahun / Sekarang"/>
                      </div>
                      {idx === pengalaman.length - 1 && <AddButton onClick={addPengalaman}/>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sertifikasi */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-[14px] text-[#314158]">Sertifikasi (Masukan URL)</h3>
              <div className="space-y-2">
                {sertifikasi.map((s, idx) => (
                  <input key={idx} type="text" value={s} onChange={(e) => updateSertifikasi(idx, e.target.value)} className={inputClass} placeholder="Upload Sertifikasi"/>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input type="text" value={sertifikasi[sertifikasi.length - 1] || ''} onChange={(e) => updateSertifikasi(sertifikasi.length - 1, e.target.value)} className={`${inputClass} flex-1`} placeholder="Upload Sertifikasi"/>
                <AddButton onClick={addSertifikasi}/>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-[14px] text-[#314158]">Skills</h3>
              {skills.map((skill, idx) => (
                <input key={idx} type="text" value={skill} onChange={(e) => updateSkill(idx, e.target.value)} className={`${inputClass} border-b border-t-0 border-l-0 border-r-0 rounded-none px-1 py-2`} placeholder={`Skill ${idx + 1}`}/>
              ))}
              <div className="flex justify-end">
                <AddButton onClick={addSkill}/>
              </div>
            </div>

            {/* Pendidikan & Job Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#45556C]">Pendidikan Terakhir</label>
                <input type="text" value={pendidikanTerakhir} onChange={(e) => setPendidikanTerakhir(e.target.value)} className={inputClass} placeholder="S1, SMA, dll"/>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#45556C]">Job Type</label>
                <button
                  type="button"
                  onClick={() => setShowJobTypeModal(true)}
                  className={`${inputClass} text-left flex justify-between items-center`}
                >
                  <span className={jobType ? 'text-[#1D293D]' : 'text-[#CAD5E2]'}>
                    {jobType || 'Remote, Full-Time'}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#90A1B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            {/* Tahun Pendidikan & Disabilitas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#45556C]">Tahun Pendidikan</label>
                <input type="text" value={tahunPendidikan} onChange={(e) => setTahunPendidikan(e.target.value)} className={inputClass} placeholder="2019 - 2023"/>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#45556C]">Disabilitas</label>
                <button
                  type="button"
                  onClick={() => setShowDisabilityModal(true)}
                  className={`${inputClass} text-left flex justify-between items-center`}
                >
                  <span className={disabilitas ? 'text-[#1D293D]' : 'text-[#CAD5E2]'}>
                    {disabilitas || 'Pilih tipe disabilitas'}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#90A1B9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 bg-[#1447E6] text-white font-semibold text-[14px] rounded-xl shadow-[0_2px_4px_-2px_rgba(190,219,255,1),0_4px_6px_-1px_rgba(190,219,255,1)] hover:bg-[#1035c8] transition-colors disabled:opacity-70"
              >
                {saving ? 'Menyimpan...' : 'Ubah Profil'}
                {!saving && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 21V13H7V21M7 3V8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showJobTypeModal && (
        <JobTypeModal
          onClose={() => setShowJobTypeModal(false)}
          selected={jobType}
          onSave={(val) => setJobType(val)}
        />
      )}
      {showDisabilityModal && (
        <DisabilityModal
          onClose={() => setShowDisabilityModal(false)}
          selected={disabilitas}
          onSave={(val) => setDisabilitas(val)}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
