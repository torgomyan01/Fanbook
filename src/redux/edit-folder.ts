import { createSlice } from '@reduxjs/toolkit';

interface IEditFolder {
    OpenCloseModal: boolean;
    file: {};
}
const initialState: IEditFolder = {
    OpenCloseModal: false,
    file: {}
};

const EditFolder = createSlice({
    name: 'edit-folder',
    initialState,
    reducers: {
        OpenCloseModal(state, action) {
            state.OpenCloseModal = action.payload;
        },
        SetFile(state, action) {
            state.file = { ...action.payload };
        }
    }
});

export const { OpenCloseModal, SetFile } = EditFolder.actions;

export default EditFolder.reducer;
