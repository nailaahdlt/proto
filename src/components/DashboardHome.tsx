import { Users, GraduationCap, BookOpen, FileText, TrendingUp, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import type { User } from '../App';

interface DashboardHomeProps {
  user: User;
}

export function DashboardHome({ user }: DashboardHomeProps) {
  const isAdmin = user.role === 'admin';
  const isDosen = user.role === 'dosen';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Selamat datang, {user.name}</p>
      </div>

      {/* Statistics Cards - Admin & Dosen */}
      {(isAdmin || isDosen) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>+12%</span>
              </span>
            </div>
            <p className="text-gray-600 mb-1">Total Mahasiswa</p>
            <h2 className="text-gray-900">{isAdmin ? '2,847' : '156'}</h2>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>+5%</span>
              </span>
            </div>
            <p className="text-gray-600 mb-1">Total Dosen</p>
            <h2 className="text-gray-900">{isAdmin ? '184' : '12'}</h2>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Mata Kuliah Aktif</p>
            <h2 className="text-gray-900">{isAdmin ? '342' : '24'}</h2>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-orange-600 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Pending</span>
              </span>
            </div>
            <p className="text-gray-600 mb-1">Layanan Akademik</p>
            <h2 className="text-gray-900">{isAdmin ? '47' : '3'}</h2>
          </div>
        </div>
      )}

      {/* Quick Access - All Users */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-gray-700">Jadwal Kuliah</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-gray-700">Pengajuan Surat</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-gray-700">Daftar Matakuliah</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-gray-700">Data Mahasiswa</span>
          </button>
        </div>
      </div>

      {/* Recent Activities & Notifications */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-gray-900 mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            <div className="flex gap-3 pb-4 border-b border-gray-100">
              <div className="p-2 bg-green-100 rounded-lg h-fit">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Pengajuan surat keterangan mahasiswa disetujui</p>
                <p className="text-gray-500">2 jam yang lalu</p>
              </div>
            </div>

            <div className="flex gap-3 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-100 rounded-lg h-fit">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Jadwal kuliah semester genap telah dipublikasi</p>
                <p className="text-gray-500">5 jam yang lalu</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="p-2 bg-purple-100 rounded-lg h-fit">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Mata kuliah baru ditambahkan ke kurikulum</p>
                <p className="text-gray-500">1 hari yang lalu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-gray-900 mb-4">Notifikasi Layanan</h2>
          <div className="space-y-4">
            <div className="flex gap-3 pb-4 border-b border-gray-100">
              <div className="p-2 bg-orange-100 rounded-lg h-fit">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Pengajuan revisi data sedang diproses</p>
                <p className="text-gray-500">Status: Dalam Antrian</p>
              </div>
            </div>

            <div className="flex gap-3 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-100 rounded-lg h-fit">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Pendaftaran KRS periode 2025/2026 dibuka</p>
                <p className="text-gray-500">Batas: 30 November 2025</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="p-2 bg-green-100 rounded-lg h-fit">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Sistem backup data berhasil dijalankan</p>
                <p className="text-gray-500">Terakhir: Hari ini, 03:00 WIB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log - Admin Only */}
      {isAdmin && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-gray-900 mb-4">Audit Log - Aktivitas Sistem</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">Waktu</th>
                  <th className="text-left py-3 px-4 text-gray-700">User</th>
                  <th className="text-left py-3 px-4 text-gray-700">Aktivitas</th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-600">19/11/2025 14:30</td>
                  <td className="py-3 px-4 text-gray-900">Admin IT</td>
                  <td className="py-3 px-4 text-gray-600">Update data mahasiswa</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Success</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-600">19/11/2025 13:15</td>
                  <td className="py-3 px-4 text-gray-900">Dosen - Dr. Budi</td>
                  <td className="py-3 px-4 text-gray-600">Upload nilai ujian</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Success</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-600">19/11/2025 11:00</td>
                  <td className="py-3 px-4 text-gray-900">Mahasiswa - Ahmad</td>
                  <td className="py-3 px-4 text-gray-600">Pengajuan surat keterangan</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}