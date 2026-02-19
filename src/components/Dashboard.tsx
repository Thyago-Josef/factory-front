// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../app/hooks';
// import { fetchProductionSuggestions } from '../features/productSlice';
// import { Wallet, PackageCheck, AlertCircle } from 'lucide-react';

// export const Dashboard = () => {
//     const dispatch = useAppDispatch();
//     const { suggestions, totalProductionValue, loading, error } = useAppSelector((state) => state.products);

//     useEffect(() => {
//         dispatch(fetchProductionSuggestions());
//     }, [dispatch]);

//     if (loading) return <div className="p-8 text-center font-medium">Calculating potential...</div>;

//     return (
//         // Ajustado: p-4 no mobile, p-0 no md (porque o main do App já dá o p-6)
//         // <div className="p-4 md:p-0 space-y-6 bg-slate-50 md:bg-transparent min-h-screen w-full">
//         <div className="p-4 md:p-0 space-y-6 w-full">

//             {/* Header: w-full e min-w-0 são essenciais */}
//             <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full min-w-0">
//                 <div className="min-w-0 flex-1">
//                     <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">
//                         Total Production Potential
//                     </p>
//                     {/* break-all evita que o R$ 1.000.000,00 quebre o layout */}
//                     <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-1 break-all leading-tight">
//                         R$ {totalProductionValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
//                     </h1>
//                 </div>
//                 <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
//                     <Wallet size={28} />
//                 </div>
//             </div>

//             {/* Grid: Garantir que as colunas caibam */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//                 {suggestions.map((item, index) => (
//                     <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition min-w-0 overflow-hidden">
//                         <div className="flex justify-between items-start">
//                             <span className="text-slate-400 shrink-0"><PackageCheck /></span>
//                             <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded truncate ml-2">
//                                 Qty: {item.suggestedQuantity || 0}
//                             </span>
//                         </div>
//                         <h3 className="text-lg font-bold text-slate-800 mt-3 truncate">{item.productName || 'Produto...'}</h3>
//                         <p className="text-slate-500 text-sm mt-1 truncate">
//                             Subtotal: <span className="font-bold text-slate-800">R$ {(item.totalValue || 0).toLocaleString('pt-BR')}</span>
//                         </p>
//                     </div>
//                 ))}
//             </div>

//             {error && (
//                 <div className="bg-red-50 text-red-600 p-4 rounded-lg flex gap-2 items-center">
//                     <AlertCircle size={20} />
//                     <span>{error}</span>
//                 </div>
//             )}
//         </div>
//     );
// };