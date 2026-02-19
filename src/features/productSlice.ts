import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../api/api';
import type { Product, ProductionSuggestion } from '../types';
import { productService } from '../services/productService';

interface ProductState {
    items: Product[];
    suggestions: ProductionSuggestion[];
    totalProductionValue: number;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    suggestions: [],
    totalProductionValue: 0,
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
    const response = await productService.getProducts();
    return response.data;
});

export const createProduct = createAsyncThunk('products/create', async (newProduct: Product) => {
    const response = await productService.createProduct(newProduct);
    return response.data;
});

export const fetchProductionSuggestions = createAsyncThunk('products/fetchSuggestions', async () => {
    const response = await productService.getSuggestions();
    return response.data;
});
export const updateProduct = createAsyncThunk(
    'products/update',
    async ({ id, data }: { id: number; data: Partial<Product> }) => {
        const response = await api.put<Product>(`/products/${id}`, data);
        return response.data;
    }
);
export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id: number) => {
        await api.delete(`/products/${id}`);
        return id; // Retornamos o ID para o reducer saber qual remover da lista
    }
);
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => { state.loading = true; })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.items = action.payload;
            })

            // Localize o bloco do fetchProductionSuggestions.fulfilled
            .addCase(fetchProductionSuggestions.fulfilled, (state, action: PayloadAction<ProductionSuggestion[]>) => {
                state.loading = false;

                // 1. Salva a lista diretamente
                state.suggestions = action.payload;

                // 2. CORREÇÃO: Altere 'item.subtotal' para 'item.totalValue'
                state.totalProductionValue = action.payload.reduce(
                    (acc, item) => acc + (item.totalValue || 0), // <--- O segredo está aqui!
                    0
                );
            })

            // Caso de Deleção (D do CRUD)
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                // Remove o produto da lista 'items' usando o ID retornado
                state.items = state.items.filter(product => product.id !== action.payload);
            })

            // Caso de Edição (U do CRUD)
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                // Localiza o produto na lista e atualiza os dados dele
                const index = state.items.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // Error Handling genérico
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action: any) => {
                    state.loading = false;
                    state.error = action.error.message || 'Something went wrong';
                }
            );
    },
});

export default productSlice.reducer;