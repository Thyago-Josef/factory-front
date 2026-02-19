import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createProduct, fetchProductionSuggestions, fetchProducts } from '../features/productSlice';
import { fetchMaterials } from '../features/materialSlice';
import { Plus, Trash2, Save, PackagePlus } from 'lucide-react';


interface ProductItem {
    name: string;
    [key: string]: any;
}

export const ProductForm = () => {
    const dispatch = useAppDispatch();
    const { list: materials } = useAppSelector((state) => state.materials);

    const { items: products } = useAppSelector((state) => state.products);

    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [recipe, setRecipe] = useState([{ rawMaterialId: 0, quantityRequired: 0 }]);

    useEffect(() => {
        dispatch(fetchMaterials());
    }, [dispatch]);

    const addIngredient = () => {
        setRecipe([...recipe, { rawMaterialId: 0, quantityRequired: 0 }]);
    };

    const removeIngredient = (index: number) => {
        setRecipe(recipe.filter((_, i) => i !== index));
    };

    const updateIngredient = (index: number, field: 'rawMaterialId' | 'quantityRequired', value: number) => {
        const newRecipe = [...recipe];
        newRecipe[index][field] = value;
        setRecipe(newRecipe);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 2. VALIDAÇÃO DE DUPLICIDADE: Compara nomes ignorando maiúsculas/minúsculas
        const nameExists = products.some(
            (p: ProductItem) => p.name.trim().toLowerCase() === name.trim().toLowerCase()
        );




        if (nameExists) {
            alert(`O produto "${name}" já está cadastrado! Escolha um nome exclusivo.`);
            return;
        }

        const validRecipe = recipe.filter(r => r.rawMaterialId > 0 && r.quantityRequired > 0);

        if (validRecipe.length === 0) {
            alert("Adicione pelo menos um material à receita!");
            return;
        }

        const newProduct = {
            name,
            code: "PROD-" + Date.now(),
            price: Number(price),
            materials: validRecipe.map(item => ({
                rawMaterialId: Number(item.rawMaterialId),
                quantityRequired: Number(item.quantityRequired)
            }))
        };

        try {
            await dispatch(createProduct(newProduct as any)).unwrap();
            alert("Produto criado com sucesso!");
            setName('');
            setPrice('');
            setRecipe([{ rawMaterialId: 0, quantityRequired: 0 }]);
            dispatch(fetchProducts());
            dispatch(fetchProductionSuggestions());
        } catch (err) {
            console.error("Erro detalhado:", err);
            alert("Erro ao criar produto.");
        }
    };

    return (
        /* AJUSTE: w-full e max-w-3xl para centralizar no desktop e ocupar tudo no mobile */
        <div className="w-full max-w-3xl mx-auto px-2 sm:px-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                {/* Header Otimizado */}
                <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="bg-cyan-600 p-3 rounded-xl text-white shadow-lg shadow-cyan-100 shrink-0">
                            <PackagePlus size={24} />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-xl font-bold text-slate-800 truncate">Novo Produto</h2>
                            <p className="text-sm text-slate-500 truncate">Registe os produtos e a sua composição</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                    {/* Grid de Inputs: 1 col no mobile, 2 no desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Nome do Produto</label>
                            <input
                                type="text" value={name} onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition bg-slate-50/30"
                                placeholder="Ex: Armário de Madeira" required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Preço de Venda (R$)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">R$</span>
                                <input
                                    type="number" value={price} onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition bg-slate-50/30"
                                    placeholder="0.00" step="0.01" required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Seção de Receita Otimizada para Mobile */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Receita / Composição</h3>

                        <div className="space-y-3">
                            {recipe.map((ingredient, index) => (
                                /* AJUSTE: flex-col no mobile, flex-row no desktop */
                                <div key={index} className="flex flex-col sm:flex-row gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all">
                                    <div className="flex-1 min-w-0">
                                        <select
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-cyan-500 transition"
                                            value={ingredient.rawMaterialId}
                                            onChange={(e) => updateIngredient(index, 'rawMaterialId', Number(e.target.value))}
                                        >
                                            <option value="0">Selecionar Material...</option>
                                            {materials.map(m => (
                                                <option key={m.id} value={m.id}>{m.name} (Estoque: {m.stockQuantity})</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Grupo Quantidade + Lixeira: Sempre lado a lado */}
                                    <div className="flex gap-2">
                                        <input
                                            type="number" placeholder="Qtd"
                                            min="0"
                                            step="1"
                                            className="flex-1 sm:w-28 px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                                            value={ingredient.quantityRequired}
                                            onFocus={(e) => e.target.select()}
                                            //onChange={(e) => updateIngredient(index, 'quantityRequired', Number(e.target.value))}
                                            onChange={(e) => {
                                                const val = Math.max(0, Number(e.target.value));
                                                // Só atualiza se o valor for 0 ou maior
                                                if (val >= 0) {
                                                    updateIngredient(index, 'quantityRequired', val);
                                                }
                                            }}


                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeIngredient(index)}
                                            className="p-2.5 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition shrink-0"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={addIngredient}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-cyan-600 font-bold text-sm hover:bg-cyan-50 px-4 py-2 rounded-xl transition"
                        >
                            <Plus size={18} /> Adicionar Material
                        </button>
                    </div>

                    {/* Botão de Ação Principal */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
                        >
                            <Save size={20} /> Guardar Produto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};