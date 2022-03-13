import { createSlice } from '@reduxjs/toolkit';
import {
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUser
} from 'amazon-cognito-identity-js';
import {
    getToken,
    history,
    LoginUser,
    setMessageUser,
    REMEMBER_USER_DAYS,
    userIsLogin,
    usersPlansStorage
} from 'utils/helpers';
import { getUserInfo } from 'api/all-apis';
import Cookies from 'js-cookie';
import { AlertSiteTypes, UserLoginTypes } from 'enums/enums';
import { ALL_URL } from 'utils/urls';
import { setOpenCloseModal, setUseType } from './login-reg-user';

interface IState {
    sign: {} | null;
    error: any;
    loading: boolean;
    token: string | null;
    user: {
        isLoggedIn: boolean;
        profile: {} | null;
        token: string | null;
    };
    isLoginTo: string;
    myPlans: {} | null;
    AllPlans: {} | null;
}

const initialState: IState = {
    sign: null,
    error: null,
    token: null,
    loading: false,
    user: {
        isLoggedIn: !!getToken() || false,
        profile: null,
        token: null
    },
    isLoginTo: userIsLogin.normalLogin,
    myPlans: null,
    AllPlans: null
};

const signSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSetAllPlans(state, action) {
            state.AllPlans = action.payload;
        },
        setMyPlans(state, action) {
            state.myPlans = action.payload;
        },
        setUserLoginMethod(state, action) {
            state.isLoginTo = action.payload;
        },
        registerUser(state, action) {
            state.sign = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setUser(state, action) {
            state.user = {
                profile: { ...action.payload.profile },
                isLoggedIn: true,
                token: action.payload.token
            };
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        logOut(state) {
            state.user = {
                isLoggedIn: false,
                token: null,
                profile: null
            };
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('user');
            localStorage.removeItem(usersPlansStorage);
        }
    }
});

export const confirmRegistration =
    ({ username, code }: { username: string; code: string }) =>
    (dispatch: any) => {
        dispatch(signSlice.actions.setLoading(true));
        const CLIENT_ID: any = process.env.REACT_APP_CLIENT_ID;
        const USER_POLL_ID: any = process.env.REACT_APP_POOL_ID;
        const cognitoUserPool = new CognitoUserPool({
            ClientId: CLIENT_ID,
            UserPoolId: USER_POLL_ID
        });
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: cognitoUserPool
        });
        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (result === 'SUCCESS') {
                dispatch(signSlice.actions.registerUser(null));
                history.push('#sign-in');
                dispatch(signSlice.actions.setLoading(false));
                dispatch(signSlice.actions.setError(null));
            }
            if (err) {
                dispatch(setMessageUser([err.message, AlertSiteTypes.error]));
                dispatch(signSlice.actions.setLoading(false));
                dispatch(signSlice.actions.setError(err));
            }
        });
    };

export const login =
    ({
        username,
        pass,
        isLogin
    }: {
        username: string;
        pass: string;
        isLogin: string;
    }) =>
    (dispatch: any) => {
        dispatch(signSlice.actions.setLoading(true));
        const CLIENT_ID: any = process.env.REACT_APP_CLIENT_ID;
        const CLIENT_POOL_ID: any = process.env.REACT_APP_POOL_ID;

        const cognitoUserPool = new CognitoUserPool({
            ClientId: CLIENT_ID,
            UserPoolId: CLIENT_POOL_ID
        });
        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: pass
        });
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: cognitoUserPool
        });

        cognitoUser.authenticateUser(authenticationDetails, {
            onFailure: (err) => {
                dispatch(setMessageUser([err?.message, AlertSiteTypes.error]));
                dispatch(signSlice.actions.setError(err));
                dispatch(signSlice.actions.setLoading(false));
            },

            onSuccess: (r: any) => {
                const access_token = r.getAccessToken().jwtToken;
                const id_token = r.getIdToken().jwtToken;
                const refresh_token = r.refreshToken.token;

                Cookies.set('access_token', access_token, {
                    expires: REMEMBER_USER_DAYS,
                    path: '/'
                });

                Cookies.set('id_token', id_token, {
                    expires: REMEMBER_USER_DAYS,
                    path: '/'
                });

                Cookies.set('refresh_token', refresh_token, {
                    expires: REMEMBER_USER_DAYS,
                    path: '/'
                });

                dispatch(
                    signSlice.actions.setUser({
                        token: r.getAccessToken().jwtToken
                    })
                );

                getUserInfo(access_token)
                    .then(function (response) {
                        const profile = response.data.data.item;
                        localStorage.setItem('user', JSON.stringify(profile));
                        localStorage.setItem('loggedIn', LoginUser.toSite);

                        dispatch(signSlice.actions.setLoading(false));
                        dispatch(signSlice.actions.setError(null));

                        isLogin === userIsLogin.becomePublisher &&
                            history.push(ALL_URL.PUBLISHER);
                        dispatch(
                            signSlice.actions.setUser({
                                profile: { ...profile }
                            })
                        );

                        dispatch(setUserLoginMethod(userIsLogin.normalLogin));
                        dispatch(setOpenCloseModal(false));
                        dispatch(setUseType(UserLoginTypes.signIn));
                    })
                    .catch(function (error) {
                        dispatch(signSlice.actions.setError(error));
                    });
            }
        });
    };

export const {
    setUser,
    logOut,
    setError,
    setLoading,
    registerUser,
    setUserLoginMethod,
    setMyPlans,
    setSetAllPlans
} = signSlice.actions;

export default signSlice.reducer;
