import { createSlice } from '@reduxjs/toolkit';

interface ISearchResultPageI {
    closeMapMessage: string;
    openCloseMap: boolean;
    searchResult: string;
    setResultAll: any;
    setResultEvents: any;
    setResultPublisher: [];
    setResultBook: [];
    bookStatus: boolean;
    eventStatus: boolean;
    publishStatus: boolean;
}
const initialState: ISearchResultPageI = {
    closeMapMessage: 'true',
    openCloseMap: false,
    searchResult: '',
    setResultAll: [],
    setResultEvents: [],
    setResultPublisher: [],
    setResultBook: [],
    bookStatus: true,
    eventStatus: true,
    publishStatus: true
};

const SearchResultPageR = createSlice({
    name: 'search-result-page',
    initialState,
    reducers: {
        closeSearch(state, action) {
            state.closeMapMessage = action.payload;
        },
        openCloseMapRX(state, action) {
            state.openCloseMap = action.payload;
        },
        setSearchResult(state, action) {
            state.searchResult = action.payload;
        },
        setResultAll(state, action) {
            state.setResultAll = action.payload;
        },
        setResultEvents(state, action) {
            state.setResultEvents = action.payload;
        },
        setResultPublisher(state, action) {
            state.setResultPublisher = action.payload;
        },
        setResultBook(state, action) {
            state.setResultBook = action.payload;
        },
        setBookStatus(state, action) {
            state.bookStatus = action.payload;
        },
        setPublisherStatus(state, action) {
            state.publishStatus = action.payload;
        },
        setEventsStatus(state, action) {
            state.eventStatus = action.payload;
        }
    }
});

export const {
    closeSearch,
    openCloseMapRX,
    setSearchResult,
    setResultAll,
    setResultEvents,
    setResultPublisher,
    setResultBook,
    setBookStatus,
    setPublisherStatus,
    setEventsStatus
} = SearchResultPageR.actions;

export default SearchResultPageR.reducer;
