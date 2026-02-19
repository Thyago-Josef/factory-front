import { useState } from 'react';
import { Header } from './components/layout/Header';
import { ProductForm } from './components/ProductForm';
import { DashboardPage } from './pages/DashboardPage';
import { MaterialList } from './components/MaterialList';
import { MaterialsPage } from './pages/MaterialsPage';
import { ProductsPage } from './pages/ProductsPage';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'materials'>('dashboard');

  return (

    <div className="min-h-screen bg-slate-100 flex flex-col overflow-x-hidden">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 w-full max-w-6xl mx-auto md:p-6 transition-all duration-300 overflow-x-hidden">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeTab === 'dashboard' && <DashboardPage />}
          {/* {activeTab === 'products' && <div className="p-4"><ProductForm /></div>} */}
          {activeTab === 'products' && <ProductsPage />}
          {/* {activeTab === 'materials' && <div className="p-4"><MaterialList /></div>} */}
          {activeTab === 'materials' && <MaterialsPage />}
        </div>
      </main>


      <footer className="py-6 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} FactoryManager - Production Optimization System
      </footer>
    </div>
  );
}

export default App;