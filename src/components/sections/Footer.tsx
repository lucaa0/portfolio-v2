import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Footer() {
  const { login, isEditing, logout } = usePortfolio();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminClick = async () => {
    if (isEditing) {
      await logout();
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(password);
    if (!result.success) {
      setError(result.error);
    } else {
      setShowLoginModal(false);
      setPassword('');
      setError('');
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setPassword('');
    setError('');
  };

  return (
    <footer className="w-full py-12 bg-[#0B0B0B] border-t border-white/5 mt-auto relative z-20">
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card rounded-xl p-8 w-full max-w-sm relative">
            <button 
              onClick={closeLoginModal}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-h3 text-h3 text-on-surface mb-6 text-center">Admin Access</h3>
            <form onSubmit={handleLoginSubmit} className="space-y-4 flex flex-col">
              <div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoFocus
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container/50 transition-all font-body-md placeholder-outline outline-none"
                />
                {error && <p className="text-error text-sm mt-2">{error}</p>}
              </div>
              <button 
                type="submit"
                className="w-full bg-primary-container text-on-primary-container font-label-caps px-6 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(0,163,255,0.3)] transition-all uppercase tracking-widest mt-2"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-container-max mx-auto gap-6 font-label-caps uppercase tracking-widest text-outline">
        <div className="flex items-center gap-4">
          <span>© 2024 Luca Enea. Built with Precision.</span>
          <button 
            onClick={handleAdminClick} 
            className={`hover:text-primary-container transition-colors ease-in-out duration-200 ${isEditing ? 'text-primary' : ''}`}
            title="Admin Login"
          >
            <span className="material-symbols-outlined text-[16px]">{isEditing ? 'lock_open' : 'lock'}</span>
          </button>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-primary-container transition-colors ease-in-out duration-200">GitHub</a>
          <a href="#" className="hover:text-primary-container transition-colors ease-in-out duration-200">LinkedIn</a>
          <a href="#" className="hover:text-primary-container transition-colors ease-in-out duration-200">Source Code</a>
        </div>
      </div>
      {isEditing && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container px-6 py-3 rounded-full font-label-caps uppercase tracking-widest shadow-[0_0_20px_rgba(0,163,255,0.4)] z-50 animate-pulse">
          Edit Mode Active
        </div>
      )}
    </footer>
  );
}
