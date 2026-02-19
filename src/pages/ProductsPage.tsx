import { ProductForm } from '../components/ProductForm';
import { ProductList } from '../components/ProductList';

export const ProductsPage = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black text-slate-800">Products Management</h1>
            <ProductForm /> {/* O "C" do CRUD */}
            <ProductList /> {/* O "R, U, D" do CRUD */}
        </div>
    );
};