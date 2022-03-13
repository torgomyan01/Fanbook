import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    FormControlLabel,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField
} from '@material-ui/core';
import st from 'assets/css/upgrade.module.css';
import { modalUpgradeUser } from 'redux/modals';
import { history, keyGenerator, setMessageUser } from 'utils/helpers';
import MaskedInput from 'react-text-mask';
import { ChangePlanUser, CreatePaymentsMethods } from 'api/all-apis';
import { UM } from 'utils/user-messages';
import moment from 'moment';
import { AxiosResponse } from 'axios';
import { setUser } from 'redux/auth.slice';
import { ALL_URL } from 'utils/urls';

const cardNumberMask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/
];

function UpgradeModal() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const thisModal = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.modalUpgrade
    );

    const AllPlans = useSelector((state: IAuth) => state.sign.AllPlans);

    console.log(AllPlans);
    const [period, setPeriod] = useState<
        | {
              priceId: string;
              value: string;
              period: string;
          }
        | undefined
    >();

    useEffect(() => {
        if (thisModal.plan) {
            const Monthly = thisModal.plan.prices.find(
                (price) => price.period === 'monthly'
            );
            setPeriod(Monthly);
        }
    }, [thisModal]);

    function closeModal() {
        dispatch(
            modalUpgradeUser({
                openClose: false,
                plan: null
            })
        );
    }

    const cardMask = (props: any) => {
        const { inputRef, ...other } = props;
        return (
            <MaskedInput
                {...other}
                ref={(ref: any) => {
                    inputRef(ref ? ref.inputElement : null);
                }}
                mask={cardNumberMask}
                placeholderChar={'X'}
                placeholder="1234 1234 1234 1234"
            />
        );
    };

    const ExpMask = (props: any) => {
        const { inputRef, ...other } = props;
        return (
            <MaskedInput
                {...other}
                ref={(ref: any) => {
                    inputRef(ref ? ref.inputElement : null);
                }}
                mask={[/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                placeholderChar={'\u2000'}
                placeholder="MM/YYYY"
            />
        );
    };

    const CvvMask = (props: any) => {
        const { inputRef, ...other } = props;
        return (
            <MaskedInput
                {...other}
                ref={(ref: any) => {
                    inputRef(ref ? ref.inputElement : null);
                }}
                mask={[/\d/, /\d/, /\d/]}
                placeholderChar={'\u2000'}
                placeholder="123"
            />
        );
    };

    const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
    const [thanksModal, setThanksModal] = useState<boolean>(false);

    function goUpgrade(e: React.FormEvent<HTMLFormElement> | any) {
        e.preventDefault();
        const name = e.target?.name.value;
        const cardNumber = e.target?.cardNumber.value;
        const expDate = e.target?.expDate.value;
        const cvv = e.target?.cvv.value;

        if (name === '' || cardNumber === '' || expDate === '' || cvv === '') {
            dispatch(setMessageUser(UM.FILL_ALL));
            return;
        }
        const exp = expDate.split('/');
        const expMonth = Number(exp[0] || 0);
        const expYear = Number(exp[1] || 0);
        if (expMonth > 12) {
            dispatch(setMessageUser(UM.FIELDS_CORRECTLY));
            return;
        }
        if (
            expYear < Number(moment().format('YYYY')) - 1 ||
            expYear > Number(moment().format('YYYY')) + 20
        ) {
            dispatch(setMessageUser(UM.FIELDS_CORRECTLY));
            return;
        }
        const data = {
            type: 'card',
            billingDetails: {
                name
            },
            card: {
                number: cardNumber.replace(/ /g, ''),
                expMonth,
                expYear,
                cvc: cvv
            }
        };

        setLoadingAdd(true);
        dispatch(setMessageUser(UM.P_W));
        CreatePaymentsMethods(data)
            .then((res) => {
                console.log(res);
                startChange(res);
            })
            .catch((err) => {
                console.log(err);
                setLoadingAdd(false);
            });
    }

    function startChange(res: AxiosResponse) {
        const paymentMethod: IPaymentsMethods = res.data.data.item;
        if (period) {
            ChangePlanUser({
                paymentMethodStripeId: paymentMethod.id,
                priceId: period.priceId
            })
                .then(() => {
                    const _userInfo = { ...userInfo };
                    _userInfo.plan = thisModal.plan.plan;
                    localStorage.setItem('user', JSON.stringify(_userInfo));
                    dispatch(
                        setUser({
                            profile: _userInfo
                        })
                    );
                    setThanksModal(true);
                    setLoadingAdd(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoadingAdd(false);
                });
        }
    }

    return (
        <>
            <Modal show={thisModal.openClose} onHide={closeModal}>
                <Modal.Body style={{ padding: '30px 40px ' }}>
                    <form action="#" onSubmit={goUpgrade}>
                        <div className="d-flex justify-content-between w-100">
                            <RadioGroup
                                aria-label="gender"
                                className="d-flex flex-row"
                                name="gender1"
                                onChange={(e, value) =>
                                    setPeriod(
                                        thisModal.plan.prices.find(
                                            (price) => price.value === value
                                        )
                                    )
                                }
                                value={period?.value || ''}>
                                {thisModal.plan &&
                                    thisModal?.plan?.prices.map((price) => (
                                        <FormControlLabel
                                            key={keyGenerator(20)}
                                            value={price.value}
                                            control={
                                                <Radio
                                                    style={{ color: '#1478FC' }}
                                                    color="primary"
                                                />
                                            }
                                            style={{
                                                textTransform: 'capitalize'
                                            }}
                                            label={price.period}
                                        />
                                    ))}
                            </RadioGroup>
                            <div>
                                <i
                                    className="fas fa-times cursor-pointer c-gray"
                                    onClick={closeModal}
                                />
                            </div>
                        </div>
                        <div className={st.header}>
                            <div className={st.leftBlock}>
                                <p>
                                    <span
                                        style={{ textTransform: 'capitalize' }}>
                                        {thisModal?.plan?.plan}
                                    </span>{' '}
                                    Plan
                                </p>
                                <p>Subscription</p>
                            </div>
                            <div className={st.rightBlock}>
                                <span className={st.price}>
                                    {period?.value}
                                </span>{' '}
                                / month
                            </div>
                        </div>
                        <div className={st.totalHeader}>
                            <span>Today’s total</span>
                            <span>{period?.value}</span>
                        </div>

                        <div className={st.cardBlock}>
                            <p className={st.title}>Credit Card Details</p>
                            <div className="mt-3">
                                <TextField
                                    className="w-100"
                                    label="Full Name"
                                    name="name"
                                    variant="outlined"
                                    required={true}
                                />
                            </div>
                            <div className="mt-3">
                                <TextField
                                    className="w-100"
                                    label="Credit Card Number"
                                    variant="outlined"
                                    name="cardNumber"
                                    required={true}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <i className="fas fa-credit-card c-gray" />
                                            </InputAdornment>
                                        ),
                                        inputComponent: cardMask
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-between mt-3">
                                <TextField
                                    className="w-50 mr-2"
                                    label="Exp Date"
                                    variant="outlined"
                                    InputProps={{
                                        inputComponent: ExpMask
                                    }}
                                    name="expDate"
                                    required={true}
                                />
                                <TextField
                                    className="w-50"
                                    variant="outlined"
                                    defaultValue="CVV"
                                    label="CVV"
                                    name="cvv"
                                    required={true}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <i className="fas fa-exclamation-circle c-gray" />
                                            </InputAdornment>
                                        ),
                                        inputComponent: CvvMask
                                    }}
                                />
                            </div>
                            <div className="mt-3">
                                <button
                                    className="btn btn-danger bgc-red border-0 w-100"
                                    type="submit">
                                    Confirm Payment
                                    {loadingAdd && (
                                        <Spinner
                                            animation="border"
                                            variant="light"
                                            className="ml-2"
                                        />
                                    )}
                                </button>
                            </div>
                            <p className={st.ftText}>
                                You verify that this info is correct
                            </p>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal
                show={thanksModal}
                onHide={() => setThanksModal(false)}
                className="modal-bg-blur-effect">
                <Modal.Body className="p-4">
                    <div className="d-flex justify-content-end">
                        <i
                            className="fas fa-times c-gray cursor-pointer"
                            onClick={() => setThanksModal(false)}
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <i className="fas fa-check-circle c-green fs40" />
                    </div>
                    <p className={st.titleThanks}>Payment complete!</p>
                    <p className={st.tanksDescription}>
                        We’ve sent you an email with all the details of your
                        upgrade. Thank you for being a member of Fanbooks!
                    </p>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-danger bgc-red border-0 px-4"
                            onClick={() => {
                                closeModal();
                                setThanksModal(false);
                            }}>
                            Got it!
                        </button>
                    </div>
                    <div className={st.explore}>
                        <span onClick={() => history.push(ALL_URL.HOME)}>
                            Explore Fanbooks
                        </span>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UpgradeModal;
