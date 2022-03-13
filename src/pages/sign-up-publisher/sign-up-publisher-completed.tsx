import React from 'react';
import { useHistory } from 'react-router-dom';

//STYLES
import 'assets/css/sign-up-publisher.css';
import { DEF_URL } from 'utils/urls';
import { useSelector } from 'react-redux';

interface IThisProps {
    step: number;
}
export const SignUpPublisherComplated = ({ step }: IThisProps) => {
    const history = useHistory();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const returnToProfile = () => {
        history.push(`${DEF_URL.PUBLISHER_PROFILE}/${userInfo?.id}`);
    };
    return (
        <section
            className="form-section"
            style={{ display: step === 3 ? 'block' : 'none' }}>
            <div className="signup-confirm">
                <h2 className="form-block_title font-medium fs26">
                    Publisher Registration Completed
                </h2>
                <ul>
                    <li className="signup-confirm_txt">
                        <p>
                            You have completed your Publisher Registration on
                            Fanbooks.
                        </p>
                    </li>
                    <li className="signup-confirm_txt">
                        <p>
                            We will check your Business information and we will
                            send you an email confirming your Publisher status.
                            This process could take up to 48 hours.
                        </p>
                    </li>
                    <li className="signup-confirm_txt">
                        <p>
                            Thank you for your time! We can’t wait to see your
                            events and photos published on Fanbooks.
                        </p>
                    </li>
                    <span
                        className="signup-btn icons"
                        onClick={returnToProfile}>
                        Return to Profile
                    </span>
                </ul>
            </div>
        </section>
    );
};
