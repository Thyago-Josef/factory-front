import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { productService } from "../services/productService";
import { fetchProducts } from "../features/productSlice";
import { fetchMaterials } from "../features/materialSlice"; // ADICIONE ISSO
import { useFormatter } from "../hooks/useFormatter";
import { X, Factory, Tag, Calculator, Package } from 'lucide-react';

export const ProductionModal = ({ item, onClose }: { item: any, onClose: () => void }) => {
    const { formatCurrency } = useFormatter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const { items: allProducts } = useAppSelector((state) => state.products);
    const { list: allRawMaterials } = useAppSelector((state) => state.materials); // ADICIONE ISSO

    useEffect(() => {
        if (allProducts.length === 0) {
            dispatch(fetchProducts());
        }
        if (allRawMaterials.length === 0) { // ADICIONE ISSO
            dispatch(fetchMaterials());
        }
    }, [dispatch, allProducts.length, allRawMaterials.length]);

    const productDetail = allProducts.find(p => Number(p.id) === Number(item.productId));

    const maxCapacity = item.suggestedQuantity || 0;
    const [quantityToProduce, setQuantityToProduce] = useState(maxCapacity);

    const formatLargeNumber = (num: number) => {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
        if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
        return formatCurrency(num);
    };

    const handleConfirmProduction = async () => {
        setLoading(true);
        try {
            await productService.executeProduction(item.productId, quantityToProduce);
            alert("Ordem de produção enviada com sucesso!");
            onClose();
            window.location.reload();
        } catch (error) {
            alert("Falha ao comunicar com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-300">

                <div className="p-8 pb-4 flex justify-between items-start border-b border-slate-50">
                    <div className="w-full space-y-3">
                        <h2 className="text-3xl font-black text-slate-800 leading-tight truncate">
                            {item.productName}
                        </h2>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100">
                                <span className="text-[10px] font-bold uppercase tracking-wider">Preço Unitário</span>
                                <span className="font-bold text-sm flex items-center gap-1">
                                    <Tag size={12} /> {formatLargeNumber(item.price)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-xl border border-blue-100">
                                <span className="text-[10px] font-bold uppercase tracking-wider">Total da Sugestão</span>
                                <span className="font-bold text-sm flex items-center gap-1">
                                    <Calculator size={12} /> {formatLargeNumber(item.totalValue)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full">
                        <X size={24} className="text-slate-400" />
                    </button>
                </div>

                <div className="p-8 pt-6 space-y-6">
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-inner flex flex-col items-center">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Quantidade a Produzir</label>
                        <input
                            type="number"
                            value={quantityToProduce}
                            onChange={(e) => setQuantityToProduce(Number(e.target.value))}
                            className="bg-transparent text-6xl font-black text-white text-center outline-none w-full"
                        />
                        <div className="mt-6 pt-6 border-t border-slate-800 w-full grid grid-cols-2 gap-4">
                            <div className="text-center border-r border-slate-800">
                                <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Capacidade Sugerida</p>
                                <p className="text-lg font-bold text-slate-300">{maxCapacity} un</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Custo Dinâmico</p>
                                <p className="text-lg font-bold text-emerald-400">
                                    {formatLargeNumber(item.price * (quantityToProduce || 0))}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SEÇÃO CORRIGIDA: Busca o nome do material pelo rawMaterialId */}
                    <div className="space-y-3">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Package size={12} /> Materiais Requeridos (Baixa de Estoque)
                        </h3>
                        <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                            {productDetail?.materials && productDetail.materials.length > 0 ? (
                                productDetail.materials.map((pm, index) => {
                                    // CORREÇÃO: Busca o material pelo rawMaterialId
                                    const material = allRawMaterials.find(m => m.id === pm.rawMaterialId);
                                    const materialName = material?.name || "Insumo não encontrado";
                                    const unitQty = pm.quantityRequired || 0;
                                    const totalNeeded = unitQty * (quantityToProduce || 0);

                                    return (
                                        <div key={index} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-semibold text-slate-600 uppercase">
                                                    {materialName}
                                                </span>
                                                <span className="text-[9px] text-slate-400 italic">Necessário: {unitQty} p/ un</span>
                                            </div>
                                            <span className="text-xs font-black text-slate-900">
                                                {totalNeeded.toLocaleString()} un
                                            </span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-4 bg-slate-50 rounded-xl border-dashed border-2 border-slate-100">
                                    <p className="text-[10px] text-slate-400 italic">Dados de composição não encontrados para este produto.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleConfirmProduction}
                        disabled={loading || quantityToProduce > maxCapacity || quantityToProduce <= 0}
                        className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition ${quantityToProduce > maxCapacity
                            ? 'bg-red-500/20 text-red-500 cursor-not-allowed border border-red-200'
                            : 'bg-[#111827] text-white hover:bg-black active:scale-95 shadow-xl'
                            }`}
                    >
                        {loading ? 'Processando...' : (
                            <>
                                <Factory size={20} />
                                {quantityToProduce > maxCapacity ? `Limite: ${maxCapacity} un` : 'Confirmar Ordem'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};