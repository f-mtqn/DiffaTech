import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CompanySidebar from '../components/CompanySidebar';
import { useAuth } from '../context/AuthContext';
import { updateJob, fetchJobById } from '../utils/api';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    title: '',
    location: '',
    work_type: '',
    job_type: '',
    salary_min: '',
    salary_max: '',
    deadline: '',
    description: '',
    skills: '',
    disability_support: '',
    disabilitas: [],
  });

  const disabilitasOptions = ['Tunarungu', 'Tunanetra', 'Tunadaksa', 'Tunawicara', 'Disleksia', 'Lainnya'];

  useEffect(() => {
    if (id) loadJob();
  }, [id]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadJob = async () => {
    setLoading(true);
    try {
      const data = await fetchJobById(id);
      if (!data) { navigate('/company-job-postings'); return; }
      // Pastikan ini milik company yang sedang login
      if (data.company_id !== user?.id) {
        navigate('/company-job-postings');
        return;
      }
      // Parse disability_support ke array
      const disabilitas = data.disability_support
        ? data.disability_support.split(' & ').map((s) => s.trim()).filter(Boolean)
        : [];
      setForm({
        title: data.title || '',
        location: data.location || '',
        work_type: data.work_type || '',
        job_type: data.job_type || '',
        salary_min: data.salary_min ? String(data.salary_min) : '',
        salary_max: data.salary_max ? String(data.salary_max) : '',
        deadline: data.deadline ? data.deadline.split('T')[0] : '',
        description: data.description || '',
        skills: data.skills ? data.skills.join(', ') : '',
        disability_support: data.disability_support || '',
        disabilitas,
      });
    } catch (err) {
      console.error('Error loading job for edit:', err);
      navigate('/company-job-postings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleDisabilitas = (item) => {
    setForm((prev) => ({
      ...prev,
      disabilitas: prev.disabilitas.includes(item)
        ? prev.disabilitas.filter((d) => d !== item)
        : [...prev.disabilitas, item],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.work_type || !form.description) {
      showToast('Harap lengkapi semua field wajib (*).', 'error');
      return;
    }
    setSaving(true);
    try {
      const gajiMin = parseInt(form.salary_min) || 0;
      const gajiMax = parseInt(form.salary_max) || 0;
      const gajiFmt = gajiMin ? `Rp ${gajiMin.toLocaleString('id-ID')} / bln` : '-';
      const skillsArr = form.skills
        ? form.skills.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      await updateJob(id, {
        title: form.title,
        location: form.location,
        work_type: form.work_type,
        job_type: form.job_type || 'Full-Time',
        salary_range: gajiFmt,
        salary_min: gajiMin,
        salary_max: gajiMax,
        deadline: form.deadline || null,
        description: form.description,
        skills: skillsArr,
        disability_support: form.disabilitas.length > 0 ? form.disabilitas.join(' & ') : null,
        updated_at: new Date().toISOString(),
      });
      showToast('Lowongan berhasil diperbarui!', 'success');
      setTimeout(() => navigate('/company-job-postings'), 1500);
    } catch (err) {
      showToast('Gagal memperbarui lowongan. Coba lagi.', 'error');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
        <CompanySidebar />
        <main className="flex-1 ml-64 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-500">Memuat data lowongan...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <CompanySidebar />
      <main className="flex-1 ml-64 p-8">
        {/* Banner */}
        <div className="bg-blue-600 rounded-2xl p-8 mb-8 flex justify-between items-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-2">Edit Lowongan</h2>
            <p className="text-blue-100 text-base">Perbarui informasi lowongan yang sudah ada</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Detail Lowongan</h3>

          {toast && (
            <div className={`mb-6 p-3.5 rounded-xl border flex items-center gap-2 text-sm ${
              toast.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              {toast.type === 'error'
                ? <XCircle className="w-4 h-4 shrink-0" />
                : <CheckCircle2 className="w-4 h-4 shrink-0" />
              }
              {toast.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Pekerjaan <span className="text-red-500">*</span></label>
                <input type="text" name="title" value={form.title} onChange={handleChange}
                  placeholder="cth: UI Designer"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi Kerja <span className="text-red-500">*</span></label>
                <input type="text" name="location" value={form.location} onChange={handleChange}
                  placeholder="cth: Jakarta Selatan"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipe Kerja <span className="text-red-500">*</span></label>
                <select name="work_type" value={form.work_type} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                  <option value="">Pilih tipe kerja</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipe Pekerjaan</label>
                <select name="job_type" value={form.job_type} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                  <option value="">Pilih tipe pekerjaan</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Magang">Magang / Internship</option>
                  <option value="Kontrak">Kontrak</option>
                </select>
              </div>
            </div>

            {/* Row 3 - Gaji */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gaji Min (Rp)</label>
                <input type="number" name="salary_min" value={form.salary_min} onChange={handleChange}
                  placeholder="5000000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gaji Max (Rp)</label>
                <input type="number" name="salary_max" value={form.salary_max} onChange={handleChange}
                  placeholder="10000000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Batas Pendaftaran</label>
                <input type="date" name="deadline" value={form.deadline} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Pekerjaan <span className="text-red-500">*</span></label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={5}
                placeholder="Jelaskan tanggung jawab, kualifikasi, dan benefit..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none" />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Skills yang Dibutuhkan</label>
              <input
                type="text"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="cth: Figma, React, Illustrator (pisahkan dengan koma)"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 placeholder-gray-400"
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

            {/* Disabilitas Support */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Dukungan Disabilitas</label>
              <div className="flex flex-wrap gap-2">
                {disabilitasOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleDisabilitas(item)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      form.disabilitas.includes(item)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {form.disabilitas.includes(item) ? '✓ ' : ''}{item}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate('/company-job-postings')}
                className="border-2 border-gray-200 text-gray-600 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white font-bold px-8 py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-60 cursor-pointer inline-flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditJob;
