import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Store, Lock, ArrowLeft, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { toast } from 'sonner';
export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { settings } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (await login(email, password)) {
      toast.success('Logged in successfully');
      navigate(from, {
        replace: true
      });
    } else {
      toast.error('Invalid email or password');
    }
    setIsSubmitting(false);
  };
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-muted hover:text-primary transition-colors">
        
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-lightblue/20 border border-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary shadow-xl shadow-secondary/10">
            <Store className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-fg mb-2">
            {settings.storeName}
          </h1>
          <p className="text-muted">Business Admin Login</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 rounded-3xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-muted">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-12 pr-4 py-3 bg-background border border-primary/15 rounded-xl text-fg focus:outline-none focus:border-secondary transition-colors"
                required />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-muted">Admin Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-12 pr-4 py-3 bg-background border border-primary/15 rounded-xl text-fg focus:outline-none focus:border-secondary transition-colors"
                required />
              
            </div>
            <p className="text-xs text-muted mt-2">
              Use the admin email and password configured on the backend.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-accent transition-colors disabled:opacity-70">
            
            {isSubmitting ? 'Signing in...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>);

}
