import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

interface IThisProps {
    productID: string;
    price: number | null;
    buyName: string | null;
    buoyed?: any;
}

function CheckInCard({ productID, price, buyName, buoyed }: IThisProps) {
    const AllProducts = useSelector(
        (state: ISiteCard) => state.SiteCard.allProducts
    );
    const checkProduct = AllProducts.some(
        (product: ICartBookInfo) => product.entityId === productID
    );

    useEffect(() => buoyed && buoyed(checkProduct), [checkProduct]);

    const buyN = buyName ? buyName : 'Buy';
    const toPrice = price ? `$${price} ${buyN}` : buyN;
    return <>{checkProduct ? 'in Card' : toPrice}</>;
}

export default CheckInCard;
