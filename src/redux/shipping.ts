import { createSlice } from '@reduxjs/toolkit';

interface IShipping {
    loading: boolean;
    orderInformation: object;
}

const initialState: IShipping = {
    loading: false,
    orderInformation: {}
};

const Shipping = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        setOrderInformation(state, action) {
            state.orderInformation = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }
    }
});

export const { setOrderInformation, setLoading } = Shipping.actions;

export default Shipping.reducer;
