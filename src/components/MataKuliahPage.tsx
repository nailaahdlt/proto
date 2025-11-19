import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Download, BookOpen } from 'lucide-react';
import type { User } from '../App';

interface MataKuliahPageProps {
  user: User;
}

interface MataKuliah {
  id: string;
  kode: string;
  nama: string;
  sks: number;
  semester: number;
  dosen: string;
  prodi: string;
}

const mockMataKuliah: MataKuliah[] = [
  { id: '1', kode: 'TI101', nama: 'Algoritma & Pemrograman', sks: 3, semester: 1, dosen: 'Dr. Budi Santoso', prodi: 'Teknik Informatika' },
  { id: '2', kode: 'TI102', nama: 'Basis Data', sks: 3, semester: 2, dosen: 'Ahmad Fauzi, M.Sc', prodi: 'Teknik Informatika' },
  { id: '3', kode: 'SI101', nama: 'Sistem Informasi Manajemen', sks: 2, semester: 1, dosen: 'Ir. Siti Rahmawati', prodi: 'Sistem Informasi' },
  { id: '4', kode: 'TI201', nama: 'Pemrograman Web', sks: 3, semester: 3, dosen: 'Ahmad Fauzi, M.Sc', prodi: 'Teknik Informatika' },
  { id: '5', kode: 'MI101', nama: 'Jaringan Komputer', sks: 3, semester: 2, dosen: 'Dr. Dewi Lestari', prodi: 'Manajemen Informatika' },
  { id: '6', kode: 'TI301', nama: 'Kecerdasan Buatan', sks: 3, semester: 5, dosen: 'Dr. Budi Santoso', prodi: 'Teknik Informatika' },
];

export function MataKuliahPage({ user }: MataKuliahPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProdi, setFilterProdi] = useState<string>('all');

  const canEdit = user.role === 'admin';

  const filteredMataKuliah = mockMataKuliah.filter(mk => {
    const matchSearch = mk.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       mk.kode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterProdi === 'all' || mk.prodi === filterProdi;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Mata Kuliah</h1>
          <p className="text-gray-600">Daftar mata kuliah yang tersedia</p>
        </div>
        {canEdit && (
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            Tambah Mata Kuliah
          </button>
        )}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau kode mata kuliah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterProdi}
              onChange={(e) => setFilterProdi(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Prodi</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Manajemen Informatika">Manajemen Informatika</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMataKuliah.map((mk) => (
          <div key={mk.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              {canEdit && (
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{mk.kode}</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">{mk.sks} SKS</span>
              </div>
              <h3 className="text-gray-900">{mk.nama}</h3>
              <p className="text-gray-600">Semester {mk.semester}</p>
              <p className="text-gray-600">{mk.dosen}</p>
              <p className="text-gray-500">{mk.prodi}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredMataKuliah.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Tidak ada mata kuliah yang ditemukan</p>
        </div>
      )}
    </div>
  );
}
