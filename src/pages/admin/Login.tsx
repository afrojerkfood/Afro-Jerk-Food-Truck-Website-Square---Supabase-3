import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ADMIN_PASSWORD = 'Liberia761010$$';

export default function Login() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      // Store auth state
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      navigate(from, { replace: true });
    } else {
      toast.error('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img 
            src="https://cnkalkntbjisvbpjtojk.supabase.co/storage/v1/object/public/media//afro%20jerk%20logo@0.5x.png"
            alt="Afro Jerk Logo"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-600 mt-2">Enter your password to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#eb1924] focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#eb1924] text-white px-6 py-3 rounded-lg hover:bg-[#eb1924]/90 transition-colors"
          >
            <Lock className="w-5 h-5" />
            Login
          </button>
        </form>
      </div>
    </div>
  );
}