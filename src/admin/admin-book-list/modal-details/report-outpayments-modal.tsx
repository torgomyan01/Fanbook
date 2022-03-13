import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
    Avatar,
    CircularProgress,
    InputAdornment,
    TextField,
    Tooltip
} from '@material-ui/core';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { GetUserAdmin } from 'api/all-apis';

interface IThisProps {
    modal: {
        openClose: boolean;
        trans: ITransaction | null;
    };
    close: () => void;
}

function MoreDetailsReportOutPayments({ modal, close }: IThisProps) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<UserInfoAdmin | null>(null);

    useEffect(() => {
        if (modal.trans?.sourceUserId) {
            setLoading(true);
            GetUserAdmin(modal.trans.sourceUserId)
                .then((res) => {
                    setUser(res.data.data.item);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [modal]);

    function closeModal() {
        close();
    }

    function printCopyIcon(title: string, value: string | null | undefined) {
        return (
            <CopyToClipboard
                text={value || ''}
                onCopy={() => dispatch(setMessageUser(UM.COPIED))}>
                <Tooltip title={`Copy ${title}`} placement="top">
                    <i className="fas fa-copy c-red cursor-pointer ml-2" />
                </Tooltip>
            </CopyToClipboard>
        );
    }
    return (
        <>
            <Modal
                size="xl"
                style={{ zIndex: 1000 }}
                show={modal.openClose}
                onHide={closeModal}
                className="book-details-modal modal-bg-blur-effect">
                <Modal.Body>
                    <div className="modal-body p-0">
                        <div className="left-part">
                            <div className="left-part_inner h-100">
                                <h2 className="modal-title">
                                    Publisher{"'"}s Info
                                </h2>
                                {loading ? (
                                    <div className="d-flex justify-content-center align-items-center mt-5">
                                        <CircularProgress
                                            style={{ color: '#000' }}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div className="d-flex justify-content-start align-items-start">
                                            <Avatar
                                                alt={user?.firstName}
                                                src={
                                                    user?.avatarURL || undefined
                                                }
                                                style={{
                                                    width: 150,
                                                    height: 150,
                                                    fontSize: 30
                                                }}
                                                className="mr-3">
                                                {!user?.avatarURL &&
                                                    `${user?.firstName.charAt(
                                                        0
                                                    )}${user?.lastName.charAt(
                                                        0
                                                    )}`}
                                            </Avatar>
                                            <div>
                                                <div>
                                                    <TextField
                                                        label="User Name"
                                                        disabled={true}
                                                        value={`${user?.firstName} ${user?.lastName}`}
                                                        className="mr-2"
                                                    />
                                                    <TextField
                                                        label="User Email"
                                                        disabled={true}
                                                        value={user?.email}
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <TextField
                                                        label="User's Balance"
                                                        disabled={true}
                                                        value={`$${user?.balance}`}
                                                        className="mr-2"
                                                    />
                                                    <TextField
                                                        label="Outpayment"
                                                        disabled={true}
                                                        value={`$${modal.trans?.total}`}
                                                        className="mr-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <h2 className="modal-title mt-5">
                                            Publisher Bank Details
                                        </h2>
                                        <div className="d-flex justify-content-start align-items-start">
                                            <TextField
                                                label="Bank Name"
                                                disabled={true}
                                                className="mr-2"
                                                value={
                                                    user?.publisherProfile
                                                        ?.bankName
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            {printCopyIcon(
                                                                'Bank Name',
                                                                user
                                                                    ?.publisherProfile
                                                                    ?.bankName
                                                            )}
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <TextField
                                                label="Bank Account Number"
                                                disabled={true}
                                                value={
                                                    user?.publisherProfile
                                                        ?.bankAccountNumber
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            {printCopyIcon(
                                                                'Bank Account Number',
                                                                user
                                                                    ?.publisherProfile
                                                                    ?.bankAccountNumber
                                                            )}
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-start align-items-start mt-3">
                                            <TextField
                                                label="Bank Name Account"
                                                disabled={true}
                                                value={
                                                    user?.publisherProfile
                                                        ?.bankNameAccount
                                                }
                                                className="mr-2"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            {printCopyIcon(
                                                                'Bank Name Account',
                                                                user
                                                                    ?.publisherProfile
                                                                    ?.bankNameAccount
                                                            )}
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <TextField
                                                label="Bank Routing Number"
                                                disabled={true}
                                                value={
                                                    user?.publisherProfile
                                                        ?.bankRoutingNumber
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            {printCopyIcon(
                                                                'Bank Routing Number',
                                                                user
                                                                    ?.publisherProfile
                                                                    ?.bankRoutingNumber
                                                            )}
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="right-part">
                            <span className="close-icon" onClick={closeModal}>
                                <i className="fas fa-times" />
                            </span>

                            <div className="d-flex flex-column justify-content-between h-100">
                                <div>
                                    {/*<h2 className="modal-title">Actions</h2>*/}
                                    {/*<button*/}
                                    {/*    className="checkout-btn btn dred mw-100 mb-2 btn-modal-admin-book-list"*/}
                                    {/*    disabled={loading}*/}
                                    {/*    onClick={createTransaction}>*/}
                                    {/*    {loadingCreateTransaction && (*/}
                                    {/*        <Spinner*/}
                                    {/*            animation="border"*/}
                                    {/*            variant="light"*/}
                                    {/*            className="mr-2"*/}
                                    {/*        />*/}
                                    {/*    )}*/}
                                    {/*    Create Out-Payment*/}
                                    {/*</button>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MoreDetailsReportOutPayments;
