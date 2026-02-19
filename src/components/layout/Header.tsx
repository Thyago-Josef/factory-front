import { Package, Database, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'products' | 'materials';
  setActiveTab: (tab: 'dashboard' | 'products' | 'materials') => void;
}

export const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  return (
    <header className="bg-slate-900 text-white py-3 px-4 shadow-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">

        {/* Logo - Centralizado no mobile, esquerda no desktop */}
        <h1 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          <Database size={22} />
          <span className="tracking-tight">FactoryManager</span>
        </h1>

        {/* Navegação - Ajustada para telas pequenas */}
        <nav className="flex items-center gap-4 sm:gap-6" aria-label="Main Navigation">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 transition-colors duration-200 hover:text-cyan-400 ${activeTab === 'dashboard' ? 'text-cyan-400 font-medium' : 'text-slate-300'
              }`}
          >
            <LayoutDashboard size={18} />
            <span className="text-sm sm:text-base">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 transition-colors duration-200 hover:text-cyan-400 ${activeTab === 'products' ? 'text-cyan-400 font-medium' : 'text-slate-300'
              }`}
          >
            <Package size={18} />
            <span className="text-sm sm:text-base">Products</span>
          </button>

          <button
            onClick={() => setActiveTab('materials')}
            className={`flex items-center gap-2 transition-colors duration-200 hover:text-cyan-400 ${activeTab === 'materials' ? 'text-cyan-400 font-medium' : 'text-slate-300'
              }`}
          >
            <Database size={18} />
            <span className="text-sm sm:text-base">Inventory</span>
          </button>
        </nav>
      </div>
    </header>
  );
};