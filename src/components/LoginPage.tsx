import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { UserRole } from '../App';
import loginBg from 'figma:asset/11a14fa92287e5460f137cf7133639994dfca3f8.png';
import logoEduSys from 'figma:asset/b9b09e3898d01e94f9ee7b85f156bf9d1964f528.png';

interface LoginPageProps {
  onLogin: (email: string, password: string, role: UserRole) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('mahasiswa');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Section - Branding & Info */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={loginBg} alt="" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <img src={logoEduSys} alt="EduSys Logo" className="w-48 h-48 mx-auto mb-6" />
              <h1 className="text-center mb-2">EduSys</h1>
              <p className="text-blue-100 text-center">Sistem Informasi Akademik</p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="mb-4">Politeknik Praktisi Bandung</h2>
                <p className="text-blue-100">
                  Mengelola seluruh data akademik Anda dengan efisien, terintegras, dan aman.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-3">
                <h3 className="text-blue-50">Fitur Unggulan:</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>✓ Manajemen data mahasiswa & dosen terpusat</li>
                  <li>✓ Pengajuan surat digital & tracking real-time</li>
                  <li>✓ Jadwal akademik terintegrasi</li>
                  <li>✓ Laporan & statistik komprehensif</li>
                  <li>✓ Akses multi-platform (web, mobile)</li>
                </ul>
              </div>

              <div className="text-center text-blue-100">
                <p>© 2025 Politeknik Praktisi Bandung. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-gray-900 mb-2">Selamat Datang</h2>
              <p className="text-gray-600">Silakan login untuk melanjutkan ke sistem</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selector */}
              <div>
                <label className="block text-gray-700 mb-2">Masuk Sebagai</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['mahasiswa', 'dosen', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all capitalize ${
                        role === r
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-gray-700">
                  <input type="checkbox" className="mr-2 rounded" />
                  Ingat saya
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  Lupa password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>

              {/* Help Text */}
              <div className="text-center text-gray-600">
                <p>Butuh bantuan? Hubungi admin IT kampus</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
