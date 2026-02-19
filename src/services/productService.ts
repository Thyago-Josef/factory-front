import api from '../api/api';
import type { Product, ProductionSuggestion } from '../types';

export const productService = {
    // RF001 - Buscar todos os produtos
    getProducts: () => api.get<Product[]>('/products'),

    // RF003 - Criar novo produto
    createProduct: (product: Product) => api.post<Product>('/products', product),

    // RF004 - Consulta de sugestões de produção
    getSuggestions: () => api.get<ProductionSuggestion[]>('/production/suggestions'),

    // NOVO: RF005 - Executar produção (Reduz estoque no backend)
    // POST /production/execute/{productId}?quantity=300
    executeProduction: (productId: number, quantity: number) => {
        const params = new URLSearchParams({ quantity: quantity.toString() });
        return api.post(`/production/execute/${productId}?${params.toString()}`, {});
    }
};