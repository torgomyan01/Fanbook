import { AlertSiteTypes } from '../enums/enums';

export const UM = {
    P_W: ['Please Wait', AlertSiteTypes.info],
    THANK_REG: [
        'Thank you, you have successfully registered',
        AlertSiteTypes.success
    ],
    NO_PAGE: ['There is no such page', AlertSiteTypes.warning],
    EVENT_EDITED: ['Event edited', AlertSiteTypes.success],
    PL_CH_V_PH: ['Please choose a video or picture', AlertSiteTypes.warning],
    I_U: ['Images Uploaded', AlertSiteTypes.success],
    DELETED: ['Deleted', AlertSiteTypes.success],
    NO_VER_CODE: [
        'Please fill in the verification code',
        AlertSiteTypes.warning
    ],
    BOOK_STATUS_EDITED: ['Book Status Edited', AlertSiteTypes.success],
    ALBUM_DELETED: ['Album Deleted', AlertSiteTypes.success],
    TREE_AGAIN: ['Please try again', AlertSiteTypes.warning],
    PROFILE_EDITED: ['Your Profile Information Edited', AlertSiteTypes.success],
    EVENT_DESC_LIMIT: (minLengthDescription: number) => [
        `Description characters should not be less than ${minLengthDescription}`,
        AlertSiteTypes.warning
    ],
    FILL_NAME_BOOK: ['Please fill in name book', AlertSiteTypes.error],
    FILL_BOOK_DESC: ['Please fill in description book', AlertSiteTypes.error],
    BOOK_NAME_MIN_LENGTH: (num: number) => [
        `The name of the book should not be less than ${num} characters`,
        AlertSiteTypes.warning
    ],
    BUY_PROD_NO_REG: [
        'Please log in to your page or register to purchase the product',
        AlertSiteTypes.warning
    ],
    NO_BOY_OWN: [
        'You can not buy it because you own this product',
        AlertSiteTypes.error
    ],
    PROD_ADDED_CARD: [
        'Thank you, your product has been successfully added to the cart',
        AlertSiteTypes.success
    ],
    UPLOADED: (percent: number | string) => [
        `Uploaded ${percent}%`,
        AlertSiteTypes.success
    ],
    THANK_FOR_REG: [
        'Thank you for registering successfully',
        AlertSiteTypes.success
    ],
    PASS_CHANGES: [
        'Your password has changed successfully',
        AlertSiteTypes.success
    ],
    MIN_LENGTH_IMAGES: (size: number) => [
        `Image width should not be less than ${size} px`,
        AlertSiteTypes.warning
    ],
    FILL_ALL: ['Please fill in all the fields', AlertSiteTypes.warning],
    PASS_NUM: [
        'Password must contain at least one numeric character.',
        AlertSiteTypes.warning
    ],
    POSTER_EDITED: ['Poster Status Edited', AlertSiteTypes.success],
    SELECT_IMAGES: ['Please select a picture', AlertSiteTypes.warning],
    EVENT_STATUS_EDITED: ['Event Status Edited', AlertSiteTypes.success],
    ALBUM_STATUS_EDITED: ['Album Status Edited', AlertSiteTypes.success],
    BOOK_DELETED: ['Book Deleted', AlertSiteTypes.success],
    PASS_ONE_CHARACTER: [
        'Password must contain at least one numeric character.',
        AlertSiteTypes.warning
    ],
    PASS_MIN_LENGTH: (min: number) => [
        `Password must be at least ${min} characters long.`,
        AlertSiteTypes.warning
    ],
    REG_EMAIL_ADDRESS: [
        'Please enter a valid email address',
        AlertSiteTypes.warning
    ],
    NEW_PASS_MATCH: [
        'New password and repeat password do not match',
        AlertSiteTypes.warning
    ],
    BOOK_EDITED: ['Book Edited', AlertSiteTypes.success],
    PASSWORD_CHANGES: ['Password Changes', AlertSiteTypes.success],
    SEARCH_ERROR: [
        'To view the search results, please fill in the field',
        AlertSiteTypes.error
    ],
    EVENT_DELETED: ['Event Deleted', AlertSiteTypes.success],
    REG_CONFIRM: [
        'Please indicate the agreement button',
        AlertSiteTypes.success
    ],
    POSTER_DELETED: ['Poster Deleted', AlertSiteTypes.success],
    MIN_FONT_SIZE_POSTER: (min: number) => [
        `Font Size is should not be less than ${min}`,
        AlertSiteTypes.warning
    ],
    MAX_FONT_SIZE_POSTER: (max: number) => [
        `Font size should not exceed ${max}`,
        AlertSiteTypes.warning
    ],
    FOR_RATING: ['Thank you for your rating', AlertSiteTypes.success],
    THANK_TRUSTING: ['Thank you for trusting us', AlertSiteTypes.success],
    CONFIRM_NEXT: [
        'To continue the process, please confirm the agreement',
        AlertSiteTypes.warning
    ],
    EDIT_DESC: [
        'You can not save the description unless you change it',
        AlertSiteTypes.warning
    ],
    FILL_DESC_BOOK: ['Please fill in description book', AlertSiteTypes.warning],
    FILL_BOOK_SIZE: ['Please fill in size book', AlertSiteTypes.warning],
    FILL_POSTER_NAME: ['Please fill in name poster', AlertSiteTypes.warning],
    FILL_POSTER_DESC: [
        'Please fill in description poster',
        AlertSiteTypes.warning
    ],
    POSTER_NAME_MIN_LENGTH: (min: number) => [
        `The name of the poster should not be less than ${min} characters`,
        AlertSiteTypes.warning
    ],
    POSTER_SAVING: ['Poster Saving', AlertSiteTypes.success],
    CHANGES_SAVED: ['Changes Saved', AlertSiteTypes.success],
    ADD_BOOK_PAGES: [
        'Please indicate the page next to which you would like to add a new page',
        AlertSiteTypes.warning
    ],
    PAGE_CREATED: ['Page Created', AlertSiteTypes.success],
    NO_PAGE_BOOK: ['There is no such page', AlertSiteTypes.warning],
    THANK_FOR_TRUSTING: ['Thank you for trusting us', AlertSiteTypes.success],
    PAGE_MOVED: ['Page Moved', AlertSiteTypes.success],
    WAIT_VIDEO_UPLOAD: [
        'Please wait while the video starts uploading',
        AlertSiteTypes.warning
    ],
    MIN_SITES_PUBLISHER: ['You can add up to 5 sites', AlertSiteTypes.warning],
    IMAGE_OR_VIDEO: [
        'Be sure to select a video file or picture',
        AlertSiteTypes.warning
    ],
    FIELDS_CORRECTLY: [
        'Please fill in the fields correctly',
        AlertSiteTypes.error
    ],
    PLAN_CANCELED: ['Your Plan Canceled', AlertSiteTypes.error],
    SELECT_CARD: ['Please select a card system', AlertSiteTypes.warning],
    SELECT_SHIPPING: [
        'Please select a shipping address',
        AlertSiteTypes.warning
    ],
    FILL_USERNAME: ['Fill in @username', AlertSiteTypes.warning],
    COMPANY_ERROR: [
        'If you are presenting as a company, you must fill in all the fields',
        AlertSiteTypes.error
    ],
    CHANGE_BANK_DETAILS: [
        'Thank you Your change was saved',
        AlertSiteTypes.success
    ],
    PASS_NOT_MATCH: ['Passwords do not match', AlertSiteTypes.error],
    COPIED: ['Copied', AlertSiteTypes.success]
};
