import { createSlice } from '@reduxjs/toolkit';
import { UserLoginTypes } from 'enums/enums';

interface ILoginRegUser {
    openCloseModal: boolean;
    type: UserLoginTypes;
}

const initialState: ILoginRegUser = {
    openCloseModal: false,
    type: UserLoginTypes.signIn
};

const regLogin = createSlice({
    name: 'Login-Reg-user',
    initialState,
    reducers: {
        setOpenCloseModal(state, action) {
            state.openCloseModal = action.payload;
        },
        setUseType(state, action) {
            state.type = action.payload;
        }
    }
});

export const { setOpenCloseModal, setUseType } = regLogin.actions;

export default regLogin.reducer;
