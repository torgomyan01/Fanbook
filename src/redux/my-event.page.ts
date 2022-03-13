import { createSlice } from '@reduxjs/toolkit';

interface MyEventPage {
    modalViewVideo: {
        event: {
            name: string;
            url: string;
        };
        modalShow: boolean;
    };
    modalCreateEvent: boolean;
}
const initialState: MyEventPage = {
    modalViewVideo: {
        event: {
            name: '',
            url: ''
        },
        modalShow: false
    },
    modalCreateEvent: false
};

const MyEventPage = createSlice({
    name: 'my-event-page',
    initialState,
    reducers: {
        setModalViewVideo(state, action) {
            state.modalViewVideo.event = action.payload;
        },
        setModalShow(state, action) {
            state.modalViewVideo.modalShow = action.payload;
        },
        setCreateModalEvent(state, action) {
            state.modalCreateEvent = action.payload;
        }
    }
});

export const { setModalViewVideo, setModalShow, setCreateModalEvent } =
    MyEventPage.actions;

export default MyEventPage.reducer;
