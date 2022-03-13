import React, { useCallback, useEffect, useState } from 'react';
import 'assets/css/shipping.css';
import 'react-bootstrap';

import HeaderShipping from './components/Heder';
import Summary from 'pages/shipping/components/Summary';
import ShippingSection from 'pages/shipping/components/ShippingSection';
import OrderConfirmed from 'pages/shipping/components/OrderConfirmed';
import { useDispatch } from 'react-redux';
import {
    GetAllAddressUser,
    GetCardProducts,
    GetPaymentsMethods,
    GetPublisherFrom
} from 'api/all-apis';
import { setOrderInformation } from 'redux/shipping';

export interface Props {
    onContinue: any;
}

function Shipping() {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const onContinue = (step: number) => {
        setStep(step);
    };

    useEffect(() => {
        GetCardProducts()
            .then((res) => {
                dispatch(setOrderInformation(res.data.data.item));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [confirmedInfo, setConfirmedInfo] = useState<ISummary | undefined>();

    function saveChanges(res: ISummary) {
        setConfirmedInfo(res);
    }

    const [CountriesCodes, setCountriesCodes] = useState([]);
    const [Address, setAddress] = useState([]);
    const [AddressLoading, setAddressLoading] = useState<boolean>(true);
    const [PaymentsMethods, setPaymentsMethods] = useState([]);

    useEffect(() => {
        // GET ALL COUNTRY
        GetPublisherFrom()
            .then((res) => {
                const countries =
                    res.data.data.item.publisherProfile.countryCode;
                setCountriesCodes(countries);
            })
            .catch((err) => {
                console.log(err);
            });

        // GET ALL ADDRESS USER
        GetAllAddressUser()
            .then((res) => {
                setAddress(res.data.data.items);
                setAddressLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });

        // GET PAYMENTS METHODS
        GetPaymentsMethods()
            .then((res) => {
                setPaymentsMethods(res.data.data.items);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function saveChangesAddress(newAddress: ISummary) {
        setConfirmedInfo(newAddress);
    }

    const renderSteps = useCallback(() => {
        switch (step) {
            case 1:
                return (
                    <ShippingSection
                        saveShippingInformation={saveChanges}
                        onContinue={onContinue}
                        CountriesCodes={CountriesCodes}
                        Address={Address}
                        AddressLoading={AddressLoading}
                        PaymentsMethods={PaymentsMethods}
                    />
                );
            case 2:
                return (
                    <Summary
                        confirmedInfo={confirmedInfo}
                        onContinue={onContinue}
                        Address={Address}
                        saveChangesEditAddress={saveChanges}
                        PaymentsMethods={PaymentsMethods}
                    />
                );
            case 3:
                return <OrderConfirmed confirmedInfo={confirmedInfo} />;
            default:
                return <React.Fragment />;
        }
    }, [
        step,
        CountriesCodes,
        Address,
        AddressLoading,
        PaymentsMethods,
        confirmedInfo
    ]);
    return (
        <div className="event-details-page sign-up-page sign-empaty">
            <HeaderShipping step={step} />
            {renderSteps()}
        </div>
    );
}

export default Shipping;
