export const defaultEmptyPublisher = {
    name: '',
    description: '',
    avatarURL: null,
    coverURL: null,
    sites: [],
    socialNetwork: {
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: '',
        tiktok: ''
    },
    country: '',
    fiscalNumber: '',
    vatNumber: '',
    countryCode: '',
    isCompany: false,
    companyType: '',
    companyName: '',
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyZip: '',
    bankAccountNumber: '',
    bankName: '',
    bankNameAccount: '',
    bankRoutingNumber: ''
};

export const userDefaultData = {
    avatarURL: null,
    balance: 0,
    email: '',
    firstName: '',
    fullName: '',
    groups: [],
    id: '',
    isEnabled: false,
    lastLoginAt: '',
    lastName: '',
    plan: '',
    publisherProfile: null
};

export const orderFilter = [
    {
        key: 'any',
        value: 'All'
    },
    {
        key: 'draft',
        value: 'Draft'
    },
    {
        key: 'pending',
        value: 'Pending'
    },
    {
        key: 'cancelled',
        value: 'Cancelled'
    },
    {
        key: 'processing',
        value: 'Processing'
    },
    {
        key: 'printing',
        value: 'Printing'
    },
    {
        key: 'waiting_shipping',
        value: 'Waiting Shipping'
    },
    {
        key: 'shipped',
        value: 'Shipped'
    },
    {
        key: 'delivered',
        value: 'Delivered'
    }
];
