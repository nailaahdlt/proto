import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  FileText, 
  Settings, 
  BarChart3,
  LogOut,
  Menu,
  X,
  Bell,
  User
} from 'lucide-react';
import type { User } from '../App';
import { DashboardHome } from './DashboardHome';
import { MahasiswaPage } from './MahasiswaPage';
import { DosenPage } from './DosenPage';
import { MataKuliahPage } from './MataKuliahPage';
import { JadwalPage } from './JadwalPage';
import { LayananAkademikPage } from './LayananAkademikPage';
import { PengaturanPage } from './PengaturanPage';
import { LaporanPage } from './LaporanPage';
import logoEduSys from 'figma:asset/b9b09e3898d01e94f9ee7b85f156bf9d1964f528.png';

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
}

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  roles: string[];
};

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, roles: ['admin', 'mahasiswa', 'dosen'] },
  { id: 'mahasiswa', label: 'Mahasiswa', icon: <Users className="w-5 h-5" />, roles: ['admin', 'dosen'] },
  { id: 'dosen', label: 'Dosen', icon: <GraduationCap className="w-5 h-5" />, roles: ['admin'] },
  { id: 'matakuliah', label: 'Mata Kuliah', icon: <BookOpen className="w-5 h-5" />, roles: ['admin', 'mahasiswa', 'dosen'] },
  { id: 'jadwal', label: 'Jadwal', icon: <Calendar className="w-5 h-5" />, roles: ['admin', 'mahasiswa', 'dosen'] },
  { id: 'layanan', label: 'Layanan Akademik', icon: <FileText className="w-5 h-5" />, roles: ['admin', 'mahasiswa', 'dosen'] },
  { id: 'laporan', label: 'Laporan', icon: <BarChart3 className="w-5 h-5" />, roles: ['admin', 'dosen'] },
  { id: 'pengaturan', label: 'Pengaturan', icon: <Settings className="w-5 h-5" />, roles: ['admin', 'mahasiswa', 'dosen'] },
];

export function DashboardLayout({ user, onLogout }: DashboardLayoutProps) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(user.role));

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardHome user={user} />;
      case 'mahasiswa':
        return <MahasiswaPage user={user} />;
      case 'dosen':
        return <DosenPage user={user} />;
      case 'matakuliah':
        return <MataKuliahPage user={user} />;
      case 'jadwal':
        return <JadwalPage user={user} />;
      case 'layanan':
        return <LayananAkademikPage user={user} />;
      case 'laporan':
        return <LaporanPage user={user} />;
      case 'pengaturan':
        return <PengaturanPage user={user} />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 lg:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-3">
              <img src={logoEduSys} alt="EduSys" className="w-10 h-10" />
              <div>
                <h1 className="text-gray-900">EduSys</h1>
                <p className="text-gray-600">Politeknik Praktisi Bandung</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
              <div className="hidden md:block">
                <p className="text-gray-900">{user.name}</p>
                <p className="text-gray-600 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Right Side */}
        <aside className={`
          fixed lg:sticky top-0 right-0 h-screen bg-white border-l border-gray-200 
          w-64 lg:w-72 z-30 transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          order-2
        `}>
          <div className="p-6 h-full flex flex-col">
            <nav className="flex-1 space-y-2">
              {filteredMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${activeMenu === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 order-1">
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
        />
      )}
    </div>
  );
}
