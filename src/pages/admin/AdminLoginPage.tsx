import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, settings } = useApp();
  const navigate = useNavigate();

  const [username, setUsername] = useState('ankit');
  const [password, setPassword] = useState('ankit@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginAdmin(username.trim(), password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('Administrative login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#29252A] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 sm:p-10 shadow-2xl border-2 border-[#D6B36A] space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#701F3D] to-[#8A264B] flex items-center justify-center text-[#D6B36A] mx-auto border-2 border-[#D6B36A] shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#701F3D]">
            Admin Executive Portal
          </h1>
          <p className="text-xs text-gray-500">
            Secure administrative console for business owner <strong>{settings.ownerName}</strong>
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Info Box */}
        <div className="bg-[#FFFCFA] p-3.5 rounded-xl border border-[#D6B36A]/50 text-xs text-gray-700 space-y-1">
          <p className="font-bold text-[#701F3D] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
            <span>Owner Login Credentials:</span>
          </p>
          <p>
            Username: <code className="font-mono text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded font-bold">ankit</code>
          </p>
          <p>
            Password: <code className="font-mono text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded font-bold">ankit@123</code>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Admin Username / Email
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#701F3D] focus:outline-hidden"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#701F3D] hover:bg-[#52132A] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In as Admin'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <Link to="/" className="text-xs text-[#701F3D] hover:underline">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};
