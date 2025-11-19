import { useState } from 'react';
import { FileText, Send, Clock, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react';
import type { User } from '../App';

interface LayananAkademikPageProps {
  user: User;
}

interface Permohonan {
  id: string;
  jenis: string;
  tanggal: string;
  status: 'Pending' | 'Diproses' | 'Disetujui' | 'Ditolak';
  keterangan: string;
}

const mockPermohonan: Permohonan[] = [
  { id: '1', jenis: 'Surat Keterangan Mahasiswa Aktif', tanggal: '18/11/2025', status: 'Disetujui', keterangan: 'Untuk keperluan beasiswa' },
  { id: '2', jenis: 'Revisi Data Mahasiswa', tanggal: '17/11/2025', status: 'Diproses', keterangan: 'Perubahan alamat' },
  { id: '3', jenis: 'Surat Pengantar PKL', tanggal: '15/11/2025', status: 'Pending', keterangan: 'PKL di PT. Teknologi Nusantara' },
  { id: '4', jenis: 'Surat Keterangan Lulus', tanggal: '10/11/2025', status: 'Ditolak', keterangan: 'Dokumen tidak lengkap' },
];

const jenisSurat = [
  'Surat Keterangan Mahasiswa Aktif',
  'Surat Pengantar PKL',
  'Surat Keterangan Lulus',
  'Surat Rekomendasi',
  'Revisi Data Mahasiswa',
  'Pengajuan Cuti Akademik',
];

export function LayananAkademikPage({ user }: LayananAkademikPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedJenis, setSelectedJenis] = useState('');
  const [keterangan, setKeterangan] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Diproses': return <AlertCircle className="w-5 h-5 text-blue-600" />;
      case 'Disetujui': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Ditolak': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Diproses': return 'bg-blue-100 text-blue-700';
      case 'Disetujui': return 'bg-green-100 text-green-700';
      case 'Ditolak': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setShowForm(false);
    setSelectedJenis('');
    setKeterangan('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Layanan Akademik</h1>
          <p className="text-gray-600">Pengajuan surat dan layanan akademik digital</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajukan Permohonan
        </button>
      </div>

      {/* Available Services */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-gray-900 mb-4">Layanan yang Tersedia</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jenisSurat.map((jenis, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedJenis(jenis);
                setShowForm(true);
              }}
              className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all text-left"
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{jenis}</p>
                <p className="text-gray-500">Klik untuk mengajukan</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tracking Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-gray-900 mb-4">Riwayat & Tracking Status Permohonan</h2>
        <div className="space-y-4">
          {mockPermohonan.map((permohonan) => (
            <div key={permohonan.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  {getStatusIcon(permohonan.status)}
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{permohonan.jenis}</h3>
                    <p className="text-gray-600 mb-2">{permohonan.keterangan}</p>
                    <p className="text-gray-500">Diajukan: {permohonan.tanggal}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full ${getStatusColor(permohonan.status)}`}>
                  {permohonan.status}
                </span>
              </div>

              {/* Progress Timeline */}
              {permohonan.status !== 'Ditolak' && (
                <div className="ml-8 mt-4 border-l-2 border-gray-200 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Permohonan diterima</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${permohonan.status !== 'Pending' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={permohonan.status !== 'Pending' ? 'text-gray-600' : 'text-gray-400'}>
                      Sedang diproses
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${permohonan.status === 'Disetujui' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={permohonan.status === 'Disetujui' ? 'text-gray-600' : 'text-gray-400'}>
                      Selesai - Siap diambil
                    </span>
                  </div>
                </div>
              )}

              {permohonan.status === 'Disetujui' && (
                <div className="mt-4 flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Send className="w-4 h-4" />
                    Download Surat
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-gray-900 mb-4">Ajukan Permohonan Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Jenis Permohonan</label>
                <select
                  value={selectedJenis}
                  onChange={(e) => setSelectedJenis(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih jenis permohonan</option>
                  {jenisSurat.map((jenis, idx) => (
                    <option key={idx} value={jenis}>{jenis}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Keperluan / Keterangan</label>
                <textarea
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  required
                  rows={4}
                  placeholder="Jelaskan keperluan permohonan Anda..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Dokumen Pendukung (Opsional)</label>
                <input
                  type="file"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-gray-500 mt-1">Format: PDF, JPG, PNG (Max 5MB)</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900">
                  <strong>Catatan:</strong> Permohonan akan diproses dalam 2-3 hari kerja. 
                  Anda dapat melacak status permohonan secara real-time di halaman ini.
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Ajukan Permohonan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
