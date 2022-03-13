import { createSlice } from '@reduxjs/toolkit';

interface ModalAdminSite {
    openClose: boolean;
    pageLoading: boolean;
}
const initialState: ModalAdminSite = {
    openClose: false,
    pageLoading: false
};

const ModalAdminPage = createSlice({
    name: 'modal-to-details',
    initialState,
    reducers: {
        openClose(state, action) {
            state.openClose = action.payload;
        },
        openCloseLoading(state, action) {
            state.pageLoading = action.payload;
        }
    }
});

export const { openClose, openCloseLoading } = ModalAdminPage.actions;

export default ModalAdminPage.reducer;
