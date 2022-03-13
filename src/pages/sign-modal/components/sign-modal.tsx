import React from 'react';
import { Link } from 'react-router-dom';

import 'assets/css/sign-modal.css';
import Logo from 'assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setUserLoginMethod } from 'redux/auth.slice';
import { userIsLogin } from 'utils/helpers';
import { Modal } from 'react-bootstrap';
import { setOpenCloseModal, setUseType } from 'redux/login-reg-user';
import SignIn from '../sign-in.modal';
import SignUp from '../sign-up.modal';
import ForgotPassword from '../forgot-password';
import { UserLoginTypes } from 'enums/enums';

const SignModal = () => {
    const dispatch = useDispatch();

    const thisModal = useSelector(
        (state: ILoginRegUser) => state.regLogin.openCloseModal
    );
    const modalType = useSelector(
        (state: ILoginRegUser) => state.regLogin.type
    );

    function closeThisModal() {
        dispatch(setUserLoginMethod(userIsLogin.normalLogin));
        dispatch(setOpenCloseModal(false));
        dispatch(setUseType(UserLoginTypes.signIn));
        dispatch(setError(null));
    }

    function useModalBody(type: string) {
        switch (type) {
            case UserLoginTypes.signIn:
                return <SignIn />;
            case UserLoginTypes.signUp:
                return <SignUp />;
            case UserLoginTypes.forgotPassword:
                return <ForgotPassword />;
        }
    }

    return (
        <Modal
            size="lg"
            show={thisModal}
            id="signUpModal"
            className="modal-bg-blur-effect">
            <Modal.Body>
                <div className="modal-body d-flex">
                    <div className="modal-left">
                        <Link to="/" className="logo d-inline-block">
                            <img src={Logo} alt="logo" />
                        </Link>
                        <h2 className="modal-left_title c-white">
                            Made for Fans
                        </h2>
                        <p className="modal-left_txt">
                            The only solution that offers organizations
                            collaborative, on-demand keepsake books that fans
                            can personalize.
                        </p>
                    </div>
                    <div className="modal-right">
                        <span
                            onClick={closeThisModal}
                            className="close c-black cursor-pointer">
                            <i className="fas fa-times" />
                        </span>
                        {useModalBody(modalType)}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SignModal;
