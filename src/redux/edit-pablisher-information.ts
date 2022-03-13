import { createSlice } from '@reduxjs/toolkit';

interface IEditPublisherInfo {
    step: number;
    publisherProfile: {
        name: string;
        description: string;
        avatar: null | string;
        cover: null | string;
        sites: [];
        socialNetwork: {
            facebook: string | null;
            twitter: string | null;
            linkedin: string | null;
            instagram: string | null;
            tiktok: string | null;
        };
        fiscalNumber: string | null;
        vatNumber: string | null;
        countryCode: string | null;
        isCompany: boolean;
        companyType: string | null;
        companyName: string | null;
        companyAddress: string | null;
        companyCity: string | null;
        companyState: string | null;
        companyZip: string | null;
    };
}
const initialState: IEditPublisherInfo = {
    step: 0,
    publisherProfile: {
        name: '',
        description: '',
        avatar: '',
        cover: '',
        sites: [],
        socialNetwork: {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: '',
            tiktok: ''
        },
        fiscalNumber: '',
        vatNumber: '',
        countryCode: '',
        isCompany: false,
        companyType: null,
        companyName: null,
        companyAddress: null,
        companyCity: null,
        companyState: null,
        companyZip: null
    }
};

const EditPublisherInfo = createSlice({
    name: 'Edit-Publisher-information',
    initialState,
    reducers: {
        setStepEditInfo(state, action) {
            state.step = action.payload;
        },
        setEditPublisherInformation(state, action) {
            state.publisherProfile = action.payload;
        }
    }
});

export const { setStepEditInfo, setEditPublisherInformation } =
    EditPublisherInfo.actions;

export default EditPublisherInfo.reducer;
