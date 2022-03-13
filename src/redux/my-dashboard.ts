import { createSlice } from '@reduxjs/toolkit';

interface IMyDashboard {
    loading: boolean;
    information: {};
}
const initialState: IMyDashboard = {
    loading: true,
    information: {}
};

const MyDashboard = createSlice({
    name: 'my-dashboard',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setInformation(state, action) {
            state.information = action.payload;
        }
    }
});

export const { setLoading, setInformation } = MyDashboard.actions;

export default MyDashboard.reducer;
