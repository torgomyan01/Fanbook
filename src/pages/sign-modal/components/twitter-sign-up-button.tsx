// import { config } from 'config';
import React from 'react';
import TwitterLogin from 'react-twitter-login';

class TwitterSignUpButton extends React.Component {
    state = {
        disabled: false
    };

    // authTwitterHandler(error, authData) {
    //     // const url = config.host + config.urls.api.socials.twitter;
    //     this.setState({ disabled: true });
    // }

    render() {
        // TODO: move it to config
        // const hostedDomain = config.host;
        // const redirectUri = `${hostedDomain}sign-up`;
        return (
            <span className="gray-btn-fb twitter mr-2">
                <i className="fab fa-twitter fs20" />
            </span>
            // <TwitterLogin
            //     authCallback={(error, authData) =>
            //         {
            //             this.authTwitterHandler(error, authData)
            //         }
            //     }
            //     consumerKey={''}
            //     consumerSecret={''}
            //     callbackUrl={''}
            //     buttonTheme="dark_short"
            //     className={this.state.disabled ? 'disabled' : ''}
            // />
        );
    }
}

export default TwitterSignUpButton;
