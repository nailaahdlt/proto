import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { DashboardLayout } from './components/DashboardLayout';

export type UserRole = 'admin' | 'mahasiswa' | 'dosen';

export interface User {
  role: UserRole;
  name: string;
  email: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string, role: UserRole) => {
    // Mock login - dalam implementasi nyata, ini akan memanggil API
    const mockUser: User = {
      role,
      name: role === 'admin' ? 'Administrator' : role === 'dosen' ? 'Dr. Budi Santoso' : 'Ahmad Rizki',
      email
    };
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <DashboardLayout user={user} onLogout={handleLogout} />;
}
