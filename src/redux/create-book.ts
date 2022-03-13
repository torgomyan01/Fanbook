import { createSlice } from '@reduxjs/toolkit';

interface ICreateBook {
    oneBlock: boolean;
    howIWork: boolean;
    step2: boolean;
    tabValue: string;
    bookCreateInfo: {
        name: string;
        description: string;
        size: {
            dimension: string;
            pages: string;
            price: string;
        };
    };
    thisBook: any;
}
const initialState: ICreateBook = {
    oneBlock: false,
    howIWork: false,
    step2: false,
    tabValue: 'book',
    thisBook: {},
    bookCreateInfo: {
        name: '',
        description: '',
        size: {
            dimension: '',
            pages: '',
            price: ''
        }
    }
};

const CreateBook = createSlice({
    name: 'create-book',
    initialState,
    reducers: {
        setOneBlock(state, action) {
            state.oneBlock = action.payload;
        },
        setTabName(state, action) {
            state.tabValue = action.payload;
        },
        setHowIWork(state, action) {
            state.howIWork = action.payload;
        },
        setStep2(state, action) {
            state.step2 = action.payload;
        },
        setBookInfo(state, action) {
            state.bookCreateInfo = action.payload;
        },
        setThisBook(state, action) {
            state.thisBook = action.payload;
        }
    }
});

export const {
    setOneBlock,
    setTabName,
    setStep2,
    setHowIWork,
    setBookInfo,
    setThisBook
} = CreateBook.actions;

export default CreateBook.reducer;
