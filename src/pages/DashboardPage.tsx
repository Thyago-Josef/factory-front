import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProductionSuggestions } from '../features/productSlice';
import { useFormatter } from '../hooks/useFormatter';
import { Wallet, PackageCheck, AlertCircle } from 'lucide-react';
// 1. IMPORTE O SEU COMPONENTE MODAL AQUI
import { ProductionModal } from '../components/ProductionModal';

export const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const { formatCurrency } = useFormatter();
    const { suggestions, totalProductionValue, loading, error } = useAppSelector((state) => state.products);

    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    useEffect(() => {
        dispatch(fetchProductionSuggestions());
    }, [dispatch]);

    if (loading) return <div className="p-8 text-center font-medium text-slate-600 animate-pulse">Calculating potential...</div>;

    return (
        <div className="relative space-y-6 w-full animate-in fade-in duration-500">
            {/* Header: Total Potential */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                <div className="min-w-0 flex-1">
                    <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">Total Production Potential</p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-1 break-all leading-tight">
                        {formatCurrency(totalProductionValue)}
                    </h1>
                </div>
                <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 shrink-0 shadow-inner">
                    <Wallet size={32} />
                </div>
            </div>

            {/* Grid de Sugestões */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {suggestions.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedItem(item)}
                        className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50/50 transition-all duration-300 group cursor-pointer"
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-slate-400 group-hover:text-emerald-500 transition-colors">
                                <PackageCheck size={24} />
                            </span>
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                                Qty: {item.suggestedQuantity || 0}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mt-4 truncate">{item.productName || 'Unnamed Product'}</h3>
                        <p className="text-slate-500 text-sm mt-1 font-mono text-[10px]">{item.productCode}</p>
                        <p className="text-slate-500 text-sm mt-1">
                            Price: <span className="font-semibold text-slate-900">{formatCurrency(item.price || 0)}</span>
                        </p>
                    </div>
                ))}
            </div>

            {/* 2. AQUI ESTÁ A MUDANÇA: Chamamos o componente externo */}
            {selectedItem && (
                <ProductionModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 flex gap-3 items-center">
                    <AlertCircle size={20} />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}
        </div>
    );
};