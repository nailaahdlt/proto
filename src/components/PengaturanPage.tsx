import { useState } from 'react';
import { User, Lock, Bell, Shield, Mail, Phone, MapPin, Save } from 'lucide-react';
import type { User as UserType } from '../App';

interface PengaturanPageProps {
  user: UserType;
}

export function PengaturanPage({ user }: PengaturanPageProps) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Pengaturan</h1>
        <p className="text-gray-600">Kelola profil dan preferensi akun Anda</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Profil</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'security'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                <span>Keamanan</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'notifications'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <span>Notifikasi</span>
              </div>
            </button>
            {user.role === 'admin' && (
              <button
                onClick={() => setActiveTab('system')}
                className={`px-6 py-4 border-b-2 transition-colors ${
                  activeTab === 'system'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>Sistem</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-gray-900 mb-4">Informasi Profil</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">No. Telepon</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="+62 xxx xxxx xxxx"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Role</label>
                      <input
                        type="text"
                        value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Alamat</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        rows={3}
                        placeholder="Alamat lengkap"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Save className="w-5 h-5" />
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-gray-900 mb-4">Keamanan Akun</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Password Lama</label>
                    <input
                      type="password"
                      placeholder="Masukkan password lama"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Password Baru</label>
                    <input
                      type="password"
                      placeholder="Masukkan password baru"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Konfirmasi Password Baru</label>
                    <input
                      type="password"
                      placeholder="Konfirmasi password baru"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Lock className="w-5 h-5" />
                    Ubah Password
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-gray-900 mb-4">Aktivitas Login</h2>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Login terakhir</p>
                        <p className="text-gray-600">19 November 2025, 09:45 WIB</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Aktif</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-gray-900 mb-4">Preferensi Notifikasi</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <p className="text-gray-900">Email Notifikasi</p>
                      <p className="text-gray-600">Terima notifikasi melalui email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>

                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <p className="text-gray-900">Notifikasi Layanan</p>
                      <p className="text-gray-600">Update status permohonan layanan</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>

                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <p className="text-gray-900">Pengumuman Kampus</p>
                      <p className="text-gray-600">Informasi dan pengumuman resmi</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>

                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <p className="text-gray-900">Jadwal Kuliah</p>
                      <p className="text-gray-600">Reminder jadwal dan perubahan</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </label>

                  <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Save className="w-5 h-5" />
                    Simpan Preferensi
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && user.role === 'admin' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-gray-900 mb-4">Pengaturan Sistem</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-gray-900 mb-2">Backup Database</h3>
                    <p className="text-gray-600 mb-4">Terakhir backup: Hari ini, 03:00 WIB</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Backup Sekarang
                    </button>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-gray-900 mb-2">Maintenance Mode</h3>
                    <p className="text-gray-600 mb-4">Matikan akses sistem untuk maintenance</p>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-5 h-5" />
                      <span className="text-gray-700">Aktifkan Maintenance Mode</span>
                    </label>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-gray-900 mb-2">Audit Log</h3>
                    <p className="text-gray-600 mb-4">Rekam semua aktivitas sistem</p>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Lihat Log
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
