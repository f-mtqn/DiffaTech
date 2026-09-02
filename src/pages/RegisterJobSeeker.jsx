import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterJobSeeker() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Password dan Konfirmasi Password tidak cocok');
    }
    if (password.length < 6) {
      return setError('Password minimal 6 karakter');
    }

    try {
      setLoading(true);
      await signUp(email, password, { full_name: fullName, role: 'job_seeker' });
      localStorage.setItem('diffatech_role', 'job_seeker');
      navigate('/login');
    } catch (err) {
      setError('Gagal mendaftar. Pastikan email belum digunakan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900">
        <img
          src="../assets/hero.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        <div className="relative z-10 p-12 flex flex-col justify-between h-full text-white">
          <Link to="/" className="text-3xl font-bold tracking-tight text-white">diffaTech</Link>
          <div>
            <h1 className="text-4xl font-bold mb-4">Mari Mulai Perjalanan Kariermu</h1>
            <p className="text-lg text-gray-200">Ribuan kesempatan menanti talenta hebat sepertimu.</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 py-12 bg-white overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
            <span className="text-base">♿</span> disability-friendly
          </div>

          <h2 className="text-3xl font-bold mb-2">
            <span className="text-blue-600">Daftar</span> <span className="text-gray-900">hingga sampai kerja</span>
          </h2>
          <p className="text-gray-500 mb-8">Masukkan data dirimu untuk mulai mencari pekerjaan inklusif</p>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="nama@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Minimal 6 karakter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Ulangi password"
              />
            </div>

            <div className="text-sm text-gray-500 leading-relaxed">
              Dengan masuk, Anda menyetujui <a href="#" className="text-blue-600 hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-blue-600 hover:underline">Kebijakan Privasi</a> kami.*
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70"
            >
              {loading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600 flex flex-col gap-4">
            <div>
              Sudah Punya Akun? <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">Masuk</Link>
            </div>
            <Link to="/register" className="text-gray-500 hover:text-gray-800 font-medium transition-colors">
              ‹ Kembali pilih jenis akun
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
