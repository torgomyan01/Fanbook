import { createSlice } from '@reduxjs/toolkit';

interface IPublisherProfile {
    loading: boolean;
    data: {} | null;
}
const initialState: IPublisherProfile = {
    loading: true,
    data: {}
};

const PublisherProfile = createSlice({
    name: 'publisher-profile',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setProfileData(state, action) {
            state.data = action.payload;
        }
    }
});

export const { setLoading, setProfileData } = PublisherProfile.actions;

export default PublisherProfile.reducer;
