import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface CartState {
    items: Product[];       
    totalPrice: number;     
}

const initialState: CartState = {
    items: [],
    totalPrice: 0
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
        addItem: (state, action: PayloadAction<Product>) => {
            state.items.push(action.payload);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);
        },

       
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);
        },

       
        clearCart: () => initialState
    }
});

const cartReducer = cartSlice.reducer;
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartReducer;