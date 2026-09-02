import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import heroImage from '../assets/hero.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pencari_kerja'); // 'pencari_kerja' | 'perusahaan'
  const [rememberMe, setRememberMe] = useState(false);

  const { signIn, setRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Harap lengkapi email dan kata sandi.');
      return;
    }

    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);

      if (signInError) {
        if (signInError.message?.toLowerCase().includes('invalid login credentials')) {
          setError('Email atau kata sandi yang Anda masukkan salah.');
        } else {
          setError(signInError.message || 'Gagal masuk. Silakan coba lagi.');
        }
        setLoading(false);
        return;
      }

      // Successful login
      const chosenRole = activeTab === 'perusahaan' ? 'company' : 'job_seeker';
      setRole(chosenRole);
      if (chosenRole === 'company') {
        navigate('/company-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch {
      setError('Terjadi kesalahan jaringan atau server. Silakan coba beberapa saat lagi.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white font-sans antialiased text-gray-800">
      {/* Left Panel: Hero Image (Hidden on mobile) */}
      <div className="relative hidden md:flex md:w-1/2 bg-slate-900 overflow-hidden flex-col justify-between p-8 lg:p-12">
        {/* Background Image with Overlay */}
        <img
          src={heroImage}
          alt="diffaTech Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Gradient & Tint Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />

        {/* Decorative Pill/Arch element from design */}
        <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-72 rounded-full bg-gradient-to-b from-blue-500/70 via-blue-400/40 to-transparent blur-xs opacity-80" />

        {/* Top Header / Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-block text-2xl lg:text-3xl font-extrabold text-blue-600 tracking-tight drop-shadow-xs">
            diffaTech
          </Link>
        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10 max-w-md">
          <p className="text-white text-base lg:text-lg font-medium leading-relaxed drop-shadow-md">
            Platform kerja inklusif untuk talenta disabilitas
          </p>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex w-full md:w-1/2 flex-col justify-center items-center px-6 sm:px-12 lg:px-20 py-10 bg-white">
        <div className="w-full max-w-[420px] mx-auto flex flex-col">
          {/* Mobile Logo View */}
          <div className="md:hidden mb-6">
            <Link to="/" className="text-2xl font-black text-blue-600 tracking-tight">
              diffaTech
            </Link>
          </div>

          {/* Badge Pill */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 bg-gray-50/80 text-xs font-medium text-gray-600 shadow-2xs">
              <span>♿</span>
              <span>disability-friend</span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-[32px] font-bold text-gray-900 tracking-tight leading-snug">
            <span className="text-blue-600">Masuk</span> hinga sampai kerja
          </h1>

          {/* Subtitle */}
          <p className="mt-1.5 text-sm text-gray-500 leading-normal">
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Ribuan lowongan
            </span>{' '}
            dari perusahaan yang peduli aksesibilitas
          </p>

          {/* Tab Toggle (Pill Toggle Group) */}
          <div className="mt-6 mb-5 grid grid-cols-2 p-1 rounded-2xl bg-gray-50 border border-gray-200/90 text-sm">
            <button
              type="button"
              onClick={() => {
                setActiveTab('pencari_kerja');
                setError('');
              }}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all text-center ${
                activeTab === 'pencari_kerja'
                  ? 'bg-white text-blue-600 font-semibold shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pencari Kerja
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('perusahaan');
                setError('');
              }}
              className={`py-2.5 px-4 rounded-xl font-medium transition-all text-center ${
                activeTab === 'perusahaan'
                  ? 'bg-white text-blue-600 font-semibold shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Perusahaan
            </button>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2 animate-fadeIn">
              <svg
                className="w-4 h-4 text-red-500 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>

            {/* Checkbox and Forgot Password */}
            <div className="flex items-center justify-between pt-0.5 text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs sm:text-sm">Ingat Saya</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                Lupa Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span>Memproses...</span>
                </div>
              ) : activeTab === 'pencari_kerja' ? (
                'Masuk'
              ) : (
                'Masuk sebagai Perusahaan'
              )}
            </button>
          </form>

          {/* Bottom Link to Register */}
          <div className="mt-8 text-center text-xs sm:text-sm text-gray-600">
            <span>Belum Punya Akun? </span>
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-block"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
