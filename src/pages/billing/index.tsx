import React from 'react';
import 'assets/css/billing.css';
import 'react-bootstrap';
import MainTemplate from 'features/main-template/MainTemplate';

import Balance from './components/balance';
import PaymentMethod from './components/payment-method';
import Transactions from './components/transacitons';

const Billing = () => {
    return (
        <div className="event-details-page list-view previous-orders billing-page">
            <MainTemplate
                blackLogo={true}
                shopBlock={true}
                searchBlock={true}
                style="#fff">
                <section className="list-view-section">
                    <div className="container-fluid wrapper1">
                        <div className="row">
                            <div className="col-12">
                                <Balance />
                                <div id="billing" className="billing-block">
                                    <PaymentMethod />
                                    <Transactions />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </MainTemplate>
        </div>
    );
};

export default Billing;
