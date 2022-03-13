import { createSlice } from '@reduxjs/toolkit';

interface AllModalSite {
    modalToUploadImagesAlbum: string;
    MoveModal: boolean;
    MoveModalAlbumId: string;
    UploadFile: any;
    eventToModal: {
        id: string;
        eventStatus: string;
    };
    modalVideVideo: {
        eventName: string;
        videoLink: string;
        modalShow: boolean;
    };
    createAlbum: boolean;
    createAlbumDashboard: boolean;
    modalBilling: boolean;
    checkoutBlock: boolean;
    editAlbumModal: {
        albumID: string;
        openCloseAlbumEditModal: boolean;
    };
    createAlbumModal: boolean;
    selectedAlbumMoveModal: {};
    activateCodeModalMove: string;
    deleteEventModal: {
        event: {};
        openClose: boolean;
    };
    editEventModal: boolean;
    deleteBookModal: {
        book: {};
        openClose: boolean;
    };
    editBookModal: {
        book: {};
        openClose: boolean;
    };
    deleteAlbumModal: {
        album: {};
        openClose: boolean;
    };
    modalPublisherCoverUpload: {
        publisherID: string;
        openClose: boolean;
    };
    modalPublisherAvatarUpload: {
        publisherID: string;
        openClose: boolean;
    };
    modalEditStatusEvent: {
        event: object;
        openClose: boolean;
    };
    modalEditStatusBook: {
        book: object;
        openClose: boolean;
    };
    modalEditStatusAlbum: {
        album: object;
        openClose: boolean;
    };
    modalEditPoster: {
        poster: object;
        openClose: boolean;
    };
    modalEditPosterStatus: {
        poster: object;
        openClose: boolean;
    };
    modalDeletePoster: {
        poster: object;
        openClose: boolean;
    };
    modalUpgrade: {
        openClose: boolean;
        plan: {} | null;
    };
    addPlan: {
        openClose: boolean;
    };
}
const initialState: AllModalSite = {
    modalToUploadImagesAlbum: 'closed',
    MoveModal: false,
    MoveModalAlbumId: '',
    UploadFile: [],
    eventToModal: {
        id: '',
        eventStatus: 'public'
    },
    modalVideVideo: {
        eventName: '',
        videoLink: '',
        modalShow: false
    },
    createAlbum: false,
    createAlbumDashboard: false,
    modalBilling: false,
    checkoutBlock: false,
    editAlbumModal: {
        albumID: '',
        openCloseAlbumEditModal: false
    },
    createAlbumModal: false,
    selectedAlbumMoveModal: {},
    activateCodeModalMove: '',
    deleteEventModal: {
        event: {},
        openClose: false
    },
    editEventModal: false,
    deleteBookModal: {
        book: {},
        openClose: false
    },
    editBookModal: {
        book: {},
        openClose: false
    },
    deleteAlbumModal: {
        album: {},
        openClose: false
    },
    modalPublisherCoverUpload: {
        publisherID: '',
        openClose: false
    },
    modalPublisherAvatarUpload: {
        publisherID: '',
        openClose: false
    },
    modalEditStatusEvent: {
        event: {},
        openClose: false
    },
    modalEditStatusBook: {
        book: {},
        openClose: false
    },
    modalEditStatusAlbum: {
        album: {},
        openClose: false
    },
    modalEditPoster: {
        poster: {},
        openClose: false
    },
    modalEditPosterStatus: {
        poster: {},
        openClose: false
    },
    modalDeletePoster: {
        poster: {},
        openClose: false
    },
    modalUpgrade: {
        openClose: false,
        plan: null
    },
    addPlan: {
        openClose: false
    }
};

const AllModalSiteTwo: any = createSlice({
    name: 'all-modal-site',
    initialState,
    reducers: {
        modalAddPlan(state, action) {
            state.addPlan = action.payload;
        },
        modalUpgradeUser(state, action) {
            state.modalUpgrade = action.payload;
        },
        modalDeletePoster(state, action) {
            state.modalDeletePoster.poster = action.payload;
        },
        modalDeletePosterOpenClose(state, action) {
            state.modalDeletePoster.openClose = action.payload;
        },
        setModalEditPosterStatusPoster(state, action) {
            state.modalEditPosterStatus.poster = action.payload;
        },
        setModalEditPosterStatusOpenClose(state, action) {
            state.modalEditPosterStatus.openClose = action.payload;
        },
        setOpenModalEditPoster(state, action) {
            state.modalEditPoster.openClose = action.payload;
        },
        setAddPosterToEditPoster(state, action) {
            state.modalEditPoster.poster = action.payload;
        },
        setAddModalEditStatusAlbum(state, action) {
            state.modalEditStatusAlbum.album = action.payload;
        },
        setOpenModalEditStatusAlbum(state, action) {
            state.modalEditStatusAlbum.openClose = action.payload;
        },
        setAddBookToModalEditBookStatus(state, action) {
            state.modalEditStatusBook.book = action.payload;
        },
        setOpenModalEditStatusBook(state, action) {
            state.modalEditStatusBook.openClose = action.payload;
        },
        setEventStatusEdit(state, action) {
            state.modalEditStatusEvent.event = action.payload;
        },
        setOpenCloseModalEventStatusEvent(state, action) {
            state.modalEditStatusEvent.openClose = action.payload;
        },
        setOpenCloseModalUploadPublisherAvatar(state, action) {
            state.modalPublisherAvatarUpload = action.payload;
        },
        setOpenCloseModalUploadPublisherCover(state, action) {
            state.modalPublisherCoverUpload = action.payload;
        },
        setOpenCloseModalDeleteAlbum(state, action) {
            state.deleteAlbumModal.openClose = action.payload;
        },
        setAddAlbumFormDeleteModal(state, action) {
            state.deleteAlbumModal.album = action.payload;
        },
        setSetAddBookBookEditModal(state, action) {
            state.editBookModal.book = action.payload;
        },
        setOpenModalBookEdit(state, action) {
            state.editBookModal.openClose = action.payload;
        },
        setSetAddBookBookDeleteModal(state, action) {
            state.deleteBookModal.book = action.payload;
        },
        setOpenModalBookDelete(state, action) {
            state.deleteBookModal.openClose = action.payload;
        },
        setOpenModalEventEdit(state, action) {
            state.editEventModal = action.payload;
        },
        setAddIdDeleteEventModal(state, action) {
            state.deleteEventModal.event = action.payload;
        },
        setOpenCloseModalDeleteEvent(state, action) {
            state.deleteEventModal.openClose = action.payload;
        },
        setActivateCodeModalMove(state, action) {
            state.activateCodeModalMove = action.payload;
        },
        setSelectNewAlbum(state, action) {
            state.selectedAlbumMoveModal = action.payload;
        },
        setOpenCreateModalAlbum(state, action) {
            state.createAlbumModal = action.payload;
        },
        setOpenEditAlbumModal(state, action) {
            state.editAlbumModal.openCloseAlbumEditModal = action.payload;
        },
        setAddIdModalEdit(state, action) {
            state.editAlbumModal.albumID = action.payload;
        },
        ModalToUploadImage(state, action) {
            state.modalToUploadImagesAlbum = action.payload;
        },
        setOpenModalToMove(state, action) {
            state.MoveModal = action.payload;
        },
        setModalToMoveAlbumId(state, action) {
            state.MoveModalAlbumId = action.payload;
        },
        setFilesModalUpload(state, action) {
            state.UploadFile = action.payload;
        },
        RemoveArray(state, action) {
            state.UploadFile = action.payload;
        },
        clearFilesModalUpload(state, action) {
            state.UploadFile = action.payload;
        },
        setEventID(state, action) {
            state.eventToModal = action.payload;
        },
        setOpenModalToView(state, action) {
            state.modalVideVideo = action.payload;
        },
        setOpenCreateAlbum(state, action) {
            state.createAlbum = action.payload;
        },
        setOpenCreateAlbumDashboard(state, action) {
            state.createAlbumDashboard = action.payload;
        },
        setOpenCreateBilling(state, action) {
            state.modalBilling = action.payload;
        },
        setCheckoutBlock(state, action) {
            state.checkoutBlock = action.payload;
        }
    }
});

export const {
    setOpenModalEditStatusBook,
    setAddBookToModalEditBookStatus,
    ModalToUploadImage,
    setOpenModalToMove,
    setFilesModalUpload,
    clearFilesModalUpload,
    modalUpgradeUser,
    RemoveArray,
    setEventID,
    setOpenModalToView,
    setOpenCreateAlbum,
    setOpenCreateBilling,
    setCheckoutBlock,
    setOpenCreateAlbumDashboard,
    setAddIdDeleteEventModal,
    setOpenCloseModalDeleteEvent,
    setOpenEditAlbumModal,
    setAddIdModalEdit,
    setModalToMoveAlbumId,
    setOpenCreateModalAlbum,
    setSelectNewAlbum,
    setActivateCodeModalMove,
    setOpenModalEventEdit,
    setSetAddBookBookDeleteModal,
    setOpenModalBookDelete,
    setOpenModalBookEdit,
    setSetAddBookBookEditModal,
    setOpenCloseModalDeleteAlbum,
    setAddAlbumFormDeleteModal,
    setOpenCloseModalUploadPublisherCover,
    setOpenCloseModalUploadPublisherAvatar,
    setEventStatusEdit,
    setOpenCloseModalEventStatusEvent,
    setAddModalEditStatusAlbum,
    setOpenModalEditStatusAlbum,
    setOpenModalEditPoster,
    setAddPosterToEditPoster,
    setModalEditPosterStatusPoster,
    setModalEditPosterStatusOpenClose,
    modalDeletePoster,
    modalDeletePosterOpenClose,
    modalAddPlan
} = AllModalSiteTwo.actions;

export default AllModalSiteTwo.reducer;
