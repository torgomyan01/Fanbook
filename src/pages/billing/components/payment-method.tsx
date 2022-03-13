import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenCreateBilling } from 'redux/modals';
import {
    goToHome,
    isUserLogin,
    LoginUser,
    setMessageUser,
    userIsPublisher
} from 'utils/helpers';
import { TextField } from '@material-ui/core';
import { UpdatePublisherInformation } from 'api/all-apis';
import { Spinner } from 'react-bootstrap';
import { setUser } from 'redux/auth.slice';
import { UM } from 'utils/user-messages';

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const openModalBilling = () => {
        dispatch(setOpenCreateBilling(true));
    };

    const [bankName, setBankName] = useState<string | null>('');
    const [bankAccountName, setBankAccountName] = useState<string | null>('');
    const [BankAccountNumber, setBankAccountNumber] = useState<string | null>(
        ''
    );
    const [BankRoutingNumber, setBankRoutingNumber] = useState<string | null>(
        ''
    );

    const [inputDisable, setInputDisable] = useState<boolean>(true);

    useEffect(() => {
        setBankName(userInfo?.publisherProfile?.bankName || '');
        setBankAccountName(userInfo?.publisherProfile?.bankNameAccount || '');
        setBankAccountNumber(
            userInfo?.publisherProfile?.bankAccountNumber || ''
        );
        setBankRoutingNumber(
            userInfo?.publisherProfile?.bankRoutingNumber || ''
        );
    }, [userInfo]);

    const [saveLoading, setSaveLoading] = useState(false);
    function saveChanges() {
        setSaveLoading(true);
        dispatch(setMessageUser(UM.P_W));
        UpdatePublisherInformation({
            publisherProfile: {
                bankAccountNumber: BankAccountNumber,
                bankName,
                bankNameAccount: bankAccountName,
                bankRoutingNumber: BankRoutingNumber
            }
        })
            .then((res) => {
                const profile = res.data.data.item;
                localStorage.setItem('user', JSON.stringify(profile));
                localStorage.setItem('loggedIn', LoginUser.toSite);

                dispatch(
                    setUser({
                        profile: { ...profile }
                    })
                );

                setSaveLoading(false);
                setInputDisable(true);
                dispatch(setMessageUser(UM.CHANGE_BANK_DETAILS));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const openPage =
        isUserLogin((ULog: boolean) => {
            !ULog && goToHome();
        }) &&
        userIsPublisher((_P: boolean) => {
            !_P && goToHome();
        });

    return (
        <>
            {openPage && (
                <Fragment>
                    <h3 className="billing-pretitle font-bold mt-5">
                        Out-Payment Methods
                    </h3>
                    <div className="accordion" id="myAccordion">
                        <div className="d-flex mt-4">
                            <TextField
                                label="Bank Name"
                                value={bankName}
                                className="mr-3"
                                onChange={(e: any) =>
                                    setBankName(e.target.value)
                                }
                                disabled={inputDisable}
                                style={{ width: 300 }}
                            />
                            <TextField
                                label="Bank Account Name"
                                value={bankAccountName}
                                onChange={(e: any) =>
                                    setBankAccountName(e.target.value)
                                }
                                disabled={inputDisable}
                                style={{ width: 300 }}
                            />
                        </div>
                        <div className="d-flex mt-3 mb-4">
                            <TextField
                                label="Bank Account Number"
                                value={BankAccountNumber}
                                onChange={(e: any) =>
                                    setBankAccountNumber(e.target.value)
                                }
                                disabled={inputDisable}
                                className="mr-3"
                                style={{ width: 300 }}
                            />
                            <TextField
                                label="Bank Routing Number"
                                value={BankRoutingNumber}
                                onChange={(e: any) =>
                                    setBankRoutingNumber(e.target.value)
                                }
                                disabled={inputDisable}
                                style={{ width: 300 }}
                            />
                        </div>
                        <div className="d-flex justify-content-start">
                            {inputDisable ? (
                                <button
                                    className="btn bgc-red c-white"
                                    onClick={() => setInputDisable(false)}>
                                    <i className="fas fa-user-edit mr-2" />
                                    Change Bank Details
                                </button>
                            ) : (
                                <button
                                    className="btn bgc-red c-white"
                                    onClick={saveChanges}>
                                    {saveLoading ? (
                                        <Spinner
                                            animation="border"
                                            variant="light"
                                            className="mr-2"
                                        />
                                    ) : (
                                        <i className="fas fa-save mr-2" />
                                    )}
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </>
    );
};

export default PaymentMethod;
