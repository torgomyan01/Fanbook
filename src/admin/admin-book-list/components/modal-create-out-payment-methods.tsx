import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { CreateOutTransaction } from 'api/all-apis';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';
import { useDispatch } from 'react-redux';

interface IThisProps {
    show: boolean;
    user: UserInfoAdmin | null;
    close: (price: null | number) => void;
}
interface State {
    numberformat: string;
}

interface NumberFormatCustomProps {
    inputRef: (instance: any) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
}
function ModalCreateOutPaymentMethods({ show, close, user }: IThisProps) {
    const dispatch = useDispatch();
    const [values, setValues] = React.useState<State>({
        numberformat: '0'
    });
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        setValues({
            numberformat: '0'
        });
        setDescription('');
    }, [user]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const [loadingCreateTransaction, setLoadingCreateTransaction] =
        useState<boolean>(false);

    function createPaymentMethod() {
        const price = Number(values.numberformat);
        if (user && price > 0 && description !== '') {
            setLoadingCreateTransaction(true);
            CreateOutTransaction({
                sourceUserId: user.id,
                description,
                total: Number(values.numberformat),
                status: 'completed'
            })
                .then((res) => {
                    console.log(res);
                    setLoadingCreateTransaction(false);
                    close(price);
                })
                .catch((err) => {
                    console.log(err);
                    setLoadingCreateTransaction(false);
                });
        } else {
            dispatch(setMessageUser(UM.FILL_ALL));
        }
    }
    function closeModal() {
        close(null);
    }

    return (
        <Modal show={show} onHide={closeModal} className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>Create Out Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <TextField
                        label="Price"
                        className="w-100"
                        variant="outlined"
                        value={values.numberformat}
                        onChange={handleChange}
                        name="numberformat"
                        required={true}
                        id="formatted-numberformat-input"
                        InputProps={{
                            inputComponent: NumberFormatCustom as any
                        }}
                    />
                </div>
                <div className="mt-4">
                    <TextField
                        label="Description"
                        className="w-100"
                        variant="outlined"
                        value={description}
                        multiline={true}
                        required={true}
                        rows={5}
                        onChange={(e) => setDescription(e.target.value)}
                        name="numberformat"
                        id="formatted-numberformat-input"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-danger bgc-red border-0"
                    onClick={createPaymentMethod}>
                    Create
                    {loadingCreateTransaction && (
                        <Spinner
                            animation="border"
                            variant="light"
                            className="ml-2"
                        />
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateOutPaymentMethods;
