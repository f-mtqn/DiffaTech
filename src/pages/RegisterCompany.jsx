import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterCompany() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [website, setWebsite] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [alamat, setAlamat] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  
  const [industri, setIndustri] = useState(['', '']);
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleAddIndustri = () => setIndustri([...industri, '']);
  const handleIndustriChange = (index, value) => {
    const newInd = [...industri];
    newInd[index] = value;
    setIndustri(newInd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) return setError('Password tidak cocok');
    if (password.length < 6) return setError('Password minimal 6 karakter');
    if (!agreed) return setError('Anda harus menyetujui Pernyataan Kelayakan');

    try {
      setLoading(true);
      const filteredIndustri = industri.filter(i => i.trim() !== '');
      
      await signUp(email, password, {
        role: 'company',
        company_name: namaPerusahaan,
        website,
        description: deskripsi,
        address: alamat,
        logo_url: logoUrl,
        industries: filteredIndustri,
        social_media: { linkedin, youtube, instagram, twitter }
      });
      localStorage.setItem('diffatech_role', 'company');
      navigate('/login');
    } catch (err) {
      setError('Gagal mendaftar perusahaan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="text-2xl font-bold tracking-tight text-blue-600 block mb-6">diffaTech</Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <span className="text-base">♿</span> disability-friendly
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="text-blue-600">Rekrut lebih mudah,</span> <span className="text-gray-900">pasang loker gratis sekarang</span>
          </h1>
          <p className="text-gray-500 text-lg">Ribuan lowongan dari perusahaan yang peduli aksesibilitas</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Daftar Perusahaan</h2>
          
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Akun Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Informasi Akun</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                  <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Perusahaan Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Detail Perusahaan</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan</label>
                  <input type="text" required value={namaPerusahaan} onChange={e => setNamaPerusahaan(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Website (Opsional)</label>
                  <input type="url" value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Perusahaan</label>
                <textarea required value={deskripsi} onChange={e => setDeskripsi(e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Perusahaan</label>
                <textarea required value={alamat} onChange={e => setAlamat(e.target.value)} rows={2} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo Perusahaan (URL)</label>
                <input type="url" required value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="Upload Link Logo" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bidang Industri Perusahaan</label>
                <div className="space-y-2">
                  {industri.map((ind, idx) => (
                    <input key={idx} type="text" value={ind} onChange={e => handleIndustriChange(idx, e.target.value)} placeholder={`Bidang ${idx + 1}`} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                  ))}
                </div>
                <button type="button" onClick={handleAddIndustri} className="mt-2 text-sm text-blue-600 font-medium hover:text-blue-700">+ Tambah Bidang Industri</button>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Sosial Media Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Media Sosial (Opsional)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input type="url" value={linkedin} onChange={e => setLinkedin(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                  <input type="url" value={youtube} onChange={e => setYoutube(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                  <input type="url" value={instagram} onChange={e => setInstagram(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                  <input type="url" value={twitter} onChange={e => setTwitter(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* Persetujuan */}
            <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-2">Pernyataan Kelayakan & Persetujuan Perusahaan</h4>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                Kami berkomitmen untuk menciptakan lingkungan kerja yang inklusif dan ramah disabilitas. Kami menjamin aksesibilitas dan kesempatan yang setara bagi semua kandidat.
              </p>
              <p className="text-sm font-medium text-gray-700 mb-2">Kami siap untuk:</p>
              <ul className="text-sm text-gray-600 list-disc pl-5 mb-4 space-y-1">
                <li>Menyediakan fasilitas yang memadai bagi penyandang disabilitas</li>
                <li>Memberikan perlakuan yang adil selama proses rekrutmen</li>
                <li>Membangun budaya kerja yang saling menghargai dan inklusif</li>
              </ul>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm font-medium text-gray-800">
                  Perusahaan Kami setuju atas Pernyataan Kelayakan & Persetujuan Perusahaan terhadap disabilitas
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70 text-lg shadow-sm">
                {loading ? 'Memproses...' : 'Daftar Perusahaan 🏢'}
              </button>
              <div className="mt-6 text-center text-sm text-gray-600">
                Sudah Punya Akun? <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">Masuk di sini</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
