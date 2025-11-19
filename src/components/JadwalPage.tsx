import { useState } from 'react';
import { Calendar, Clock, MapPin, Filter } from 'lucide-react';
import type { User } from '../App';

interface JadwalPageProps {
  user: User;
}

interface Jadwal {
  id: string;
  hari: string;
  waktu: string;
  matakuliah: string;
  dosen: string;
  ruangan: string;
  kelas: string;
}

const mockJadwal: Jadwal[] = [
  { id: '1', hari: 'Senin', waktu: '08:00 - 10:30', matakuliah: 'Algoritma & Pemrograman', dosen: 'Dr. Budi Santoso', ruangan: 'R.301', kelas: 'TI-1A' },
  { id: '2', hari: 'Senin', waktu: '13:00 - 15:30', matakuliah: 'Basis Data', dosen: 'Ahmad Fauzi, M.Sc', ruangan: 'Lab.Komputer 1', kelas: 'TI-2A' },
  { id: '3', hari: 'Selasa', waktu: '08:00 - 10:30', matakuliah: 'Sistem Informasi Manajemen', dosen: 'Ir. Siti Rahmawati', ruangan: 'R.205', kelas: 'SI-1A' },
  { id: '4', hari: 'Selasa', waktu: '13:00 - 15:30', matakuliah: 'Pemrograman Web', dosen: 'Ahmad Fauzi, M.Sc', ruangan: 'Lab.Komputer 2', kelas: 'TI-3A' },
  { id: '5', hari: 'Rabu', waktu: '08:00 - 10:30', matakuliah: 'Jaringan Komputer', dosen: 'Dr. Dewi Lestari', ruangan: 'Lab.Jaringan', kelas: 'MI-2A' },
  { id: '6', hari: 'Rabu', waktu: '13:00 - 15:30', matakuliah: 'Kecerdasan Buatan', dosen: 'Dr. Budi Santoso', ruangan: 'R.401', kelas: 'TI-5A' },
  { id: '7', hari: 'Kamis', waktu: '08:00 - 10:30', matakuliah: 'Algoritma & Pemrograman', dosen: 'Dr. Budi Santoso', ruangan: 'Lab.Komputer 1', kelas: 'TI-1B' },
  { id: '8', hari: 'Jumat', waktu: '08:00 - 10:30', matakuliah: 'Basis Data', dosen: 'Ahmad Fauzi, M.Sc', ruangan: 'Lab.Komputer 2', kelas: 'TI-2B' },
];

const hari = ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

export function JadwalPage({ user }: JadwalPageProps) {
  const [filterHari, setFilterHari] = useState('Semua');

  const filteredJadwal = filterHari === 'Semua' 
    ? mockJadwal 
    : mockJadwal.filter(j => j.hari === filterHari);

  const groupedJadwal = hari.slice(1).reduce((acc, h) => {
    acc[h] = filteredJadwal.filter(j => j.hari === h);
    return acc;
  }, {} as Record<string, Jadwal[]>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Jadwal Kuliah</h1>
        <p className="text-gray-600">Jadwal perkuliahan semester berjalan</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">Filter Hari:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {hari.map((h) => (
            <button
              key={h}
              onClick={() => setFilterHari(h)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterHari === h
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      {filterHari === 'Semua' ? (
        <div className="space-y-6">
          {Object.entries(groupedJadwal).map(([hari, jadwals]) => (
            jadwals.length > 0 && (
              <div key={hari} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {hari}
                </h2>
                <div className="space-y-3">
                  {jadwals.map((jadwal) => (
                    <div key={jadwal.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-900">{jadwal.waktu}</span>
                        </div>
                        <div>
                          <p className="text-gray-900">{jadwal.matakuliah}</p>
                          <p className="text-gray-600">{jadwal.kelas}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">{jadwal.dosen}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-orange-600" />
                          <span className="text-gray-900">{jadwal.ruangan}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {filterHari}
          </h2>
          {filteredJadwal.length > 0 ? (
            <div className="space-y-3">
              {filteredJadwal.map((jadwal) => (
                <div key={jadwal.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-900">{jadwal.waktu}</span>
                    </div>
                    <div>
                      <p className="text-gray-900">{jadwal.matakuliah}</p>
                      <p className="text-gray-600">{jadwal.kelas}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{jadwal.dosen}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <span className="text-gray-900">{jadwal.ruangan}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Tidak ada jadwal pada hari ini</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
