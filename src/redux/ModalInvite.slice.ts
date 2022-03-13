import { createSlice } from '@reduxjs/toolkit';

interface ModalInvite {
    emailsToAdd: [];
}
const initialState: ModalInvite = {
    emailsToAdd: []
};

const ModalInviteEvent = createSlice({
    name: 'emails-to-add',
    initialState,
    reducers: {
        ModalInviteFunc(state, action) {
            state.emailsToAdd = action.payload;
        }
    }
});

export default ModalInviteEvent.reducer;
