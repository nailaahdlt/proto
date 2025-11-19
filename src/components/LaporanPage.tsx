import { useState } from 'react';
import { Download, TrendingUp, Users, GraduationCap, BookOpen, BarChart3, FileText } from 'lucide-react';
import type { User } from '../App';

interface LaporanPageProps {
  user: User;
}

export function LaporanPage({ user }: LaporanPageProps) {
  const [periodeLaporan, setPeriodeLaporan] = useState('semester-genap-2024');

  const isAdmin = user.role === 'admin';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Laporan & Statistik</h1>
        <p className="text-gray-600">Laporan akademik dan statistik institusi</p>
      </div>

      {/* Periode Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-gray-700 mb-2">Periode Laporan</label>
            <select
              value={periodeLaporan}
              onChange={(e) => setPeriodeLaporan(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="semester-genap-2024">Semester Genap 2024/2025</option>
              <option value="semester-ganjil-2024">Semester Ganjil 2024/2025</option>
              <option value="tahun-2024">Tahun Akademik 2024/2025</option>
              <option value="tahun-2023">Tahun Akademik 2023/2024</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5" />
            Export Semua Laporan
          </button>
        </div>
      </div>

      {/* Statistics Overview */}
      {isAdmin && (
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8" />
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="mb-1 opacity-90">Total Mahasiswa Aktif</p>
            <h2>2,847</h2>
            <p className="mt-2 opacity-75">↑ 12% dari semester lalu</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <GraduationCap className="w-8 h-8" />
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="mb-1 opacity-90">Lulusan Semester Ini</p>
            <h2>187</h2>
            <p className="mt-2 opacity-75">↑ 8% dari semester lalu</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <p className="mb-1 opacity-90">Mata Kuliah Aktif</p>
            <h2>342</h2>
            <p className="mt-2 opacity-75">24 Program Studi</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8" />
            </div>
            <p className="mb-1 opacity-90">IPK Rata-rata</p>
            <h2>3.42</h2>
            <p className="mt-2 opacity-75">↑ 0.08 dari semester lalu</p>
          </div>
        </div>
      )}

      {/* Available Reports */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-gray-900 mb-4">Laporan yang Tersedia</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {isAdmin && (
            <>
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">Laporan Statistik Mahasiswa</h3>
                      <p className="text-gray-600 mb-3">Data mahasiswa per program studi, angkatan, dan status</p>
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">Laporan Data Dosen</h3>
                      <p className="text-gray-600 mb-3">Daftar dosen aktif, jabatan fungsional, dan beban mengajar</p>
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">Laporan Prestasi Akademik</h3>
                      <p className="text-gray-600 mb-3">IPK, kelulusan, dan prestasi mahasiswa per periode</p>
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">Laporan Layanan Akademik</h3>
                      <p className="text-gray-600 mb-3">Statistik pengajuan surat dan layanan mahasiswa</p>
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Dosen Reports */}
          {user.role === 'dosen' && (
            <>
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">Laporan Kelas yang Diampu</h3>
                      <p className="text-gray-600 mb-3">Daftar mata kuliah dan mahasiswa yang diampu</p>
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">Laporan Nilai Mahasiswa</h3>
                      <p className="text-gray-600 mb-3">Rekap nilai dan statistik kelas</p>
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Summary Table */}
      {isAdmin && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900">Ringkasan Data Per Program Studi</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-700">Program Studi</th>
                  <th className="text-left py-4 px-6 text-gray-700">Mahasiswa Aktif</th>
                  <th className="text-left py-4 px-6 text-gray-700">Dosen</th>
                  <th className="text-left py-4 px-6 text-gray-700">Mata Kuliah</th>
                  <th className="text-left py-4 px-6 text-gray-700">IPK Rata-rata</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-900">Teknik Informatika</td>
                  <td className="py-4 px-6 text-gray-600">1,247</td>
                  <td className="py-4 px-6 text-gray-600">78</td>
                  <td className="py-4 px-6 text-gray-600">142</td>
                  <td className="py-4 px-6 text-gray-600">3.45</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-900">Sistem Informasi</td>
                  <td className="py-4 px-6 text-gray-600">892</td>
                  <td className="py-4 px-6 text-gray-600">54</td>
                  <td className="py-4 px-6 text-gray-600">98</td>
                  <td className="py-4 px-6 text-gray-600">3.38</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-900">Manajemen Informatika</td>
                  <td className="py-4 px-6 text-gray-600">708</td>
                  <td className="py-4 px-6 text-gray-600">52</td>
                  <td className="py-4 px-6 text-gray-600">102</td>
                  <td className="py-4 px-6 text-gray-600">3.42</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
