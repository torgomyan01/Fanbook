import { createSlice } from '@reduxjs/toolkit';

interface IGoogleFonts {
    AllFonts: {};
}
const initialState: IGoogleFonts = {
    AllFonts: {}
};

const GoogleFonts = createSlice({
    name: 'google-fonts',
    initialState,
    reducers: {
        setAllFonts(state, action) {
            state.AllFonts = action.payload;
        }
    }
});

export const { setAllFonts } = GoogleFonts.actions;

export default GoogleFonts.reducer;
