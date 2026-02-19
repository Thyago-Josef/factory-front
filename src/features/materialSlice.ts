import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../api/api'; // Certifique-se de que criou este arquivo com o Axios
import type { RawMaterial } from '../../src/types'; // Importe a interface que definimos antes
// Importe a interface que definimos antes
// Importe a interface que definimos antes

interface MaterialState {
    list: RawMaterial[];
    loading: boolean;
    error: string | null;
}

const initialState: MaterialState = {
    list: [],
    loading: false,
    error: null,
};

// Thunk para buscar dados do Back-end (RF002)
export const fetchMaterials = createAsyncThunk('materials/fetch', async () => {
    const response = await api.get<RawMaterial[]>('/raw-materials');
    return response.data;
});


// RF002 - Criar Material
export const createMaterial = createAsyncThunk(
    'materials/create',
    async (newMaterial: Omit<RawMaterial, 'id'>) => {
        const response = await api.post<RawMaterial>('/raw-materials', newMaterial);
        return response.data;
    }
);

export const updateMaterial = createAsyncThunk(
    'materials/update',
    async ({ id, data }: { id: number; data: Partial<RawMaterial> }) => {
        const response = await api.put<RawMaterial>(`/raw-materials/${id}`, data);
        return response.data;
    }
);




// RF002 - Deletar Material
export const deleteMaterial = createAsyncThunk(
    'materials/delete',
    async (id: number) => {
        await api.delete(`/raw-materials/${id}`);
        return id; // Retornamos o ID para remover da lista localmente
    }
);

const materialSlice = createSlice({
    name: 'materials',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterials.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMaterials.fulfilled, (state, action: PayloadAction<RawMaterial[]>) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchMaterials.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load materials";
            })
            // Caso de Sucesso na Criação
            .addCase(createMaterial.fulfilled, (state, action: PayloadAction<RawMaterial>) => {
                state.list.push(action.payload); // Adiciona o novo material à lista sem precisar de novo fetch
            })
            // Caso de Sucesso na Deleção
            .addCase(deleteMaterial.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.list = state.list.filter(item => item.id !== action.payload);
            })
            .addCase(updateMaterial.fulfilled, (state, action) => {
                const index = state.list.findIndex(m => m.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload; // Atualiza o item na lista na hora
                }
            })
    },
});

export default materialSlice.reducer;