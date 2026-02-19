export interface RawMaterial {
    id?: number;
    code: string;
    name: string;
    stockQuantity: number;
}

export interface ProductMaterial {
    rawMaterialId: number;     // Antes era materialId
    quantityRequired: number;  // Antes era quantity
}

export interface Product {
    id?: number;
    code: string;
    name: string;
    price: number;
    materials: ProductMaterial[]; // Antes era recipe
}

// export interface ProductionSuggestion {
//     productName: string;      // Verifique se no Java é productName ou name
//     suggestedQuantity: number;
//     totalValue?: number;         // Usado no cálculo do reduce acima
// }

export interface ProductionSuggestion {
    productId: number;
    productCode: string;
    productName: string;
    price: number;
    suggestedQuantity: number; // Nome vindo do Java
    totalValue: number;        // Nome vindo do Java
}