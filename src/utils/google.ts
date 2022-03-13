export const MAP_PATH = 'https://www.google.com/maps/place';

export const GOOGLE_API_KEY_MAP = 'AIzaSyDBSJqFQXANaJ1sMvks43HAXv84a8aCyhY';

export const getGoogleAuthURL = () => {
    const url = process.env.REACT_APP_GOOGLE_AUTH_URL_TEST;
    const response_type = 'token';
    const client_id = process.env.REACT_APP_CLIENT_ID;
    const state = 'STATE';
    const scope = 'openid';
    const redirect = process.env.REACT_APP_GOOGLE_REDIRECT_URL;
    const identity_provider = 'Google';
    return `${url}?response_type=${response_type}&client_id=${client_id}&state=${state}&scope=${scope}&redirect_uri=${redirect}&identity_provider=${identity_provider}`;
};
export const googleMapView = (placeID: string) => {
    const ID = placeID ? placeID : 'ChIJx7pz54RWFUARIy2C63p1tNA';
    return `https://www.google.com/maps/embed/v1/place?q=place_id:${ID}&key=${GOOGLE_API_KEY_MAP}`;
};

export const googleFontUrl = `https://www.googleapis.com/webfonts/v1/webfonts?sort=POPULARITY&key=${GOOGLE_API_KEY_MAP}`;
