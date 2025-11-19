import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Download, Filter } from 'lucide-react';
import type { User } from '../App';

interface MahasiswaPageProps {
  user: User;
}

interface Mahasiswa {
  id: string;
  nim: string;
  nama: string;
  prodi: string;
  angkatan: string;
  status: 'Aktif' | 'Cuti' | 'Lulus';
  email: string;
}

const mockMahasiswa: Mahasiswa[] = [
  { id: '1', nim: '2021001', nama: 'Ahmad Rizki Pratama', prodi: 'Teknik Informatika', angkatan: '2021', status: 'Aktif', email: 'ahmad.rizki@student.ppb.ac.id' },
  { id: '2', nim: '2021002', nama: 'Siti Nurhaliza', prodi: 'Sistem Informasi', angkatan: '2021', status: 'Aktif', email: 'siti.nur@student.ppb.ac.id' },
  { id: '3', nim: '2020045', nama: 'Budi Santoso', prodi: 'Teknik Informatika', angkatan: '2020', status: 'Aktif', email: 'budi.santoso@student.ppb.ac.id' },
  { id: '4', nim: '2019078', nama: 'Dewi Lestari', prodi: 'Manajemen Informatika', angkatan: '2019', status: 'Lulus', email: 'dewi.lestari@student.ppb.ac.id' },
  { id: '5', nim: '2021156', nama: 'Eko Prasetyo', prodi: 'Teknik Komputer', angkatan: '2021', status: 'Cuti', email: 'eko.prasetyo@student.ppb.ac.id' },
];

export function MahasiswaPage({ user }: MahasiswaPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const canEdit = user.role === 'admin';

  const filteredMahasiswa = mockMahasiswa.filter(m => {
    const matchSearch = m.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       m.nim.includes(searchTerm);
    const matchFilter = filterStatus === 'all' || m.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'bg-green-100 text-green-700';
      case 'Cuti': return 'bg-yellow-100 text-yellow-700';
      case 'Lulus': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Data Mahasiswa</h1>
          <p className="text-gray-600">Kelola seluruh data mahasiswa terdaftar</p>
        </div>
        {canEdit && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Tambah Mahasiswa
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
                placeholder="Cari berdasarkan nama atau NIM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Cuti">Cuti</option>
                <option value="Lulus">Lulus</option>
              </select>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-gray-700">NIM</th>
                <th className="text-left py-4 px-6 text-gray-700">Nama</th>
                <th className="text-left py-4 px-6 text-gray-700">Program Studi</th>
                <th className="text-left py-4 px-6 text-gray-700">Angkatan</th>
                <th className="text-left py-4 px-6 text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-gray-700">Email</th>
                {canEdit && <th className="text-left py-4 px-6 text-gray-700">Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {filteredMahasiswa.map((mahasiswa) => (
                <tr key={mahasiswa.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-900">{mahasiswa.nim}</td>
                  <td className="py-4 px-6 text-gray-900">{mahasiswa.nama}</td>
                  <td className="py-4 px-6 text-gray-600">{mahasiswa.prodi}</td>
                  <td className="py-4 px-6 text-gray-600">{mahasiswa.angkatan}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full ${getStatusColor(mahasiswa.status)}`}>
                      {mahasiswa.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{mahasiswa.email}</td>
                  {canEdit && (
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-gray-600">Menampilkan {filteredMahasiswa.length} dari {mockMahasiswa.length} mahasiswa</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <h2 className="text-gray-900 mb-4">Tambah Mahasiswa Baru</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">NIM</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Program Studi</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Teknik Informatika</option>
                    <option>Sistem Informasi</option>
                    <option>Manajemen Informatika</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Angkatan</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
