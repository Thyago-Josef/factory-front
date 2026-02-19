import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';
import type { RawMaterial } from '../types';

export const createMaterial = createAsyncThunk(
    'materials/create',
    async (newMaterial: Omit<RawMaterial, 'id'>) => {
        const response = await api.post<RawMaterial>('/raw-materials', newMaterial);
        return response.data;
    }
);