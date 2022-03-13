import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from 'utils/const';
import { checkIsEditable, getToken } from 'utils/helpers';

interface IState {
    events: IEvent[];
    myEvents: any;
    loading: boolean;
    error: any;
    currentEvent: any;
    currentAlbum: {} | null;
}
const initialState: IState = {
    events: [],
    myEvents: [],
    loading: false,
    error: null,
    currentAlbum: null,
    currentEvent: {
        id: '',
        userId: '',
        coverURL: '',
        name: '',
        books: [],
        albums: [],
        posters: [],
        description: '',
        geolocation: {
            city: '',
            country: '',
            countryCode: 'AM',
            latitude: 0,
            longitude: 0
        },
        code: '',
        dateFrom: '',
        dateTo: '',
        user: {
            avatar: '',
            avatarURL: null,
            createdAt: '',
            description: '',
            email: '',
            firstName: '',
            id: '',
            lastName: '',
            providerName: '',
            sites: '',
            socialNetwork: '',
            type: '',
            updatedAt: '',
            userCover: '',
            userCoverURL: ''
        },
        isEditable: false
    }
};

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvents(state, action) {
            state.events = action.payload;
        },
        GetMyEvents(state, action) {
            state.myEvents = action.payload;
        },
        addEvent(state, action) {
            state.events = [...state.events, action.payload];
            state.loading = false;
            state.error = null;
        },
        setError(state, action) {
            state.error = action.payload.message;
            state.loading = false;
        },
        startLoading(state) {
            state.loading = true;
        },
        setCurrentEvent(state, action) {
            state.currentEvent = {
                ...action.payload,
                isEditable: action.payload
                    ? checkIsEditable(action.payload?.user?.id)
                    : false
            };
            state.error = null;
        },
        clearCurrentEvent(state) {
            state.currentEvent = null;
        },
        setCurrentAlbum(state, action) {
            state.currentAlbum = {
                ...action.payload,
                isEditable: action.payload
                    ? checkIsEditable(action.payload.thisEvent?.userId)
                    : false
            };
            state.error = null;
        },
        clearCurrentAlbum(state) {
            state.currentAlbum = null;
        }
    }
});

export const createEvent = (data: {}) => (dispatch: any) => {
    const token = getToken();
    dispatch(eventSlice.actions.startLoading());
    axios
        .post(API_URL.USER_EVENT, data, {
            headers: {
                Authorization: token
            }
        })
        .then((res) => {
            console.log(res);
            dispatch(eventSlice.actions.addEvent(res.data.data));
        })
        .catch((err) => {
            dispatch(eventSlice.actions.setError(err));
        });
};

export const {
    setCurrentEvent,
    setCurrentAlbum,
    clearCurrentAlbum,
    clearCurrentEvent,
    GetMyEvents
} = eventSlice.actions;

export default eventSlice.reducer;
