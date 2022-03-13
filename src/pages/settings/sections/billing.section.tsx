import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { SearchIcon } from 'assets/images/settings';
import { setOpenCreateBilling } from 'redux/modals';
import { useDispatch, useSelector } from 'react-redux';
import { GetPaymentsMethods, GetTransactions } from 'api/all-apis';
import { keyGenerator } from 'utils/helpers';
import ModalForBilling from 'features/modal-for-billing';
import CardBlockBillingPage from '../componstnts/card-block-billing-page';
import PaymentMethodsLoading from './payment-methods-loading';
import TransactionsBlock from './transactions-block';

const BillingSection = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const openModalBilling = () => {
        dispatch(setOpenCreateBilling(true));
    };

    const [paymentMethods, setPaymentMethods] = useState<IPaymentsMethods[]>(
        []
    );

    const [paymentsLoading, setPaymentsLoading] = useState<boolean>(true);

    const [transactions, setTransactions] = useState<ITransaction[]>();
    const [AllTransactions, setAllTransactions] = useState<ITransaction[]>();

    useEffect(() => {
        // GAT PAYMENTS METHODS
        GetPaymentsMethods()
            .then((res) => {
                setPaymentMethods(res.data.data.items);
                setPaymentsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });

        if (userInfo) {
            // GET TRANSACTIONS
            GetTransactions({
                'page[number]': 1,
                'page[size]': 1000,
                sort: '-createdAt',
                'filter[type]': 'in',
                'filter[targetUserId]': userInfo.id
            })
                .then((res) => {
                    const trans = res.data.data.items;
                    setTransactions(trans);
                    setAllTransactions(trans);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    function changeSearchInput(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.toLowerCase();
        const NewRes = AllTransactions?.filter((trans: ITransaction) =>
            trans.description?.toLowerCase().includes(value)
        );
        setTransactions(NewRes);
    }

    function addNewMethod(res: IPaymentsMethods) {
        setPaymentMethods((oldArray: IPaymentsMethods[]) => [...oldArray, res]);
        dispatch(setOpenCreateBilling(false));
    }

    function removeCard(id: string) {
        const _paymentMethods = paymentMethods.filter(
            (card: IPaymentsMethods) => card.id !== id
        );
        setPaymentMethods(_paymentMethods);
    }

    return (
        <div id="billing" className="tab-pane billing-block fade active show">
            <h3 className="billing-pretitle">Your Payment Methods</h3>
            <div className="accordion" id="myAccordion">
                {paymentsLoading ? (
                    <>
                        <PaymentMethodsLoading />
                        <PaymentMethodsLoading />
                    </>
                ) : paymentMethods.length > 0 ? (
                    paymentMethods.map((card: IPaymentsMethods) => {
                        return (
                            <CardBlockBillingPage
                                key={keyGenerator(20)}
                                card={card}
                                removed={removeCard}
                            />
                        );
                    })
                ) : (
                    <p className="fs20 c-gray">No Payments Methods</p>
                )}
            </div>
            <div className="mt-5">
                <span
                    className="method-btn c-white text-center"
                    onClick={openModalBilling}
                    data-toggle="modal"
                    data-target="#billingModal">
                    <i className="fas fa-plus mr-2" />
                    Add a new method
                </span>
            </div>
            <div className="transac-block">
                <ul className="d-xl-flex justify-content-between align-items-center">
                    <li>
                        <h2 className="transac-title font-bold mb-sm-0 mb-3">
                            Your Transactions
                        </h2>
                    </li>
                    <li>
                        <div className="d-sm-flex align-items-center justify-content-between">
                            <ul className=" mb-sm-0 mb-3 d-flex align-items-center">
                                <li className="transition-item  mr-4">
                                    <span className="active">All</span>
                                </li>
                                <li className="transition-item mr-4">
                                    <span className="">Completed</span>
                                </li>
                                <li className="transition-item mr-5">
                                    <span className="">Pending</span>
                                </li>
                            </ul>
                            <div>
                                <form action="#" method="post">
                                    <div className="form-field">
                                        <input
                                            type="text"
                                            placeholder="Search…"
                                            onChange={changeSearchInput}
                                        />
                                        <span>
                                            <img src={SearchIcon} alt="" />
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </li>
                </ul>

                <ul className="transac-box mb-0">
                    {(transactions || []).map((transaction: ITransaction) => {
                        return (
                            <TransactionsBlock
                                key={keyGenerator(30)}
                                transaction={transaction}
                            />
                        );
                    })}
                </ul>
            </div>
            <ModalForBilling addedNew={addNewMethod} />
        </div>
    );
};

export default BillingSection;
