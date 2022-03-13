import { createSlice } from '@reduxjs/toolkit';

interface IEditImage {
    modalOpenClose: boolean;
    image: IAlbumFiles | null;
}
const initialState: IEditImage = {
    modalOpenClose: false,
    image: null
};

const editImage = createSlice({
    name: 'edit-image',
    initialState,
    reducers: {
        modalOpenCloseEdit(state, action) {
            state.modalOpenClose = action.payload;
        },
        setImageEdit(state, action) {
            state.image = { ...action.payload };
        }
    }
});

export const { modalOpenCloseEdit, setImageEdit } = editImage.actions;

export default editImage.reducer;
