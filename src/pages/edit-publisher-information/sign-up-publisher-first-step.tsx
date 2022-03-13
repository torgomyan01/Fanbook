import React, { useEffect, useState } from 'react';

//STYLES
import 'assets/css/sign-up-publisher.css';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, TextField } from '@material-ui/core';
import { history, setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';
import {
    setEditPublisherInformation,
    setStepEditInfo
} from 'redux/edit-pablisher-information';
import { UpdatePublisherInformation } from 'api/all-apis';
import { Spinner } from 'react-bootstrap';
import { DEF_URL } from 'utils/urls';
import { setUser } from 'redux/auth.slice';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
        marginTop: 20
    },
    inputs: {
        width: '100%',
        marginTop: 20
    },
    title: {
        margin: theme.spacing(4, 0, 2)
    },
    lists: {
        paddingLeft: 0
    }
}));

interface IThisProps {
    step: number;
}

export const SignUpPublisherFirstStep = ({ step }: IThisProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const publisherInfo = useSelector(
        (state: IEditPublisherInfo) => state.EditPublisherInfo.publisherProfile
    );

    const [nameOfAccount, setNameOfAccount] = useState('');

    function SNameOfAccount(e: any) {
        setNameOfAccount(e.target.value);
    }
    const [accountNumber, setAccountNumber] = useState('');

    function SAccountNumber(e: any) {
        setAccountNumber(e.target.value);
    }
    const [routingNumber, setRoutingNumber] = useState('');

    function SRoutingNumber(e: any) {
        setRoutingNumber(e.target.value);
    }
    const [nameOfBank, setNameOfBank] = useState('');

    function SNameOfBank(e: any) {
        setNameOfBank(e.target.value);
    }

    const [loading, setLoading] = useState<boolean>(false);
    function nextStep(e: any) {
        e.preventDefault();

        if (
            nameOfAccount === '' ||
            accountNumber === '' ||
            routingNumber === '' ||
            nameOfBank === ''
        ) {
            dispatch(setMessageUser(UM.FILL_ALL));
            return;
        }

        const dataForAccount = {
            ...publisherInfo,
            bankNameAccount: nameOfAccount,
            bankAccountNumber: accountNumber,
            bankRoutingNumber: routingNumber,
            bankName: nameOfBank,
            termsAndConditions: true
        };

        dispatch(setEditPublisherInformation(dataForAccount));
        setLoading(true);

        UpdatePublisherInformation({
            publisherProfile: { ...dataForAccount }
        })
            .then((res) => {
                const profile: UserInfo = res.data.data.item;
                localStorage.setItem('user', JSON.stringify(profile));
                dispatch(
                    setUser({
                        profile: { ...profile }
                    })
                );
                dispatch(setMessageUser(UM.PROFILE_EDITED));
                setLoading(false);
                setTimeout(
                    () =>
                        history.push(
                            `${DEF_URL.PUBLISHER_PROFILE}/${profile.id}`
                        ),
                    2000
                );
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    function prevStep() {
        dispatch(setStepEditInfo(0));
    }

    useEffect(() => {
        setNameOfAccount(userInfo?.publisherProfile?.bankNameAccount || '');
        setAccountNumber(userInfo?.publisherProfile?.bankAccountNumber || '');
        setNameOfBank(userInfo?.publisherProfile?.bankName || '');
        setRoutingNumber(userInfo?.publisherProfile?.bankRoutingNumber || '');
    }, [userInfo]);

    return (
        <section
            className="form-section"
            style={{ display: step === 1 ? 'block' : 'none' }}>
            <div className="container mb-3">
                <div className="c-red cursor-pointer" onClick={prevStep}>
                    <i className="fas fa-arrow-left mr-2" />
                    Prev
                </div>
            </div>
            <form action="#" className="form-block" onSubmit={nextStep}>
                <h2 className="fs24 font-bold">Bank Details</h2>
                <div className="add-method-box">
                    <TextField
                        className={classes.inputs}
                        id="NameOnAccount"
                        value={nameOfAccount}
                        label="Name on Account"
                        onChange={SNameOfAccount}
                        required={true}
                    />

                    <TextField
                        className={classes.inputs}
                        id="AccountNumber"
                        label="Account Number"
                        type="text"
                        value={accountNumber}
                        onChange={SAccountNumber}
                        required={true}
                    />

                    <TextField
                        className={classes.inputs}
                        id="RoutingNumber"
                        label="Routing Number"
                        value={routingNumber}
                        onChange={SRoutingNumber}
                        required={true}
                    />

                    <TextField
                        className={classes.inputs}
                        id="NameOfBank"
                        label="Name of Bank"
                        value={nameOfBank}
                        onChange={SNameOfBank}
                        required={true}
                    />
                </div>
                <button type="submit" className="signup-btn mt-5">
                    Save
                    {loading && (
                        <Spinner
                            animation="border"
                            variant="light"
                            className="ml-2"
                        />
                    )}
                </button>
            </form>
        </section>
    );
};
