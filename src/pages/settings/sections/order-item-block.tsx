import React, { useState } from 'react';
import { history, printEventNameAndDate, textCrop } from 'utils/helpers';
import DefaultFanbook from 'assets/images/fanbookDefault.jpg';
import { DEF_URL } from 'utils/urls';
import { cartProductType, OrderItemTypes } from 'enums/enums';
import { DownloadFile } from 'api/all-apis';
import { Spinner } from 'react-bootstrap';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import { useDispatch } from 'react-redux';

interface IThisProps {
    item: ICartBookInfo;
    order: IOrder;
}

function OrderItemBlock({ item, order }: IThisProps) {
    const dispatch = useDispatch();
    const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
    function downloadImage(e: any) {
        e.preventDefault();
        const data: any = {};
        if (item.entityType === OrderItemTypes.AlbumFile) {
            data['file'] = [item.entityId];
        }
        if (item.entityType === OrderItemTypes.Album) {
            data['albums'] = [item.entityId];
        }
        setDownloadLoading(true);
        DownloadFile(data)
            .then((res) => {
                const url = res.data.data.item.url;
                window.open(url, '_target');
                setDownloadLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setDownloadLoading(false);
            });
    }
    function viewPhoto() {
        if (item.avatarUrl) {
            dispatch(modalOpenClose(true));
            dispatch(
                setImage({
                    name: item.name,
                    url: item.avatarUrl
                })
            );
        }
    }

    function openViewProduct() {
        switch (item.entityType) {
            case OrderItemTypes.Album:
                history.push(`${DEF_URL.ALBUM}/${item.entityId}`);
                break;
            case OrderItemTypes.AlbumFile:
                viewPhoto();
                break;
            case OrderItemTypes.Book:
                history.push(`${DEF_URL.COVER_PREVIEW}/${item.entityId}`);
                break;
            case OrderItemTypes.Poster:
                history.push(`${DEF_URL.POSTER_PREVIEW}/${item.entityId}`);
                break;
            default:
                break;
        }
    }

    const useDownloadButton =
        item.entityType === cartProductType.albumFile ||
        item.entityType === cartProductType.album;

    return (
        <div className="row">
            <div className="one-product border-0">
                <div className="d-flex w-50">
                    <div
                        className="image"
                        style={{
                            backgroundImage: `url(${
                                item.avatarUrl ? item.avatarUrl : DefaultFanbook
                            })`
                        }}
                    />
                    <div className="info-bloc-product">
                        <div
                            className="d-flex justify-content-start align-items-center"
                            style={{ marginTop: -10 }}>
                            <div
                                className="title-product cursor-pointer"
                                onClick={openViewProduct}>
                                {item.entityType}: {textCrop(item.name, 20)}
                            </div>
                            {useDownloadButton && (
                                <button
                                    className="btn ml-3"
                                    onClick={downloadImage}>
                                    {downloadLoading ? (
                                        <Spinner
                                            animation="border"
                                            variant="dark"
                                            className="mr-2"
                                        />
                                    ) : (
                                        <i className="fas fa-download mr-2" />
                                    )}
                                    Download
                                </button>
                            )}
                        </div>
                        <div className="product-event-and-status">
                            <span className="name">
                                {item.userEvent && printEventNameAndDate(item)}
                            </span>
                        </div>
                        <div className="price c-red font-bold">
                            ${item.price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderItemBlock;
