import { createSlice } from '@reduxjs/toolkit';

interface IEditPhotos {
    OpenCloseModal: boolean;
    file: {};
}
const initialState: IEditPhotos = {
    OpenCloseModal: false,
    file: {}
};

const EditEditPhotos = createSlice({
    name: 'edit-photos',
    initialState,
    reducers: {
        OpenCloseModalEditPhotos(state, action) {
            state.OpenCloseModal = action.payload;
        },
        SetFileEditPhotos(state, action) {
            state.file = { ...action.payload };
        }
    }
});

export const { SetFileEditPhotos, OpenCloseModalEditPhotos } =
    EditEditPhotos.actions;

export default EditEditPhotos.reducer;
