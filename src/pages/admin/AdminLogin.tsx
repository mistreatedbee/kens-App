import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Store, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { toast } from 'sonner';
export function AdminLogin() {
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { settings } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success('Logged in successfully');
      navigate(from, {
        replace: true
      });
    } else {
      toast.error('Invalid password');
    }
  };
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-muted hover:text-fg transition-colors">
        
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-surface border border-black/10 dark:border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent shadow-xl">
            <Store className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif text-fg mb-2">
            {settings.storeName}
          </h1>
          <p className="text-muted">Admin Portal Login</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 rounded-3xl space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm text-muted">Admin Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (admin123)"
                className="w-full pl-12 pr-4 py-3 bg-background border border-black/10 dark:border-white/10 rounded-xl text-fg focus:outline-none focus:border-accent transition-colors"
                required />
              
            </div>
            <p className="text-xs text-muted mt-2">
              Demo password: admin123
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-accent text-black font-semibold rounded-xl hover:bg-white transition-colors">
            
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>);

}