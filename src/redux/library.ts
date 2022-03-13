import { createSlice } from '@reduxjs/toolkit';

interface ILibraryFile {
    AllFiles: [];
}
const initialState: ILibraryFile = {
    AllFiles: []
};

const Library = createSlice({
    name: 'library',
    initialState,
    reducers: {
        setAllLibrary(state, action) {
            state.AllFiles = action.payload;
        }
    }
});

export const { setAllLibrary } = Library.actions;

export default Library.reducer;
