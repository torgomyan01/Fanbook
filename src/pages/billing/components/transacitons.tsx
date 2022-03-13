import React, { ChangeEvent, useEffect, useState } from 'react';
import { SearchIcon } from 'assets/images/settings';
import { GetTransactions } from 'api/all-apis';
import TransactionsBlock from 'pages/settings/sections/transactions-block';
import { keyGenerator } from 'utils/helpers';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Transactions = () => {
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const [transactions, setTransactions] = useState<ITransaction[]>();
    const [AllTransactions, setAllTransactions] = useState<ITransaction[]>();

    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (userInfo) {
            setLoading(true);
            GetTransactions({
                'page[number]': 1,
                'page[size]': 1000,
                sort: '-createdAt',
                'filter[type]': 'internal',
                'filter[targetUserId]': userInfo.id
            })
                .then((res) => {
                    const trans = res.data.data.items;
                    setTransactions(trans);
                    setAllTransactions(trans);
                    setLoading(false);
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

    return (
        <div className="transac-block mt-5">
            <div className="transac-block">
                <ul className="d-xl-flex justify-content-between align-items-center">
                    <li>
                        <h2 className="transac-title font-bold mb-sm-0 mb-3">
                            Transactions
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
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center mt-5">
                            <CircularProgress />
                        </div>
                    ) : (
                        (transactions || []).map(
                            (transaction: ITransaction) => {
                                return (
                                    <TransactionsBlock
                                        key={keyGenerator(20)}
                                        transaction={transaction}
                                    />
                                );
                            }
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Transactions;
