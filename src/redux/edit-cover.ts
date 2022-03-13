import { createSlice } from '@reduxjs/toolkit';
import { pagesTypes } from '../pages/edit-covers/components/main-header';

interface IEditCover {
    pages: boolean;
    frontSpineCover: string;
}
const initialState: IEditCover = {
    pages: false,
    frontSpineCover: pagesTypes.coverFront
};

const EditCover = createSlice({
    name: 'edit-cover',
    initialState,
    reducers: {
        openPages(state, action) {
            state.pages = action.payload;
        },
        setFrontSpineCover(state, action) {
            state.frontSpineCover = action.payload;
        }
    }
});

export const { openPages, setFrontSpineCover } = EditCover.actions;

export default EditCover.reducer;
