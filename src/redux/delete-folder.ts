import { createSlice } from '@reduxjs/toolkit';

interface IDeleteFolder {
    OpenCloseModal: boolean;
    file: {};
}
const initialState: IDeleteFolder = {
    OpenCloseModal: false,
    file: {}
};

const DeleteFolder = createSlice({
    name: 'delete-folder',
    initialState,
    reducers: {
        OpenCloseModalForDelete(state, action) {
            state.OpenCloseModal = action.payload;
        },
        SetFileForDelete(state, action) {
            state.file = { ...action.payload };
        }
    }
});

export const { OpenCloseModalForDelete, SetFileForDelete } =
    DeleteFolder.actions;

export default DeleteFolder.reducer;
