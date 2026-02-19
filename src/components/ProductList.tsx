import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteProduct, fetchProducts, updateProduct } from '../features/productSlice';
import { Pencil, Trash2 } from 'lucide-react';

export const ProductList = () => {
    const dispatch = useAppDispatch();
    const { items: products } = useAppSelector((state) => state.products);
    const { items: allProducts } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleEdit = (product: any) => {
        const newName = window.prompt("Novo nome:", product.name);
        const newCode = window.prompt("Novo código:", product.code);
        const newPrice = window.prompt("Novo preço:", product.price.toString());

        if (newName !== null && newCode !== null && newPrice !== null &&
            newName.trim() !== "" && newCode.trim() !== "" && newPrice.trim() !== "") {

            const isNameDuplicate = allProducts.some(
                p => p.name.toLowerCase() === newName.trim().toLowerCase() && p.id !== product.id
            );

            const isCodeDuplicate = allProducts.some(
                p => p.code.toLowerCase() === newCode.trim().toLowerCase() && p.id !== product.id
            );

            if (isNameDuplicate) {
                alert("Erro: Já existe um produto com este nome.");
                return;
            }

            if (isCodeDuplicate) {
                alert("Erro: Já existe um produto com este código.");
                return;
            }

            const priceNumber = Number(newPrice);
            if (isNaN(priceNumber)) {
                alert("Erro: O preço deve ser um número válido.");
                return;
            }

            dispatch(updateProduct({
                id: product.id,
                data: {
                    ...product,
                    name: newName.trim(),
                    code: newCode.trim(),
                    price: priceNumber
                }
            }));
        }
    };

    const handleDelete = (id: number | undefined) => {
        if (id && window.confirm("Excluir este produto?")) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left table-fixed"> {/* table-fixed ajuda a controlar larguras exatas */}
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold">
                    <tr>
                        {/* Escondemos o Code em telas menores que 'sm' (640px) */}
                        <th className="hidden sm:table-cell px-4 py-4 w-1/4">Code</th>
                        <th className="px-4 py-4 w-1/2 sm:w-1/3">Product</th>
                        <th className="px-4 py-4 w-1/4 text-center">Price</th>
                        <th className="px-4 py-4 text-right w-24">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                            {/* O Código só aparece no Desktop */}
                            <td className="hidden sm:table-cell px-4 py-4 font-mono text-[10px] text-slate-500">
                                {product.code || `ID-${product.id}`}
                            </td>

                            {/* O Nome ganha destaque e quebra linha se necessário */}
                            <td className="px-4 py-4">
                                <p className="text-sm font-medium text-slate-700 leading-tight break-words">
                                    {product.name}
                                </p>
                                {/* Mostramos o código pequeno abaixo do nome apenas no Mobile */}
                                <span className="sm:hidden text-[9px] text-slate-400 font-mono">
                                    {product.code}
                                </span>
                            </td>

                            <td className="px-4 py-4 font-mono text-emerald-600 font-bold text-xs text-center">
                                ${product.price.toLocaleString()}
                            </td>

                            <td className="px-4 py-4 text-right whitespace-nowrap">
                                <div className="flex justify-end gap-1">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-600 p-2 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};