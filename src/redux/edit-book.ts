import { createSlice } from '@reduxjs/toolkit';
import { editorBookTabs } from '../utils/editor-defoult-name';
import { TEMPLATE_NAME } from '../pages/edit-covers/helper';

interface IOneBook {
    currentBook: {
        backCover: null | string;
        backCoverURL: null | string;
        createdAt: string;
        description: string;
        files: [];
        filesURLs: [];
        frontCover: null | string;
        frontCoverURL: null | string;
        id: string;
        jobId: null | any;
        name: string;
        previewPdf: null | any;
        publisherCoverPdf: null | any;
        publisherCoverPdfURL: null | any;
        publisherPdf: null | any;
        publisherPdfURL: null | any;
        size: string;
        status: string;
        updatedAt: string;
        userEvent: {};
        userEventId: string;
    };
    thisAlbums: OneAlbum[];
    tabName: string;
    bookTemplates: IBookTemplate[];
    currentTemplate: {};
    bookPage: {};
    drag: {
        start: boolean;
        moveToImages: boolean;
        imgUrl: string;
    };
    rightTollBar: {
        borderColor: string;
    };
    currentBlockInformation: {
        name: string;
        style: string;
    };
    deleteText: string;
    UpdateTexts: {
        id: string;
        text: string;
        style: string;
    };
    updatePages: {
        status: string;
        pageID: string;
        saveNewTemplate: {};
    };
    startSaveAllPages: string;
    openCloseLibraryBlock: boolean;
}
const initialState: IOneBook = {
    currentBook: {
        backCover: null,
        backCoverURL: null,
        createdAt: '',
        description: '',
        files: [],
        filesURLs: [],
        frontCover: null,
        frontCoverURL: null,
        id: '',
        jobId: null,
        name: '',
        previewPdf: null,
        publisherCoverPdf: null,
        publisherCoverPdfURL: null,
        publisherPdf: null,
        publisherPdfURL: null,
        size: '',
        status: '',
        updatedAt: '',
        userEvent: {},
        userEventId: ''
    },
    thisAlbums: [],
    tabName: editorBookTabs.frontBack,
    bookTemplates: [],
    currentTemplate: {
        name: TEMPLATE_NAME.CREATE_FRONT
    },
    bookPage: {},
    drag: {
        start: false,
        moveToImages: false,
        imgUrl: ''
    },
    rightTollBar: {
        borderColor: '0px solid red'
    },
    currentBlockInformation: {
        name: '',
        style: ''
    },
    deleteText: '',
    UpdateTexts: {
        id: '',
        text: '',
        style: ''
    },
    updatePages: {
        status: '',
        pageID: '',
        saveNewTemplate: {}
    },
    startSaveAllPages: '',
    openCloseLibraryBlock: false
};

const ThisBook = createSlice({
    name: 'this-book',
    initialState,
    reducers: {
        setCurrentBook(state, action) {
            state.currentBook = action.payload;
        },
        setThisAlbums(state, action) {
            state.thisAlbums = action.payload;
        },
        setTabName(state, action) {
            state.tabName = action.payload;
        },
        setBookTemplates(state, action) {
            state.bookTemplates = action.payload;
        },
        setCurrentTemplate(state, action) {
            state.currentTemplate = action.payload;
        },
        setDragStart(state, action) {
            // FOR START DRAGGING IMAGE EDITOR
            state.drag.start = action.payload;
        },
        setDraggingImgUrl(state, action) {
            state.drag.imgUrl = action.payload;
        },
        setBookPage(state, action) {
            state.bookPage = action.payload;
        },
        setBorderColor(state, action) {
            state.rightTollBar.borderColor = action.payload;
        },
        setCurrentBlockInformation(state, action) {
            state.currentBlockInformation = action.payload;
        },
        setStartDelete(state, action) {
            state.deleteText = action.payload;
        },
        setUpdateTexts(state, action) {
            state.UpdateTexts = action.payload;
        },
        setUpdatePages(state, action) {
            state.updatePages = action.payload;
        },
        setStartSaveAllPages(state, action) {
            state.startSaveAllPages = action.payload;
        },
        setOpenCloseLibraryBlock(state, action) {
            state.openCloseLibraryBlock = action.payload;
        }
    }
});

export const {
    setCurrentBook,
    setThisAlbums,
    setTabName,
    setBookTemplates,
    setCurrentTemplate,
    setDragStart,
    setDraggingImgUrl,
    setBookPage,
    setBorderColor,
    setCurrentBlockInformation,
    setStartDelete,
    setUpdateTexts,
    setUpdatePages,
    setStartSaveAllPages,
    setOpenCloseLibraryBlock
} = ThisBook.actions;
export default ThisBook.reducer;
