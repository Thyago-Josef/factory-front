import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteMaterial, fetchMaterials, updateMaterial } from '../features/materialSlice';
import { RefreshCcw, AlertTriangle, CheckCircle2, Pencil, Trash2 } from 'lucide-react';
import type { RawMaterial } from '../types';

export const MaterialList = () => {
    const dispatch = useAppDispatch();
    const { list: materials, loading, error } = useAppSelector((state) => state.materials);

    useEffect(() => {
        dispatch(fetchMaterials());
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(fetchMaterials());
    };

    const { list: allMaterials } = useAppSelector((state) => state.materials);

    const handleEdit = (material: RawMaterial) => {
        if (material.id === undefined) return;

        //const { list: allMaterials } = useAppSelector((state) => state.materials);

        const newName = window.prompt("Edit Name:", material.name);
        const newCode = window.prompt("Edit Code:", material.code);
        const newStock = window.prompt("Edit Stock:", material.stockQuantity.toString());

        if (newName !== null && newCode !== null && newStock !== null) {

            // 1. Validar se o NOME já existe em OUTRO material
            const nameExists = allMaterials.some(
                m => m.name.toLowerCase() === newName.toLowerCase() && m.id !== material.id
            );

            // 2. Validar se o CÓDIGO já existe em OUTRO material
            const codeExists = allMaterials.some(
                m => m.code.toLowerCase() === newCode.toLowerCase() && m.id !== material.id
            );

            if (nameExists) {
                alert("Erro: Já existe um material com este nome.");
                return;
            }

            if (codeExists) {
                alert("Erro: Já existe um material com este código.");
                return;
            }

            // Se passar nas validações, dispara o update
            dispatch(updateMaterial({
                id: material.id,
                data: {
                    ...material,
                    name: newName,
                    code: newCode,
                    stockQuantity: Number(newStock)
                }
            }));
        }
    };

    const handleDelete = async (id: number | undefined) => {
        if (id === undefined) return;

        if (window.confirm('Are you sure you want to delete this raw material? This action cannot be undone.')) {
            try {

                await dispatch(deleteMaterial(id)).unwrap();

            } catch (error) {
                alert('Could not delete material. It might be linked to an existing product recipe.');
            }
        }
    };
    return (
        /* AJUSTE 1: Adicionado w-full e max-w-full para garantir que o card não cresça além do container pai */
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden w-full max-w-full">

            {/* Header do Card - Ajustado padding para mobile (p-4 vs p-6) */}
            <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="min-w-0"> {/* min-w-0 evita que o texto empurre a largura */}
                    <h2 className="text-xl font-bold text-slate-800 truncate">Inventory</h2>
                    <p className="text-sm text-slate-500 truncate">Manage stock levels</p>
                </div>
                <button
                    onClick={handleRefresh}
                    className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg transition shrink-0"
                    title="Refresh data"
                >
                    <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            {/* 1. VISUALIZAÇÃO EM TABELA (Apenas Desktop) */}
            {/* AJUSTE 2: Garantir que a div da tabela não tenha NENHUMA largura mínima (min-w) no mobile */}
            <div className="hidden md:block">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold">
                            <th className="px-6 py-4">Code</th>
                            <th className="px-6 py-4">Material Name</th>
                            <th className="px-6 py-4 text-center">Stock Quantity</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {materials.map((material) => (
                            <tr key={material.id} className="hover:bg-slate-50 transition">
                                {/* <td className="px-6 py-4 text-slate-400 font-mono text-sm">#{material.id}</td> */}
                                <td className="px-6 py-4 font-mono text-xs text-slate-500">
                                    {material.code}
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-800">{material.name}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="font-semibold text-slate-700">{material.stockQuantity}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {material.stockQuantity <= 5 ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                            <AlertTriangle size={12} /> Low Stock
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                            <CheckCircle2 size={12} /> Optimal
                                        </span>
                                    )}
                                </td>

                                {/* --- ADICIONE ESTE BLOCO ABAIXO PARA O CRUD --- */}
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(material)} // Adicione esta linha
                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(material.id)}
                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 size={16} /> {/* Certifique-se de importar o Trash2 do lucide-react */}
                                    </button>
                                </td>
                                {/* ---------------------------------------------- */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 2. VISUALIZAÇÃO EM CARDS (Mobile) */}
            {/* AJUSTE 3: w-full e min-w-0 para garantir que os cards se moldem à largura da tela */}
            <div className="md:hidden divide-y divide-slate-100 w-full min-w-0">
                {materials.map((material) => (
                    <div key={material.id} className="p-4 flex flex-col gap-3 hover:bg-slate-50 transition w-full">
                        <div className="flex justify-between items-start w-full">
                            <span className="text-xs font-mono text-slate-400">#{material.id}</span>
                            {material.stockQuantity <= 5 ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 shadow-sm shrink-0">
                                    <AlertTriangle size={10} /> Low
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 shadow-sm shrink-0">
                                    <CheckCircle2 size={10} /> Optimal
                                </span>
                            )}
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-slate-800 text-base break-words">{material.name}</h3>
                            <p className="text-sm text-slate-500 mt-0.5">
                                Current Stock: <span className="font-semibold text-slate-700">{material.stockQuantity}</span>
                            </p>
                        </div>
                        {/* --- ADICIONE ESTE BLOCO DE BOTÕES ABAIXO --- */}
                        <div className="flex gap-2 mt-2 pt-3 border-t border-slate-50">
                            <button
                                onClick={() => handleEdit(material)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(material.id)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition"
                            >
                                Delete
                            </button>
                        </div>
                        {/* ------------------------------------------- */}
                    </div>
                ))}
            </div>

            {/* Mensagem de Vazio */}
            {materials.length === 0 && !loading && (
                <div className="p-12 text-center text-slate-400">
                    No materials found.
                </div>
            )}

            {/* Alerta de Erro */}
            {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm border-t border-red-100">
                    Error: {error}
                </div>
            )}
        </div>
    );
};