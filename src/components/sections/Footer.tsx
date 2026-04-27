import { usePortfolio } from '../../context/PortfolioContext';

export default function Footer() {
  const { login, isEditing, logout } = usePortfolio();

  const handleAdminClick = async () => {
    if (isEditing) {
      await logout();
    } else {
      const success = await login();
      if (!success) {
        alert('Authentication failed.');
      }
    }
  };

  return (
    <footer className="w-full py-12 bg-[#0B0B0B] border-t border-white/5 mt-auto relative z-20">
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
