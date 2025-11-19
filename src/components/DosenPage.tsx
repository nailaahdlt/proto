import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Download, Filter } from 'lucide-react';
import type { User } from '../App';

interface DosenPageProps {
  user: User;
}

interface Dosen {
  id: string;
  nidn: string;
  nama: string;
  prodi: string;
  jabatan: string;
  status: 'Aktif' | 'Cuti';
  email: string;
}

const mockDosen: Dosen[] = [
  { id: '1', nidn: '0412118901', nama: 'Dr. Budi Santoso, M.Kom', prodi: 'Teknik Informatika', jabatan: 'Lektor Kepala', status: 'Aktif', email: 'budi.santoso@ppb.ac.id' },
  { id: '2', nidn: '0415119002', nama: 'Ir. Siti Rahmawati, M.T', prodi: 'Sistem Informasi', jabatan: 'Lektor', status: 'Aktif', email: 'siti.rahma@ppb.ac.id' },
  { id: '3', nidn: '0418118703', nama: 'Ahmad Fauzi, S.Kom, M.Sc', prodi: 'Teknik Informatika', jabatan: 'Asisten Ahli', status: 'Aktif', email: 'ahmad.fauzi@ppb.ac.id' },
  { id: '4', nidn: '0420118804', nama: 'Dr. Dewi Lestari, M.Kom', prodi: 'Manajemen Informatika', jabatan: 'Lektor', status: 'Aktif', email: 'dewi.lestari@ppb.ac.id' },
  { id: '5', nidn: '0422119105', nama: 'Eko Prasetyo, M.Kom', prodi: 'Teknik Komputer', jabatan: 'Asisten Ahli', status: 'Cuti', email: 'eko.prasetyo@ppb.ac.id' },
];

export function DosenPage({ user }: DosenPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const canEdit = user.role === 'admin';

  const filteredDosen = mockDosen.filter(d => {
    const matchSearch = d.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       d.nidn.includes(searchTerm);
    const matchFilter = filterStatus === 'all' || d.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const getStatusColor = (status: string) => {
    return status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Data Dosen</h1>
          <p className="text-gray-600">Kelola data dosen dan tenaga pengajar</p>
        </div>
        {canEdit && (
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            Tambah Dosen
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
                placeholder="Cari berdasarkan nama atau NIDN..."
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
                <th className="text-left py-4 px-6 text-gray-700">NIDN</th>
                <th className="text-left py-4 px-6 text-gray-700">Nama</th>
                <th className="text-left py-4 px-6 text-gray-700">Program Studi</th>
                <th className="text-left py-4 px-6 text-gray-700">Jabatan</th>
                <th className="text-left py-4 px-6 text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-gray-700">Email</th>
                {canEdit && <th className="text-left py-4 px-6 text-gray-700">Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {filteredDosen.map((dosen) => (
                <tr key={dosen.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 text-gray-900">{dosen.nidn}</td>
                  <td className="py-4 px-6 text-gray-900">{dosen.nama}</td>
                  <td className="py-4 px-6 text-gray-600">{dosen.prodi}</td>
                  <td className="py-4 px-6 text-gray-600">{dosen.jabatan}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full ${getStatusColor(dosen.status)}`}>
                      {dosen.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{dosen.email}</td>
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

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-gray-600">Menampilkan {filteredDosen.length} dari {mockDosen.length} dosen</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
