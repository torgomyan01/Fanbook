import { createSlice } from '@reduxjs/toolkit';

interface IBecomePublisher {
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
const initialState: IBecomePublisher = {
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

const BecomePublisher = createSlice({
    name: 'Become-Publisher',
    initialState,
    reducers: {
        setStep(state, action) {
            state.step = action.payload;
        },
        setPublisherInformation(state, action) {
            state.publisherProfile = action.payload;
        }
    }
});

export const { setStep, setPublisherInformation } = BecomePublisher.actions;

export default BecomePublisher.reducer;
