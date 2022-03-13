import { createSlice } from '@reduxjs/toolkit';

interface IEditAlbum {
    OpenCloseModal: boolean;
    file: {};
}
const initialState: IEditAlbum = {
    OpenCloseModal: false,
    file: {}
};

const EditAlbum = createSlice({
    name: 'edit-album',
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

export const { OpenCloseModal, SetFile } = EditAlbum.actions;

export default EditAlbum.reducer;
