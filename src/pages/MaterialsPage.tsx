import { MaterialList } from '../components/MaterialList';
import { MaterialForm } from '../components/MaterialForm';
import { ProductForm } from '../components/ProductForm'; // Se você quiser um form de material aqui
import { Package } from 'lucide-react';

export const MaterialsPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in">
            <h1 className="text-2xl font-black text-slate-800">Materials Management</h1>

            {/* SEÇÃO DE CADASTRO (AQUI ESTÁ O "C" DO CRUD) */}
            <section className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300">
                <h2 className="text-sm font-bold text-slate-500 uppercase mb-4 ml-2">Register New Material</h2>
                <MaterialForm />
            </section>

            {/* SEÇÃO DE LISTAGEM (O "R" E "D" QUE JÁ FUNCIONAM) */}
            <section>
                <h2 className="text-sm font-bold text-slate-500 uppercase mb-4 ml-2">Current Inventory</h2>
                <MaterialList />
            </section>
        </div>
    );
};