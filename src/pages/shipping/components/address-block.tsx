import React, { useState } from 'react';
import { FormControlLabel, Radio, Tooltip } from '@material-ui/core';
import { RemoveAddress } from 'api/all-apis';
import { Spinner } from 'react-bootstrap';

interface IThisProps {
    address: IAddress;
    checked: string;
    removedAddress: any;
    editAddress: any;
}

function AddressBlock({
    address,
    checked,
    removedAddress,
    editAddress
}: IThisProps) {
    const [loading, setLoading] = useState<boolean>(false);
    function removeAddress() {
        setLoading(true);
        RemoveAddress(address.id).then(() => {
            setLoading(false);
            removedAddress && removedAddress(address.id);
        });
    }

    function openModalEditAddress() {
        editAddress(address);
    }

    return (
        <li className="border-item d-flex justify-content-between w-100">
            <div className="form-item text-no-wrap">
                <FormControlLabel
                    value={address.id}
                    control={<Radio />}
                    className="radio-shipping"
                    checked={checked === address.id}
                    label=""
                />
                <ul>
                    <li className="big-txt">
                        <span className="text-no-wrap">
                            {address.name} · {address.address1} ·{' '}
                            {address.address2}
                        </span>
                    </li>
                    <li className="small-txt">
                        <span>
                            {address.country} · {address.city} ·{' '}
                            {address.region} · {address.zip}
                        </span>
                    </li>
                </ul>
            </div>
            <span>
                {loading ? (
                    <Spinner animation="border" variant="danger" />
                ) : (
                    <Tooltip title="Remove Address" placement="top">
                        <i
                            className="fas fa-trash c-red cursor-pointer ml-2"
                            onClick={removeAddress}
                        />
                    </Tooltip>
                )}
            </span>
            <span>
                <Tooltip title="Edit Address" placement="top">
                    <i
                        className="fas fa-pencil-alt c-red ml-2 cursor-pointer"
                        onClick={openModalEditAddress}
                    />
                </Tooltip>
            </span>
        </li>
    );
}

export default AddressBlock;
