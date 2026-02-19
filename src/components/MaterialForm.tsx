import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks'; // Adicionado useAppSelector
import { createMaterial } from '../features/materialSlice';
import { PlusCircle, AlertCircle } from 'lucide-react'; // Adicionado AlertCircle para feedback visual

export const MaterialForm = () => {
    const dispatch = useAppDispatch();

    // 1. Pegamos a lista atual de materiais para validar a unicidade
    const { list: materials } = useAppSelector((state) => state.materials);

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [stock, setStock] = useState(0);
    const [error, setError] = useState<string | null>(null); // Estado para mensagem de erro amigável

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reseta o erro ao tentar enviar

        // 2. Validação de Unicidade (Case Insensitive)
        const nameExists = materials.some(m => m.name.toLowerCase() === name.trim().toLowerCase());
        const codeExists = materials.some(m => m.code.toLowerCase() === code.trim().toLowerCase());

        if (nameExists) {
            setError("A material with this name already exists.");
            return;
        }

        if (codeExists) {
            setError("This code is already in use by another material.");
            return;
        }

        // 3. Se passou nas validações, envia os dados
        dispatch(createMaterial({
            name: name.trim(),
            code: code.trim(),
            stockQuantity: stock
        }));

        // Limpa os campos
        setName(''); setCode(''); setStock(0);
    };

    return (
        <div className="space-y-4">
            {/* Feedback de erro elegante caso haja duplicidade */}
            {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Code</label>
                    <input
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        className="w-full mt-1 p-2 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition"
                        placeholder="Ex: MAT-001"
                        required
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Material Name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full mt-1 p-2 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition"
                        placeholder="Ex: Wood"
                        required
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={e => setStock(Number(e.target.value))}
                        className="w-full mt-1 p-2 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition"
                        min="0"
                        required
                    />
                </div>
                <button type="submit" className="bg-cyan-600 text-white p-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-cyan-700 transition active:scale-95">
                    <PlusCircle size={20} /> Add Material
                </button>
            </form>
        </div>
    );
};