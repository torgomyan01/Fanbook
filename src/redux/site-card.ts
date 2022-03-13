import { createSlice } from '@reduxjs/toolkit';

interface ISiteCard {
    allCardOrders: number | null;
    allProducts: [];
}
const initialState: ISiteCard = {
    allCardOrders: null,
    allProducts: []
};

const SiteCard = createSlice({
    name: 'site-card',
    initialState,
    reducers: {
        setNewCard(state, action) {
            state.allCardOrders = action.payload;
        },
        allProducts(state, action) {
            state.allProducts = action.payload;
        }
    }
});

export const { setNewCard, allProducts } = SiteCard.actions;

export default SiteCard.reducer;
