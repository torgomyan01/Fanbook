import React from 'react';
import { Link } from 'react-router-dom';
import 'assets/css/sign-up-publisher.css';
import blackLogo from 'assets/images/black-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import randomBackground, { userAvatarName } from 'utils/helpers';
import { makeStyles, Step, StepLabel, Stepper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    button: {
        marginRight: theme.spacing(1)
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

const steps = ['Personal Details', 'Bank Details'];

export const SignUpPublisherHeader = () => {
    const classes = useStyles();

    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const step = useSelector(
        (state: IEditPublisherInfo) => state.EditPublisherInfo.step
    );

    const avatar = userInfo
        ? userInfo.avatarURL
            ? `url(${userInfo?.avatarURL})`
            : randomBackground()
        : '';

    return (
        <header>
            <div className="header-top">
                <div className="container-fluid">
                    <div className="row d-flex align-items-center justify-content-around">
                        <div className="col-2 my-col mb-0">
                            <h1 className="navbar-brand mb-0">
                                <Link
                                    to="/"
                                    className=" d-inline-block"
                                    title="fanbook">
                                    <img src={blackLogo} alt="logo" />
                                </Link>
                            </h1>
                        </div>
                        <div className="col-7 my-col mb-0">
                            <div className="pl-3 pr-3">
                                <div className={classes.root}>
                                    <Stepper activeStep={step}>
                                        {steps.map((label: any) => {
                                            const stepProps: any = {};
                                            const labelProps: any = {};
                                            return (
                                                <Step
                                                    key={label}
                                                    {...stepProps}>
                                                    <StepLabel {...labelProps}>
                                                        {label}
                                                    </StepLabel>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                </div>
                            </div>
                        </div>
                        <div className="col-2 my-col mb-0">
                            <nav className="navbar navbar-expand-lg navbar-dark ">
                                <div className="mw-255">
                                    <ul className="d-flex mb-0">
                                        <li>
                                            <div
                                                className="user-icon"
                                                style={{
                                                    background: avatar
                                                }}>
                                                {userAvatarName(userInfo)}
                                            </div>
                                        </li>
                                        <li className="d-flex flex-column ">
                                            <h3 className="user-name">
                                                {userInfo && userInfo.firstName}
                                            </h3>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
