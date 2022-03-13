import {
    CognitoRefreshToken,
    CognitoUser,
    CognitoUserPool
} from 'amazon-cognito-identity-js';
import { checkAccessTokenIsValid, getUsernameFromToken } from 'utils/helpers';
import axios from 'axios';
import Cookies from 'js-cookie';

const CLIENT_ID: any = process.env.REACT_APP_CLIENT_ID;
const USER_POL_ID: any = process.env.REACT_APP_POOL_ID;

async function CheckTokenExpiration(callBack: any) {
    const refresh_token = Cookies.get('refresh_token');

    if (refresh_token) {
        const refreshToken: any = new CognitoRefreshToken({
            RefreshToken: refresh_token
        });
        if (!checkAccessTokenIsValid()) {
            const cognitoUserPool: CognitoUserPool = new CognitoUserPool({
                ClientId: CLIENT_ID,
                UserPoolId: USER_POL_ID
            });

            const cognitoUser = new CognitoUser({
                Username: getUsernameFromToken(),
                Pool: cognitoUserPool
            });
            cognitoUser.refreshSession(
                refreshToken,
                async (err, session: any) => {
                    if (err) {
                        throw err;
                    }
                    const access_token = await session.getAccessToken()
                        .jwtToken;
                    const id_token = await session.getIdToken().jwtToken;
                    const refreshToken = await session.getRefreshToken().token;

                    axios.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${access_token}`;

                    Cookies.set('access_token', access_token, {
                        expires: 1,
                        path: '/'
                    });
                    Cookies.set('id_token', id_token, {
                        expires: 1,
                        path: '/'
                    });
                    Cookies.set('refresh_token', refreshToken, {
                        expires: 1,
                        path: '/'
                    });
                    callBack(access_token);
                    console.log('Token Edited');
                }
            );
        } else {
            callBack('');
            console.log('Token No Edited');
        }
    }
}

export default CheckTokenExpiration;
