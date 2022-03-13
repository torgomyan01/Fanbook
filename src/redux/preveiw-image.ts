import { createSlice } from '@reduxjs/toolkit';

interface IViewImageModal {
    modalOpenClose: boolean;
    image: {
        name: string;
        url: string;
    };
    size: {
        width: number;
        height: number;
    };
}
const initialState: IViewImageModal = {
    modalOpenClose: false,
    image: {
        name: '',
        url: ''
    },
    size: {
        width: 0,
        height: 0
    }
};

const ViewImageModal = createSlice({
    name: 'view-image-modal',
    initialState,
    reducers: {
        modalOpenClose(state, action) {
            state.modalOpenClose = action.payload;
        },
        setImage(state, action) {
            state.image = { ...action.payload };
        }
    }
});

export const { modalOpenClose, setImage } = ViewImageModal.actions;

export default ViewImageModal.reducer;
