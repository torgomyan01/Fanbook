import React, { useEffect, useState } from 'react';
import { Drawer } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckoutBlock } from 'redux/modals';
import { Link } from 'react-router-dom';
import { ALL_URL } from 'utils/urls';
import { history, keyGenerator } from 'utils/helpers';
import { GetCardProducts } from 'api/all-apis';
import ProductBlock from './components/product-block';
import ProductsLoading from './components/loading-block';
import BlockPlaceholder from '../block-placeholder';
import { allProducts, setNewCard } from 'redux/site-card';
import { setOrderInformation } from 'redux/shipping';
import EmptyCard from 'assets/images/checkout/empty-cart.png';
import moment from 'moment';
import { AxiosResponse } from 'axios';

function CheckoutBlock() {
    const dispatch = useDispatch();
    const checkoutBlock = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.checkoutBlock
    );
    const AllProducts = useSelector(
        (state: ISiteCard) => state.SiteCard.allProducts
    );
    const [loading, setLoading] = useState<boolean>(true);

    function closeCheckout() {
        dispatch(setCheckoutBlock(false));
    }

    function goToShipping(e: any) {
        e.preventDefault();
        history.push(ALL_URL.SHIPPING);
        dispatch(setCheckoutBlock(false));
    }

    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        GetCardProducts().then((res) => {
            setLoading(false);
            setTotalCount(res?.data?.data?.item.total);
            dispatch(setNewCard(res?.data?.data?.item?.items?.length));
            dispatch(setOrderInformation(res?.data?.data?.item));

            dispatch(allProducts(sortProduct(res)));
        });
    }, [checkoutBlock]);

    function countChange(res: any) {
        setTotalCount(res.data.data.item.total);
        dispatch(setNewCard(res.data.data.item.items.length));
        dispatch(setOrderInformation(res.data.data.item));
        dispatch(allProducts(sortProduct(res)));
    }

    function sortProduct(res: AxiosResponse) {
        return res.data.data.item.items
            .slice()
            .sort(
                (a: ICartBookInfo, b: ICartBookInfo) =>
                    moment(b.createdAt).unix() - moment(a.createdAt).unix()
            );
    }

    return (
        <React.Fragment>
            <Drawer
                className="card-modal"
                anchor="right"
                open={checkoutBlock}
                onClose={closeCheckout}>
                <div
                    className="modal-body"
                    style={{ maxWidth: 500, minWidth: 450 }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="title font-bold">CART</h2>
                        <Link
                            to="#"
                            className="close-icon position-relative d-flex justify-content-end align-items-center close-icon-1"
                            data-dismiss="modal"
                            onClick={closeCheckout}
                            aria-label="Close">
                            <i className="fas fa-times" />
                        </Link>
                    </div>
                    <ul className="card-list card-list-checkout">
                        {loading ? (
                            <>
                                <ProductsLoading />
                                <ProductsLoading />
                                <ProductsLoading />
                            </>
                        ) : AllProducts.length > 0 ? (
                            AllProducts.map((product: ICartBookInfo) => {
                                return (
                                    <ProductBlock
                                        key={keyGenerator(30)}
                                        product={product}
                                        countChange={countChange}
                                    />
                                );
                            })
                        ) : (
                            <>
                                <p>Your Cart is Empty!</p>
                                <p>
                                    Looks like you haven{"'"}t added anything on
                                    your cart yet.
                                </p>
                                <div
                                    style={{
                                        backgroundImage: `url(${EmptyCard})`
                                    }}
                                    className="empty-card-checkout"
                                />
                            </>
                        )}
                    </ul>
                    {AllProducts.length > 0 && (
                        <>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="fs20 c-gray">Total:</p>
                                <p className="fs30 c-red">
                                    $
                                    {loading ? (
                                        <BlockPlaceholder
                                            width={60}
                                            height={30}
                                            borderRadius={5}
                                            status={true}
                                            count={1}
                                            className="m-0 ml-2"
                                        />
                                    ) : (
                                        totalCount
                                    )}
                                </p>
                            </div>
                            {!loading && (
                                <div className="d-flex justify-content-center w-100">
                                    <button
                                        onClick={goToShipping}
                                        className="checkout-btn btn red cursor-pointer">
                                        Checkout
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Drawer>
        </React.Fragment>
    );
}

export default CheckoutBlock;
