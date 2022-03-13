import React, { FormEvent, useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';
import { UpdateShippingAddress } from 'api/all-apis';

interface IThisProps {
    show: boolean;
    closeModal: any;
    address: IAddress | undefined;
    CountriesCodes: { code: string; name: string }[];
    updateAddress: any;
}

const defCountry = {
    code: 'US',
    name: 'United States of America'
};

function EditAddressModal({
    show,
    closeModal,
    address,
    CountriesCodes,
    updateAddress
}: IThisProps) {
    const dispatch = useDispatch();
    const [addressLine1, setAddressLine1] = useState<string>('');
    const [addressLine2, setAddressLine2] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    const [zip, setZip] = useState<string>('');
    const [country, setCountry] = useState<string>('');

    const [currentCountry, setCurrentCountry] = useState(defCountry);

    useEffect(() => {
        if (address) {
            setName(address?.name);
            setAddressLine1(address.address1);
            setAddressLine2(address.address2);
            setCity(address.city);
            setRegion(address.region);
            setZip(address.zip);
            setTimeout(() => setCountry(address.countryCode), 1000);
            setCurrentCountry({
                code: address.countryCode,
                name: address.country
            });
        }
    }, [address]);

    const [loading, setLoading] = useState(false);
    function addAddress(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!address) {
            return;
        }

        const _address = [addressLine1, name, city, region, zip, country].some(
            (e: string) => !e
        );

        if (_address) {
            dispatch(setMessageUser(UM.FILL_ALL));
            return;
        }
        setLoading(true);
        const data = {
            name,
            address1: addressLine1,
            address2: addressLine2,
            city,
            region,
            zip,
            countryCode: country,
            tag: 'shipping'
        };

        UpdateShippingAddress(data, address.id)
            .then((res) => {
                setLoading(false);
                updateAddress(res.data.data.item);
                closeModal();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Modal
            show={show}
            onHide={closeModal}
            centered
            className="modal-bg-blur-effect">
            <form
                action=""
                method=""
                onSubmit={addAddress}
                className="formAddAdress show"
                style={{ height: 'auto' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12">
                            <TextField
                                className="my-2 w-100"
                                label="Name"
                                value={name || ' '}
                                required={true}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <TextField
                        className="my-2 w-100"
                        label="Address Line 1"
                        required={true}
                        value={addressLine1 || ' '}
                        onChange={(e) => setAddressLine1(e.target.value)}
                    />
                    <TextField
                        className="my-2 w-100"
                        label="Address Line 2"
                        required={false}
                        value={addressLine2 || ' '}
                        onChange={(e) => setAddressLine2(e.target.value)}
                    />
                    <div className="row">
                        <div className="col-6">
                            <Autocomplete
                                options={CountriesCodes}
                                getOptionLabel={(option) => option.name}
                                className="my-2 w-100"
                                aria-required={true}
                                loading={CountriesCodes?.length === 0}
                                onChange={(event, value) =>
                                    setCountry(value ? value.code : '')
                                }
                                value={currentCountry}
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
                                value={city || ' '}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <TextField
                                className="my-2 w-100"
                                label="Region"
                                value={region || ' '}
                                required={true}
                                onChange={(e) => setRegion(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <TextField
                                className="my-2 w-100"
                                label="Zip"
                                required={true}
                                value={zip || ' '}
                                onChange={(e) => setZip(e.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="submit"
                        className="btn btn-danger bgc-red border-0">
                        Change Address
                        {loading && (
                            <Spinner
                                animation="border"
                                className="ml-2"
                                variant="light"
                            />
                        )}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default EditAddressModal;
