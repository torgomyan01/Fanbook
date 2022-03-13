import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { keyGenerator, setMessageUser, textCrop } from 'utils/helpers';
import fanbookDefault from 'assets/images/fanbookDefault.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { CreateAddress, CreatePaymentsMethods } from 'api/all-apis';
import BlockPlaceholder from 'features/block-placeholder';
import { RadioGroup, TextField } from '@material-ui/core';
import AddressBlock from './address-block';
import { Autocomplete } from '@material-ui/lab';
import { Spinner } from 'react-bootstrap';
import CardBlock from './card-block';
import InputMask from 'react-input-mask';
import CartValid from 'features/card-valid/card-valid';
import { setCheckoutBlock } from 'redux/modals';
import { AlertSiteTypes } from 'enums/enums';
import { UM } from 'utils/user-messages';
import EditAddressModal from './edit-address-modal';

interface IThisProps {
    onContinue: any;
    saveShippingInformation: any;
    CountriesCodes: { code: string; name: string }[];
    Address: IAddress[];
    AddressLoading: boolean;
    PaymentsMethods: IPaymentsMethods[];
}

const ShippingSection = ({
    onContinue,
    saveShippingInformation,
    CountriesCodes,
    Address,
    AddressLoading,
    PaymentsMethods
}: IThisProps) => {
    const dispatch = useDispatch();
    const cardProduct = useSelector(
        (state: IShipping) => state.Shipping.orderInformation
    );
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const [openCarde, setOpenCarde] = useState(false);
    function openCloseAddCarte() {
        setOpenCarde(!openCarde);
    }

    const [openAddCard, setOpenAddCard] = useState(false);
    function openCloseAddCa() {
        setOpenAddCard(!openAddCard);
    }

    const [address, setAddress] = useState<IAddress[]>([]);

    const [paymentsMethods, setPaymentsMethods] = useState<IPaymentsMethods[]>(
        []
    );

    useEffect(() => {
        setAddress(Address);
        setPaymentsMethods(PaymentsMethods);
    }, [Address, PaymentsMethods]);
    const [addressLine1, setAddressLine1] = useState<string>('');
    const [addressLine2, setAddressLine2] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    const [zip, setZip] = useState<string>('');
    const [country, setCountry] = useState<string>('');

    const [loading, setLoading] = useState(false);
    function addAddress(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const _address = [
            addressLine1,
            name,
            city,
            region,
            zip,
            country,
            surname
        ].some((e: string) => !e);

        if (_address) {
            dispatch(setMessageUser(UM.FILL_ALL));
            return;
        }
        setLoading(true);
        const data = {
            name: `${name} ${surname}`,
            address1: addressLine1,
            address2: addressLine2,
            city,
            region,
            zip,
            countryCode: country,
            tag: 'shipping'
        };

        CreateAddress(data)
            .then((res) => {
                setLoading(false);
                setAddress((old: IAddress[]) => [...old, res.data.data.item]);
                setOpenCarde(false);
                setAddressLine1('');
                setAddressLine2('');
                setName('');
                setSurname('');
                setCity('');
                setRegion('');
                setZip('');
                setCountry('');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const [checked, setChecked] = useState<string>('');

    const [cardName, setCardName] = useState<string>('');
    const [cardNumber, setCardNumber] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [csv, setCsv] = useState<string>('');
    const [addCartLoading, setAddCartLoading] = useState(false);
    const [cardChecked, setCardChecked] = useState<string>('');

    function cratePayment(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const expSplit = expirationDate.split('/');
        const expMonth = expSplit[0];
        const expYear = expSplit[1];

        if (!cardName && !cardNumber && !expirationDate && !csv) {
            dispatch(setMessageUser(UM.FILL_ALL));
            return;
        }
        if (Number(expMonth) > 12) {
            dispatch(setMessageUser(UM.FIELDS_CORRECTLY));
            return;
        }
        setAddCartLoading(true);
        const data = {
            type: 'card',
            billingDetails: {
                email: userInfo?.email,
                name: userInfo?.lastName
            },
            card: {
                number: cardNumber.replace(/-/g, ''),
                expMonth: Number(expMonth),
                expYear: Number(expYear),
                cvc: csv
            }
        };
        CreatePaymentsMethods(data)
            .then((res) => {
                setCardName('');
                setCardNumber('');
                setExpirationDate('');
                setCsv('');
                setPaymentsMethods((oldArray: IPaymentsMethods[]) => [
                    ...oldArray,
                    res.data.data.item
                ]);
                setAddCartLoading(false);
                setOpenAddCard(false);
                setCardChecked(res.data.data.item.id);
            })
            .catch((err) => {
                setAddCartLoading(false);
                setOpenAddCard(false);
                dispatch(
                    setMessageUser([
                        err?.response?.data?.message,
                        AlertSiteTypes.error
                    ])
                );
            });
    }

    function confirmOrder() {
        if (!cardChecked) {
            dispatch(setMessageUser(UM.SELECT_CARD));
            return;
        }
        if (!checked) {
            dispatch(setMessageUser(UM.SELECT_SHIPPING));
            return;
        }
        onContinue(2);
        saveShippingInformation({
            savedAddress: address.find(
                (address: IAddress) => address.id === checked
            ),
            savedCard: paymentsMethods.find(
                (card: IPaymentsMethods) => card.id === cardChecked
            )
        });
    }

    function openCard() {
        dispatch(setCheckoutBlock(true));
    }

    function removeCard(id: string) {
        const _paymentsMethods = [...paymentsMethods];
        const currentCard = _paymentsMethods.filter(
            (card: IPaymentsMethods) => card.id !== id
        );
        setPaymentsMethods(currentCard);
    }

    function removedAddress(id: string) {
        const _address = [...address];
        const currentAddress = _address.filter(
            (address: IAddress) => address.id !== id
        );
        setAddress(currentAddress);
    }

    const [modalEditAddress, setModalEditAddress] = useState<boolean>(false);
    const [editedAddress, setEditedAddress] = useState<IAddress>();

    function openModalEditAddress(res: IAddress) {
        setModalEditAddress(true);
        setEditedAddress(res);
    }

    function AddressUpdated(_address: IAddress) {
        const emptyAddress = [...address];
        const oldAddress = emptyAddress.filter(
            (ad: IAddress) => ad.id !== _address.id
        );
        if (oldAddress) {
            const newAddresses: IAddress[] = [...oldAddress];
            newAddresses.push(_address);
            setAddress(newAddresses);
            setChecked(_address.id);
        }
    }

    return (
        <section className="shipping-section mt-5">
            <div className="container-fluid wrapper2">
                <div className="row my-row">
                    <div className="col-36 my-col">
                        <div className="order-box white-box">
                            <h2 className="card-list-title mt-1">
                                Your Order
                                <Link to="#" onClick={openCard}>
                                    <span className="b-bottom">Edit</span>
                                </Link>
                            </h2>
                            <ul className="card-list">
                                {cardProduct?.items?.map(
                                    (item: ICartBookInfo) => {
                                        return (
                                            <li
                                                key={keyGenerator(30)}
                                                className="card-item">
                                                <div className="d-flex">
                                                    <div
                                                        className="img-box"
                                                        style={{
                                                            backgroundImage: `url(${
                                                                item.avatarUrl
                                                                    ? item.avatarUrl
                                                                    : fanbookDefault
                                                            })`
                                                        }}
                                                    />
                                                    <div className="txt-box">
                                                        <p className="fs15 c-gray mb-1">
                                                            {item.entityType}
                                                        </p>
                                                        <h2 className="f-omnesMedium fs19 mb-2">
                                                            {textCrop(
                                                                item.name,
                                                                10
                                                            )}
                                                        </h2>
                                                        <span className="fs15 border px-2 d-inline-block mb-1">
                                                            {item.qty}
                                                        </span>
                                                        <p className="fs15 c-red f-omnesMedium mb-2">
                                                            ${item.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                            <ul className="txt-list">
                                <li className="txt-item">
                                    Items (without tax)
                                    <span>${cardProduct.subtotal}</span>
                                </li>
                                <li className="txt-item">
                                    Shipping &amp; Handling
                                    <span>${cardProduct.shipping}</span>
                                </li>
                                <li className="txt-item">
                                    Tax
                                    <span>${cardProduct.tax}</span>
                                </li>
                                <li className="txt-item mt-3">
                                    <span
                                        className="fs30"
                                        style={{ color: '#737373' }}>
                                        Total
                                    </span>
                                    <span className="fs25 font-bold">
                                        ${cardProduct.total}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-64 my-col">
                        <div className="shipping-box white-box">
                            <h2 className="title">Shipping Information</h2>
                            <p className="pre-title">Saved Addresses</p>
                            <ul className="bordered-list">
                                {AddressLoading ? (
                                    <BlockPlaceholder
                                        width={490}
                                        height={80}
                                        borderRadius={5}
                                        status={true}
                                        count={3}
                                        className="m-0 w-100 mb-2"
                                    />
                                ) : (
                                    <React.Fragment>
                                        <RadioGroup
                                            aria-label="saving-address"
                                            name="Address"
                                            value={checked}
                                            onChange={(event, value) =>
                                                setChecked(value)
                                            }>
                                            {address.map(
                                                (address: IAddress) => {
                                                    return (
                                                        <AddressBlock
                                                            key={keyGenerator(
                                                                30
                                                            )}
                                                            checked={checked}
                                                            address={address}
                                                            removedAddress={
                                                                removedAddress
                                                            }
                                                            editAddress={
                                                                openModalEditAddress
                                                            }
                                                        />
                                                    );
                                                }
                                            )}
                                        </RadioGroup>

                                        <li className="border-item cursor-pointer p-0 ml-1">
                                            <div
                                                className="form-item cursor-pointer"
                                                onClick={openCloseAddCarte}>
                                                <label className="round red cursor-pointer">
                                                    <ul>
                                                        <li className="big-txt">
                                                            {openCarde ? (
                                                                <i className="fas fa-minus mr-2 fs28 c-red" />
                                                            ) : (
                                                                <i className="fas fa-plus mr-2 fs28 c-red" />
                                                            )}
                                                            Add a New Address
                                                        </li>
                                                    </ul>
                                                </label>
                                            </div>
                                        </li>
                                    </React.Fragment>
                                )}
                            </ul>

                            <form
                                action=""
                                method=""
                                onSubmit={addAddress}
                                className={
                                    openCarde
                                        ? 'formAddAdress show'
                                        : 'formAddAdress hide'
                                }>
                                <div className="row">
                                    <div className="col-6">
                                        <TextField
                                            className="my-2 w-100"
                                            label="Name"
                                            value={name}
                                            required={true}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            className="my-2 w-100"
                                            label="Surname"
                                            required={true}
                                            value={surname}
                                            onChange={(e) =>
                                                setSurname(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <TextField
                                    className="my-2 w-100"
                                    label="Address Line 1"
                                    required={true}
                                    value={addressLine1}
                                    onChange={(e) =>
                                        setAddressLine1(e.target.value)
                                    }
                                />
                                <TextField
                                    className="my-2 w-100"
                                    label="Address Line 2"
                                    required={false}
                                    value={addressLine2}
                                    onChange={(e) =>
                                        setAddressLine2(e.target.value)
                                    }
                                />
                                <div className="row">
                                    <div className="col-6">
                                        <Autocomplete
                                            options={CountriesCodes}
                                            getOptionLabel={(option) =>
                                                option.name
                                            }
                                            className="my-2 w-100"
                                            aria-required={true}
                                            loading={
                                                CountriesCodes.length === 0
                                            }
                                            onChange={(event, value) =>
                                                setCountry(
                                                    value ? value.code : ''
                                                )
                                            }
                                            renderOption={(option) => (
                                                <React.Fragment>
                                                    <span className="mr-2 fs12 font-bold c-gray">
                                                        {option.code}
                                                    </span>
                                                    {option.name}
                                                </React.Fragment>
                                            )}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Country *"
                                                    variant="standard"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            className="my-2 w-100"
                                            label="City"
                                            required={true}
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <TextField
                                            className="my-2 w-100"
                                            label="Region"
                                            value={region}
                                            required={true}
                                            onChange={(e) =>
                                                setRegion(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            className="my-2 w-100"
                                            label="Zip"
                                            required={true}
                                            value={zip}
                                            onChange={(e) =>
                                                setZip(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-danger bgc-red border-0 ">
                                        Add Address
                                        {loading && (
                                            <Spinner
                                                animation="border"
                                                className="ml-2"
                                                variant="light"
                                            />
                                        )}
                                    </button>
                                </div>
                            </form>

                            <h2 className="title">Payment Information</h2>
                            <p className="pre-title">Saved Payment Methods</p>
                            <ul className="bordered-list">
                                <RadioGroup
                                    aria-label="saving-address"
                                    name="Address"
                                    value={cardChecked}
                                    onChange={(event, value) =>
                                        setCardChecked(value)
                                    }>
                                    {paymentsMethods.map(
                                        (card: IPaymentsMethods) => {
                                            return (
                                                <CardBlock
                                                    key={keyGenerator(20)}
                                                    card={card}
                                                    checked={cardChecked}
                                                    remove={removeCard}
                                                />
                                            );
                                        }
                                    )}
                                </RadioGroup>
                                <li
                                    className="border-item cursor-pointer"
                                    onClick={openCloseAddCa}>
                                    <div className="form-item cursor-pointer">
                                        <ul>
                                            <li className="big-txt">
                                                {openAddCard ? (
                                                    <i className="fas fa-minus c-red mr-2" />
                                                ) : (
                                                    <i className="fas fa-plus c-red mr-2" />
                                                )}
                                                Add a New Method
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>

                            <div
                                className={
                                    openAddCard
                                        ? 'add-method-box formAddCard show'
                                        : 'add-method-box formAddCard hide'
                                }>
                                <form
                                    action=""
                                    method=""
                                    className="w-100"
                                    onSubmit={cratePayment}>
                                    <div className="row">
                                        <div className="col-6">
                                            <TextField
                                                className="my-2 w-100"
                                                label="Name on Card"
                                                required={true}
                                                value={cardName.toUpperCase()}
                                                onChange={(e) =>
                                                    setCardName(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-6 position-relative">
                                            <InputMask
                                                mask="9999-9999-9999-9999"
                                                onChange={(e) =>
                                                    setCardNumber(
                                                        e.target.value
                                                    )
                                                }
                                                value={cardNumber}
                                                disabled={false}>
                                                {() => (
                                                    <TextField
                                                        className="my-2 w-100"
                                                        label="Credit Card Number"
                                                        required={true}
                                                    />
                                                )}
                                            </InputMask>
                                            <CartValid
                                                cc={cardNumber}
                                                className="cc-icon-for-shipping"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <InputMask
                                                mask="99/99"
                                                disabled={false}
                                                value={expirationDate}
                                                onChange={(e) =>
                                                    setExpirationDate(
                                                        e.target.value
                                                    )
                                                }>
                                                {() => (
                                                    <TextField
                                                        className="my-2 w-100"
                                                        label="Expiration Date"
                                                        required={true}
                                                    />
                                                )}
                                            </InputMask>
                                        </div>
                                        <div className="col-6">
                                            <InputMask
                                                mask="999"
                                                disabled={false}
                                                value={csv}
                                                onChange={(e) =>
                                                    setCsv(e.target.value)
                                                }>
                                                {() => (
                                                    <TextField
                                                        className="my-2 w-100"
                                                        label="CSV"
                                                        required={true}
                                                    />
                                                )}
                                            </InputMask>
                                        </div>
                                        <div className="mt-3">
                                            <button
                                                type="submit"
                                                className="btn btn-danger ml-3 bgc-red border-0">
                                                Add Card
                                                {addCartLoading && (
                                                    <Spinner
                                                        animation="border"
                                                        variant="light"
                                                        className="ml-2"
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <button
                                className="checkout-big-btn red btn"
                                onClick={confirmOrder}>
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <EditAddressModal
                show={modalEditAddress}
                closeModal={() => setModalEditAddress(false)}
                address={editedAddress}
                CountriesCodes={CountriesCodes}
                updateAddress={AddressUpdated}
            />
        </section>
    );
};

export default ShippingSection;
