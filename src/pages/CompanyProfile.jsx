import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';
import CompanySidebar from '../components/CompanySidebar';

// Toast notification
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-xl">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <span className="font-semibold text-[15px]">{message}</span>
    </div>
  );
};

export default function CompanyProfile() {
  const { user } = useAuth();

  const [companyName, setCompanyName] = useState('');
  const [emailField, setEmailField] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [industries, setIndustries] = useState(['', '']);
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Load existing data from user metadata
  useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {};
      setCompanyName(meta.company_name || '');
      setEmailField(user.email || '');
      setDescription(meta.description || '');
      setAddress(meta.address || '');
      setWebsite(meta.website || '');
      setLogoUrl(meta.logo_url || '');
      setIndustries(meta.industries?.length ? meta.industries : ['', '']);
      setLinkedin(meta.social_media?.linkedin || '');
      setYoutube(meta.social_media?.youtube || '');
      setInstagram(meta.social_media?.instagram || '');
      setTwitter(meta.social_media?.twitter || '');
    }
  }, [user]);

  const handleAddIndustry = () => setIndustries([...industries, '']);
  const handleIndustryChange = (index, value) => {
    const updated = [...industries];
    updated[index] = value;
    setIndustries(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          company_name: companyName,
          description,
          address,
          website,
          logo_url: logoUrl,
          industries: industries.filter(i => i.trim() !== ''),
          social_media: { linkedin, youtube, instagram, twitter },
        },
      });
      if (error) throw error;
      setToast('Profil perusahaan berhasil disimpan!');
    } catch {
      setToast('Gagal menyimpan. Coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400';

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <CompanySidebar />

      <main className="flex-1 ml-64 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profil Perusahaan</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola informasi perusahaan Anda</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 max-w-3xl">
          {/* Company Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-100 mb-6">
            <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-white text-lg font-bold shrink-0">
              {(companyName || 'P').charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold text-lg text-gray-900">{companyName || 'Nama Perusahaan'}</h2>
              <p className="text-sm text-gray-500">{emailField}</p>
            </div>
          </div>

          {/* Information Section */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm text-gray-800">Informasi Perusahaan</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Nama Perusahaan</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputClass} placeholder="Nama perusahaan" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Email</label>
                <input type="email" value={emailField} onChange={(e) => setEmailField(e.target.value)} className={inputClass} placeholder="email@perusahaan.com" disabled />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Deskripsi Perusahaan</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={`${inputClass} resize-none`} placeholder="Ceritakan tentang perusahaan Anda..." />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Alamat</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} placeholder="Alamat perusahaan" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Website</label>
                <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} className={inputClass} placeholder="https://" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Logo (URL)</label>
                <input type="url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className={inputClass} placeholder="URL logo perusahaan" />
              </div>
            </div>

            {/* Industries */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-600">Bidang Industri</label>
              {industries.map((ind, idx) => (
                <input key={idx} type="text" value={ind} onChange={(e) => handleIndustryChange(idx, e.target.value)} className={inputClass} placeholder={`Bidang ${idx + 1}`} />
              ))}
              <button type="button" onClick={handleAddIndustry} className="text-sm text-blue-600 font-medium hover:text-blue-700 self-start">+ Tambah Bidang</button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mt-8 space-y-4">
            <h3 className="font-bold text-sm text-gray-800">Media Sosial</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">LinkedIn</label>
                <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className={inputClass} placeholder="https://linkedin.com/company/..." />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">YouTube</label>
                <input type="url" value={youtube} onChange={(e) => setYoutube(e.target.value)} className={inputClass} placeholder="https://youtube.com/..." />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Instagram</label>
                <input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} className={inputClass} placeholder="https://instagram.com/..." />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Twitter</label>
                <input type="url" value={twitter} onChange={(e) => setTwitter(e.target.value)} className={inputClass} placeholder="https://twitter.com/..." />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-8">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70 shadow-sm"
            >
              {saving ? 'Menyimpan...' : 'Simpan Profil'}
              {!saving && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 21V13H7V21M7 3V8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
          </div>
        </div>
      </main>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
