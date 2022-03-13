import React from 'react';
import { useParams } from 'react-router-dom';
import { MenuUrls } from '../index';
import BookPageAdmin from './book-page';
import UsersBlockAdmin from './users-block';
import Orders from './orders';
import PaymentProfiles from './payment-profiles';
import ReportsOutPayments from './reports-and-outpayment';

function Content() {
    const { tabName }: { tabName: string } = useParams();

    function getPages(tableName: string) {
        switch (tableName) {
            case MenuUrls.books:
                return <BookPageAdmin />;
            case MenuUrls.users:
                return <UsersBlockAdmin />;
            case MenuUrls.transactions:
                return <PaymentProfiles />;
            case MenuUrls.orders:
                return <Orders />;
            case MenuUrls.ReportsOutPayments:
                return <ReportsOutPayments />;
            default:
                return 'On Page';
        }
    }

    return (
        <div className="custom-scroll-horizontal red">{getPages(tabName)}</div>
    );
}

export default Content;
