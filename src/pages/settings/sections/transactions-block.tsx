import React from 'react';
import FanbookDefault from 'assets/images/fanbookDefault.jpg';
import moment from 'moment/moment';
import { textCrop } from 'utils/helpers';

interface IThisProps {
    transaction: ITransaction;
}

function TransactionsBlock({ transaction }: IThisProps) {
    console.log(transaction);
    return (
        <li className="transac-item d-flex align-items-sm-center align-items-start justify-content-between flex-sm-row flex-column">
            <div className="w-68 d-flex align-items-start mb-sm-0 mb-3">
                <div className="transac-img_box">
                    <img
                        src={
                            transaction.avatarUrl
                                ? transaction.avatarUrl
                                : FanbookDefault
                        }
                        alt=""
                    />
                </div>
                <div className="w-100 d-flex flex-column justify-content-between">
                    <h2 className="fs25 mb-0 font-bold">
                        {textCrop(transaction.description, 50)}
                    </h2>
                    <h3 className="fs18 font-bold">
                        {moment(transaction.createdAt).format('MMM Do YY')} |{' '}
                        {transaction.targetType}
                    </h3>
                    <ul className="d-lg-flex mb-0 justify-content-between">
                        <li className="text-nowrap fs18 mr-5 mb-lg-0 mb-2">
                            <span
                                className="c-orang"
                                data-toggle="modal"
                                data-target="#balanceModal">
                                Processing Payment
                            </span>
                        </li>
                        {/*<li className="text-nowrap">*/}
                        {/*    <span className="down-link c-gray">*/}
                        {/*        <span>Download Receipt</span>*/}
                        {/*    </span>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
            <span className="fs28 font-bold">${transaction.total}</span>
        </li>
    );
}

export default TransactionsBlock;
