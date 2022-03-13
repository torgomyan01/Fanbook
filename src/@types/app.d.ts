declare interface IAuth {
    sign: {
        sign?:
            | {
                  UserVerified: boolean;
              }
            | null
            | undefined;
        error?: any;
        loading: boolean;
        user: {
            isLoggedIn: boolean;
            token?: string | null;
            profile?: UserInfo | null;
        };
        isLoginTo: string;
        myPlans: IPlans;
        AllPlans: IPlans[];
    };
}

declare interface ILoginRegUser {
    regLogin: {
        openCloseModal: boolean;
        type: string;
    };
}

declare interface UserInfo {
    email: string;
    avatarURL: string | null;
    lastName: string;
    firstName: string;
    id: string;
    balance: number;
    groups: [];
    plan: string;
    planActiveTill: string;
    publisherProfile: null | IPublisherProfileTwo;
}

declare interface UserInfoAdmin {
    avatarURL: null | string;
    balance: number;
    email: string;
    firstName: string;
    fullName: string;
    groups: string[];
    id: string;
    isEnabled: boolean;
    lastLoginAt: string | null;
    createdAt: string | null;
    lastName: string;
    plan: string;
    publisherProfile: null | IPublisherProfileTwo;
}

declare interface ISearchResultPage {
    searchResultPageK: {
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
    };
}

declare interface IModalAdminPage {
    adminSite: {
        openClose: false;
        pageLoading: boolean;
    };
}
declare interface IEditAlbum {
    EditAlbum: {
        OpenCloseModal: boolean;
        file: {
            albumFiles: [];
            createdAt: string;
            description: string;
            id: string;
            name: string;
            updatedAt: string;
            userEventId: string;
            userId: string;
        };
    };
}
declare interface IEditCover {
    editCover: {
        pages: boolean;
        frontSpineCover: string;
    };
}
declare interface IEditFolder {
    EditFolder: {
        OpenCloseModal: boolean;
        file: {
            albumFiles: [];
            createdAt: string;
            description: string;
            id: string;
            name: string;
            updatedAt: string;
            userEventId: string;
            userId: string;
        };
    };
}
declare interface IDeleteFolder {
    DeleteFolder: {
        OpenCloseModal: boolean;
        file: {
            albumFiles: [];
            createdAt: string;
            description: string;
            id: string;
            name: string;
            updatedAt: string;
            userEventId: string;
            userId: string;
        };
    };
}

declare interface IEditEditPhotos {
    EditEditPhotos: {
        OpenCloseModal: boolean;
        file: {
            albumFiles: [];
            createdAt: string;
            description: string;
            id: string;
            name: string;
            updatedAt: string;
            userEventId: string;
            userId: string;
        };
    };
}

declare interface IEvents {
    events: {
        events: [IEvent];
        myEvents: any;
        loading: boolean;
        error: any;
        currentEvent: IEvent;
        currentAlbum: IAlbum;
    };
}

declare interface PosterTemplate {
    createdAt: string;
    id: string;
    logo: null | string;
    logoURL: string;
    name: string;
    order: number;
    params: {
        images: {
            items: { style: string; tag: string; texts: [] }[];
            style: string;
        };
        template: {
            style: string;
        };
        texts: [];
    };
    template: string;
    templateName: string;
    type: string;
    updatedAt: string;
}

// declare interface IEditImage {
//     editImage: editImage
// }
declare interface tagsType {
    title: string;
    id: number;
}

declare interface ImageType {
    id: number;
    src: string;
}

declare interface SingleImageType {
    id: number;
    src: string;
    tags: tagsType[];
}

declare interface editImage {
    image: SingleImageType;
    imagesList: ImageType[];
}

declare interface IEvent {
    albums: OneAlbum[];
    allowUserUpload: boolean;
    cover: string;
    coverURL: string;
    createdAt: string;
    dateFrom: string;
    dateTo: string;
    books: IThisBook[];
    description: string;
    embededVideoURL: null | string;
    geolocation: {
        city: string | null;
        country: string | null;
        countryCode: string | null;
        latitude: number | null;
        longitude: number | null;
    };
    id: string;
    isAvailable: boolean;
    isFeatured: boolean;
    name: string;
    updatedAt: string;
    user: UserInfo;
    userId: string;
    video: string;
    videoURL: string;
    isEditable: boolean;
    posters: IPoster[];
}

declare interface IPublisher {
    avatar: string | null;
    avatarURL: string | null;
    createdAt: string;
    description: string | null;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    providerName: string | null;
    sites: string | null;
    socialNetwork: string | null;
    type: string | null;
    updatedAt: string;
    userCover: string | null;
    userCoverURL: string | null;
}

declare interface IAlbum {
    albumFiles: IAlbumFiles[];
    albumFilesCount: number;
    createdAt: string;
    deletedAt: string;
    description: string | null;
    id: string;
    isAvailable: boolean;
    isEditable: boolean;
    name: string;
    type: string | null;
    updatedAt: string | null;
    user: {
        avatarURL: string;
        email: string;
        firstName: string;
        fullName: string;
        id: string;
        lastName: string;
        publisherProfile: IPublisherProfileTwo;
    };
    userEvent: IEvent;
    userEventId: string;
    userId: string;
    price: number;
}

declare interface IImageView {
    ViewImageModal: {
        modalOpenClose: boolean;
        image: {
            name: string;
            url: string;
        };
    };
}

declare interface OneAlbum {
    createdAt: string;
    description: string;
    deletedAt: string | null;
    id: string;
    name: string;
    updatedAt: string;
    userEventId: string;
    userId: string;
    albumFiles: IAlbumFiles[];
    url: string;
    albumFilesCount: number;
    userEvent: IEvent;
    likes: IAlbumLikes[];
    user: UserInfo;
    isAvailable: boolean;
    type: string;
}

declare interface ICartProductsItems {
    discount: number;
    giftCode: any;
    id: string;
    items: ICartBookInfo[];
    itemsCount: number;
    paymentMethod: null;
    shipping: number;
    shippingAddress: number;
    status: string;
    subtotal: number;
    tax: number;
    total: number;
}
declare interface IShipping {
    Shipping: {
        loading: boolean;
        orderInformation: ICartProductsItems;
    };
}

declare interface IAddress {
    address1: string;
    address2: string;
    city: string;
    country: string;
    countryCode: string;
    createdAt: string;
    id: string;
    name: string;
    region: string;
    tag: string;
    updatedAt: string;
    zip: string;
}

declare interface IPaymentsMethods {
    billingDetails: {
        address: {
            city: string | null;
            country: string | null;
            line1: string | null;
            line2: string | null;
            postalCode: string | null;
            state: string | null;
        };
        email: string | null;
        name: string | null;
        phone: string | null;
    };
    card: {
        brand: string;
        expMonth: number;
        expYear: number;
        last4: string;
    };
    createdAt: string;
    id: string;
    type: string;
}

declare interface ITransaction {
    id: string;
    type: string;
    description: string | null;
    sourceType: string | null;
    sourceId: string | null;
    sourceUserId: string | null;
    targetType: string | null;
    targetId: string | null;
    status: string;
    targetUserId: string | null;
    orderId: string | null;
    ref: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    avatarUrl: string | null;
    total: number;
}

declare interface IOrder {
    createdAt: string;
    discount: number;
    giftCode: string;
    id: string;
    items: ICartBookInfo[];
    paymentMethod: IPaymentsMethods;
    shipping: number;
    shippingAddress: IAddress;
    status: string;
    subtotal: number;
    tax: number;
    total: number;
    timeline: IOrderTimeLine[];
    userEvent: IEvent;
    user: UserInfo;
}

declare interface IOrderTimeLine {
    createdAt: string;
    id: string;
    status: string;
}

declare interface ICartBookInfo {
    createdAt: string;
    entityId: string;
    entityType: string;
    id: string;
    name: string;
    price: number;
    qty: number;
    serviceFee: number;
    servicePercent: number;
    subtotal: number;
    userEventId: string;
    publisher: UserInfo;
    publisherId: string;
    userEvent: IEvent;
    avatarUrl: string | null;
}

declare interface IPublisherOrder {
    createdAt: string;
    avatarUrl: string | null;
    entityId: string;
    entityType: string;
    id: string;
    name: string;
    orderId: string;
    price: number;
    publisherId: string;
    qty: number;
    serviceFee: number;
    servicePercent: number;
    sourceId: string;
    subtotal: number;
    userEventId: string;
    userEvent: IEvent;
}

declare interface ISummary {
    savedAddress: IAddress;
    savedCard: IPaymentsMethods;
}

declare interface IAlbumFiles {
    albumId: string;
    createdAt: string;
    description: null | string;
    id: string;
    name: string;
    avatarUrl: string;
    updatedAt: string;
    url: string;
    price: number;
    userId: string;
    isLiked: boolean;
    isBought: boolean;
    likes: [];
}

interface IOneLike {
    albumFileId: string;
    createdAt: string;
    id: string;
    userId: string;
}

declare interface IAlbumLikes {
    albumFileId: string;
    createdAt: string;
    id: string;
    userId: string;
}

declare interface folderImageType {
    src: string;
    name: string;
    id: number;
    isSelected: boolean;
}
declare interface EditFolderPhotosState {
    editFolderImages: {
        images: folderImageType[];
    };
}
declare interface AllModalSite {
    AllModalSiteTwo: {
        modalToUploadImagesAlbum: any;
        MoveModal: boolean;
        MoveModalAlbumId: string;
        UploadFile: [];
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
        selectedAlbumMoveModal: {
            eventID: string;
            albumID: string;
        };
        activateCodeModalMove: string;
        deleteEventModal: {
            event: IEvent;
            openClose: boolean;
        };
        editEventModal: boolean;
        deleteBookModal: {
            book: IThisBook;
            openClose: boolean;
        };
        editBookModal: {
            book: IThisBook;
            openClose: boolean;
        };
        deleteAlbumModal: {
            album: OneAlbum;
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
            event: IEvent;
            openClose: boolean;
        };
        modalEditStatusBook: {
            book: IThisBook;
            openClose: boolean;
        };
        modalEditStatusAlbum: {
            album: OneAlbum;
            openClose: boolean;
        };
        modalEditPoster: {
            poster: IPoster;
            openClose: boolean;
        };
        modalEditPosterStatus: {
            poster: IPoster;
            openClose: boolean;
        };
        modalDeletePoster: {
            poster: IPoster;
            openClose: boolean;
        };
        modalUpgrade: {
            openClose: boolean;
            plan: IPlans;
        };
        addPlan: {
            openClose: boolean;
        };
    };
}

declare interface IBecomePublisher {
    BecomePublisher: {
        step: number;
        publisherProfile: IPublisherProfileTwo;
    };
}

declare interface IEditPublisherInfo {
    EditPublisherInfo: {
        step: number;
        publisherProfile: IPublisherProfileTwo;
    };
}

declare interface IPublisherProfileTwo {
    name: string;
    description: string;
    avatarURL: null | string;
    coverURL: null | string;
    sites: string[];
    socialNetwork: {
        facebook: string;
        twitter: string;
        linkedin: string;
        instagram: string;
        tiktok: string;
    };
    fiscalNumber: string | null;
    vatNumber: string | null;
    countryCode: string | null;
    isCompany: boolean;
    country: string | null;
    companyType: string | null;
    companyName: string | null;
    companyAddress: string | null;
    companyCity: string | null;
    companyState: string | null;
    companyZip: string | null;
    bankAccountNumber: string | null;
    bankName: string | null;
    bankNameAccount: string | null;
    bankRoutingNumber: string | null;
}

declare interface IEditImage {
    editImage: {
        modalOpenClose: boolean;
        image: {
            id: string;
            url: string;
            name: string;
            size: {
                width: number;
                height: number;
                size: number;
            };
        } | null;
        imagesList: [];
    };
}

declare interface ICreateBook {
    CreateBook: {
        tabValue: string;
        oneBlock: boolean;
        howIWork: boolean;
        step2: boolean;
        thisBook: IThisBook;
        bookCreateInfo: {
            name: string;
            description: string;
            size: {
                dimension: string;
                pages: string;
                price: string;
            };
        };
    };
}
declare interface IAlertSite {
    AlertSite: {
        open: {
            status: any;
            go: boolean;
        };
        vertical: string;
        horizontal: string;
        message: string;
    };
}
declare interface IThisBook {
    avatarUrl: string;
    description: string;
    files: [];
    filesURLs: [];
    frontCover: null;
    price: number;
    frontCoverURL: null;
    id: string;
    name: string;
    updatedAt: string;
    userEvent: IEvent;
    userEventId: string;
    isAvailable: boolean;
    userId: string;
}

declare interface IBookInfo {
    avatarUrl: string;
    createdAt: string;
    description: string;
    id: string;
    isAvailable: false;
    name: string;
    price: number;
    size: string;
    sourceId: null;
    status: string;
    type: string;
    updatedAt: string;
    user: UserInfo;
    userEvent: IEvent;
    userEventId: string;
    userId: string;
}

declare interface IOneBook {
    ThisBook: {
        currentBook: ICurrentBook;
        thisAlbums: OneAlbum[];
        tabName: string;
        bookTemplates: IBookTemplate[];
        currentTemplate: IBookTemplate;
        bookPage: IBookPage;
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
            pageID: string;
        };
        updatePages: {
            status: string;
            pageID: string;
            saveNewTemplate: {};
        };
        startSaveAllPages: string;
        openCloseLibraryBlock: boolean;
    };
}
declare interface IText {
    id: string;
    text: string;
    style: string;
    param: {
        x: number;
        y: number;
    };
}

declare interface ICurrentBook {
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
    pages: IBookPage[];
    previewPdf: null | any;
    publisherCoverPdf: null | any;
    publisherCoverPdfURL: null | any;
    publisherPdf: null | any;
    publisherPdfURL: null | any;
    size: string;
    status: string;
    updatedAt: string;
    userEvent: IEvent;
    userEventId: string;
    userId: string;
    user: UserInfo;
}
declare interface IBookTemplate {
    createdAt: string;
    id: string;
    layoutName: string;
    logo: string;
    order: number;
    logoURL: string;
    name: string;
    params: {
        images: {
            items: {};
            style: string;
        };
        template: {
            style: string;
        };
    };
    template: string;
    templateName: string;
    updatedAt: string;
}

declare interface IBookPage {
    bookId: string;
    createdAt: string;
    id: string;
    order: number;
    params: {
        images: {
            items: IBookPageItems[];
            style: string;
        };
        template: {
            style: string;
        };
        style: string;
    };
    preview: string;
    template: IBookTemplate;
    templateId: string;
    updatedAt: string;
    userId: string;
    type: string;
}

declare interface IBookPageItems {
    style: any;
    tag: string;
    texts: IBookPageText[];
}

declare interface IBookPageText {
    content: string;
    style: string;
}

declare interface ILibrary {
    Library: {
        AllFiles: OneAlbum[];
    };
}

declare interface IMyEventPage {
    MyEventPage: {
        modalViewVideo: {
            event: {
                name: string;
                url: string;
            };
            modalShow: boolean;
        };
        modalCreateEvent: boolean;
    };
}
declare interface IGoogleFonts {
    GoogleFonts: {
        AllFonts: IGoogleFontsItem[];
    };
}

declare interface IGoogleFontsItem {
    category: string;
    family: string;
    files: {} | any;
    kind: string;
    lastModified: string;
    subsets: [];
    variants: [];
}
declare interface ISavingData {
    bookId: string | null | undefined;
    pageId: string | null | undefined;
    templateId: string | null | undefined;
    params: {
        template: {
            style: string;
        };
        texts: [];
        images: {
            style: string | null | undefined;
            tag: string | null | undefined;
            texts: {
                style: string | null | undefined;
                content: string | null | undefined;
            }[];
        }[];
    };
}

declare interface IPosters {
    Posters: {
        posterCreateInfo: {
            userEventId: string | null | undefined;
            name: string | null | undefined;
            description: string | null | undefined;
            size: string | null | undefined;
            templateId: string | null | undefined;
            templateName: string | null | undefined;
            isAvailable: boolean;
            params: {
                template: {
                    style: string | null | undefined;
                };
                images: {
                    style: string | null | undefined;
                    items: {
                        tag: string | null | undefined;
                        style: string | null | undefined;
                        texts: [];
                    }[];
                };
            };
        };
        editorPage: {
            imageURL: string;
        };
    };
}

declare interface IPosterInfo {
    avatarUrl: string | null;
    createdAt: string;
    description: string;
    id: string;
    isAvailable: true;
    name: 'Hello';
    params: {};
    previewImageURL: null;
    previewPdfURL: null;
    price: number;
    size: string;
    sourceId: null | string;
    status: string;
    templateId: string;
    type: string;
    updatedAt: string;
    user: UserInfo;
    userEvent: IEvent;
    userEventId: string;
    userId: string;
}

declare interface IPoster {
    createdAt: string;
    description: string | null;
    price: number;
    file: {
        albumFiles: [];
        createdAt: string;
        description: string;
        id: string;
        name: string;
        updatedAt: string;
        userEventId: string;
        userId: string;
    };
    fileURL: string | null;
    id: string;
    jobId: string | null | undefined;
    name: string | null | undefined;
    params: {
        template: {
            style: string | null | undefined;
        };
        images: {
            style: string | null | undefined;
            items: {
                tag: string | null | undefined;
                style: string | null | undefined;
                texts: [];
            }[];
        };
        texts: { content: string; style: string }[];
    };
    preview: string | null | undefined;
    previewPdf: string | null | undefined;
    previewPdfURL: string | null | undefined;
    publisherPDF: string | null | undefined;
    publisherPDFURL: string | null | undefined;
    size: string | null | undefined;
    status: string | null | undefined;
    templateId: string | null | undefined;
    updatedAt: string | null | undefined;
    userEventId: string;
    userId: string | undefined;
    userEvent: IEvent;
    template: PosterTemplate;
    isAvailable: boolean;
}

declare interface IPosterTemplate {
    createdAt: string;
    id: string;
    layoutName: string;
    logo: string;
    logoURL: string;
    name: string;
    params: {
        images: {
            items: {};
            style: string;
        };
        template: {
            style: string;
        };
    };
    template: string;
    templateName: string;
    updatedAt: string;
}

declare interface IDashboard {
    albums: OneAlbum[];
    albumsCount: number;
    earned: number | null;
    events: IEvent[] | null;
    eventsCount: number | null;
    item: {
        avatarURL: string | null;
        createdAt: string | null;
        email: string | null;
        firstName: string | null;
        fullName: string | null;
        id: string | null;
        lastName: string | null;
        publisherProfile: IPublisherProfileTwo;
        updatedAt: string | null;
    };
    items: [];
    ordersCount: number | null;
    pagination: null;
    photosCount: number | null;
}

declare interface IMyDashboard {
    MyDashboard: {
        loading: boolean;
        information: IDashboard;
    };
}

declare interface ISiteCard {
    SiteCard: {
        allCardOrders: number;
        allProducts: [];
    };
}

declare interface IPublisherProfile {
    PublisherProfile: {
        loading: boolean;
        data: {
            albumsCount: number | null;
            collaboratorsCount: number | null;
            eventsCount: number | null;
            photosCount: number | null;
            featuredEvents: IEvent[];
            item: {
                avatarURL: string | null;
                createdAt: string;
                email: string;
                firstName: string;
                fullName: string;
                id: string;
                lastName: string;
                publisherProfile: {
                    avatarURL: string | null;
                    coverURL: string | null;
                    name: string | null;
                    description: string | null;
                    avatar: string | null;
                    cover: string | null;
                    socialNetwork: SocSitesPublisher;
                    sites: [];
                    countryCode: string | null;
                    isCompany: boolean;
                    country: string | null;
                } | null;
                updatedAt: string;
            };
            items: [];
            latestEvents: IEvent[];
        } | null;
    };
}

declare interface SocSitesPublisher {
    facebook: string | null;
    twitter: string | null;
    linkedin: string | null;
    instagram: string | null;
    tiktok: string | null;
}

declare interface IPlans {
    plan: string;
    productId: string;
    prices: {
        priceId: string;
        value: string;
        period: string;
    }[];
    options: {
        digitalDownloads: boolean;
        totalPhotoMegabytes: number;
        servicePercent: number;
        events: {
            limit: number;
            yearly: number;
        };
        books: {
            perEvent: number;
            sizes: string[];
            minPages: number;
            maxPages: number;
            allowCustomPrice: boolean;
        };
        posters: {
            limit: number;
            sizes: string[];
        };
    };
}
