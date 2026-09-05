import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CompanySidebar from '../components/CompanySidebar';
import { useAuth } from '../context/AuthContext';
import { postJob } from '../utils/api';

const CompanyPostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    judulPekerjaan: '',
    lokasiKerja: '',
    tipeKerja: '',
    tipePekerjaan: '',
    gajiMin: '',
    gajiMax: '',
    batasPendaftaran: '',
    deskripsi: '',
    skills: '',
    disabilitas: []
  });

  const disabilitasOptions = [
    'Tunarungu',
    'Tunanetra',
    'Tunadaksa',
    'Tunawicara',
    'Disleksia',
    'Lainnya'
  ];

  const toggleDisabilitas = (item) => {
    setForm(prev => ({
      ...prev,
      disabilitas: prev.disabilitas.includes(item)
        ? prev.disabilitas.filter(d => d !== item)
        : [...prev.disabilitas, item]
    }));
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.judulPekerjaan || !form.lokasiKerja || !form.tipeKerja || !form.deskripsi) {
      setError('Harap lengkapi semua field wajib (*).');
      return;
    }

    setSaving(true);
    try {
      const gajiMinNum = parseInt(form.gajiMin.replace(/\./g, '').replace(/,/g, '')) || 0;
      const gajiMaxNum = parseInt(form.gajiMax.replace(/\./g, '').replace(/,/g, '')) || 0;
      const gajiFmt = gajiMinNum
        ? `Rp ${gajiMinNum.toLocaleString('id-ID')} / bln`
        : '-';

      const skillsArr = form.skills
        ? form.skills.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      await postJob({
        company_id: user.id,
        title: form.judulPekerjaan,
        company_name: companyMeta.company_name || 'Perusahaan Anda',
        location: form.lokasiKerja,
        work_type: form.tipeKerja,
        job_type: form.tipePekerjaan || 'Full-Time',
        salary_range: gajiFmt,
        salary_min: gajiMinNum,
        salary_max: gajiMaxNum,
        deadline: form.batasPendaftaran || null,
        description: form.deskripsi,
        disability_support: form.disabilitas.length > 0 ? form.disabilitas.join(' & ') : null,
        job_types: form.tipePekerjaan ? [form.tipePekerjaan] : [],
        skills: skillsArr,
        company_logo_letter: (companyMeta.company_name || 'P').charAt(0).toUpperCase(),
        company_verified: false,
        is_active: true,
      });
      navigate('/company-job-postings');
    } catch (err) {
      setError('Gagal memposting lowongan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar */}
      <CompanySidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Banner */}
        <div className="bg-blue-600 rounded-2xl p-8 mb-8 flex justify-between items-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-2">Posting Lowongan Baru</h2>
            <p className="text-blue-100 text-base">Meningkatkan kepercayaan kepada disabilitas</p>
          </div>
          <div className="relative z-10 hidden md:block">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-90">
              <circle cx="50" cy="20" r="8" />
              <path d="M50 28 L50 60" />
              <path d="M30 45 L50 45" />
              <circle cx="30" cy="80" r="10" />
              <circle cx="70" cy="80" r="10" />
              <path d="M20 80 L80 80" />
              <path d="M40 80 L40 60 L60 60 L60 80" />
              <path d="M10 65 L30 65" />
              <path d="M10 70 L25 70" />
            </svg>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Detail Lowongan</h3>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Judul & Lokasi */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Pekerjaan <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="judulPekerjaan"
                  value={form.judulPekerjaan}
                  onChange={handleChange}
                  placeholder="cth: UI Designer"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi Kerja <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="lokasiKerja"
                  value={form.lokasiKerja}
                  onChange={handleChange}
                  placeholder="cth: Jakarta Selatan"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Row 2: Tipe Kerja & Tipe Pekerjaan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipe Kerja <span className="text-red-500">*</span></label>
                <select
                  name="tipeKerja"
                  value={form.tipeKerja}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-600 appearance-none"
                >
                  <option value="">Pilih Tipe Kerja</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipe Pekerjaan <span className="text-red-500">*</span></label>
                <select
                  name="tipePekerjaan"
                  value={form.tipePekerjaan}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-600 appearance-none"
                >
                  <option value="">Pilih Tipe Pekerjaan</option>
                  <option value="full_time">Full Time</option>
                  <option value="part_time">Paruh Waktu</option>
                  <option value="kontrak">Kontrak</option>
                  <option value="magang">Magang</option>
                </select>
              </div>
            </div>

            {/* Row 3: Gaji Min & Max */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gaji Minimum</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 text-sm font-medium">Rp</span>
                  <input
                    type="text"
                    name="gajiMin"
                    value={form.gajiMin}
                    onChange={handleChange}
                    placeholder="cth: 5.000.000"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 placeholder-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gaji Maksimum</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 text-sm font-medium">Rp</span>
                  <input
                    type="text"
                    name="gajiMax"
                    value={form.gajiMax}
                    onChange={handleChange}
                    placeholder="cth: 15.000.000"
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Batas Pendaftaran */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Batas Pendaftaran <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="batasPendaftaran"
                  value={form.batasPendaftaran}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Skills yang Dibutuhkan</label>
                <input
                  type="text"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="cth: Figma, React, Illustrator (pisahkan dengan koma)"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 placeholder-gray-400"
                />
                <div className="flex items-center gap-1.5 mt-2 flex-wrap text-xs text-gray-500">
                  <span className="text-[11px] font-medium text-gray-400">Pilih cepat:</span>
                  {['Figma', 'React', 'JavaScript', 'UI/UX Design', 'Desain Grafis', 'Copywriting', 'Komunikasi', 'Data Entry', 'Microsoft Excel'].map((sk) => (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => {
                        const existing = form.skills ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
                        if (!existing.includes(sk)) {
                          const updated = [...existing, sk].join(', ');
                          setForm(prev => ({ ...prev, skills: updated }));
                        }
                      }}
                      className="text-[11px] bg-gray-100 hover:bg-blue-50 hover:text-blue-600 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                    >
                      + {sk}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Disabilitas yang Diterima */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Jenis Disabilitas yang Diterima <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-3">
                {disabilitasOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleDisabilitas(item)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                      form.disabilitas.includes(item)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    {form.disabilitas.includes(item) && (
                      <span className="inline-flex items-center gap-1">
                        {item} <X className="w-3 h-3" />
                      </span>
                    )}
                    {!form.disabilitas.includes(item) && item}
                  </button>
                ))}
              </div>
            </div>

            {/* Deskripsi Pekerjaan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Pekerjaan <span className="text-red-500">*</span></label>
              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                rows={6}
                placeholder="Jelaskan tanggung jawab, kualifikasi, dan keuntungan posisi ini..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 placeholder-gray-400 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate('/company-dashboard')}
                className="border-2 border-gray-200 text-gray-600 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white font-bold px-8 py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {saving ? 'Memposting...' : 'Posting Lowongan'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CompanyPostJob;
