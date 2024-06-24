import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")) : [],
    statusTab: false
}
const cartlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action){
            const {productId, quantity} = action.payload;
            const indexProductId = (state.items).findIndex(item => item.productId === productId);
            if(indexProductId >= 0){
                state.items[indexProductId].quantity += quantity;
            }else{
                state.items.push({productId, quantity});
            }
            sessionStorage.setItem("cart", JSON.stringify(state.items));
        },
        changeQuantity(state, action){
            const {productId, quantity} = action.payload;
            const indexProductId = (state.items).findIndex(item => item.productId === productId);
            if(quantity > 0){
                state.items[indexProductId].quantity = quantity;
            }else{
                state.items = (state.items).filter(item => item.productId !== productId);
            }
            sessionStorage.setItem("cart", JSON.stringify(state.items));
        },
        toggleStatusTab(state){
            if(state.statusTab === false){
                state.statusTab = true;
            }else{
                state.statusTab = false;
            }
        }
    }
})
export const { addToCart, changeQuantity, toggleStatusTab } = cartlice.actions;
export default cartlice.reducer;