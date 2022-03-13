import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { keyGenerator } from 'utils/helpers';
import { DEF_URL } from 'utils/urls';
import ImageBlockLibraryPage from './image-block';
import { TAB_NAMES } from 'pages/create-book/settings/tab-names';
import BlockPlaceholder from 'features/block-placeholder';

interface IThisProps {
    loading: boolean;
}

function ContentSection({ loading }: IThisProps) {
    const { eventID, status }: { eventID: string; status: string } =
        useParams();

    const AllFiles = useSelector((state: ILibrary) => state.Library.AllFiles);
    const [AllImages, setAllImages] = useState<IAlbumFiles[]>([]);
    const [albumCount, SetAlbumCount] = useState<number>(0);

    useEffect(() => {
        setAllImages([]);
        let countImages = 0;
        AllFiles.map((folder: OneAlbum) => {
            folder.albumFiles.map((album: IAlbumFiles) => {
                !folder.deletedAt && countImages++;
                setAllImages((oldArray: any) => [...oldArray, album]);
            });
        });
        SetAlbumCount(countImages);
    }, [AllFiles]);

    return (
        <section className="content-section mt-3">
            <div className="container-fluid">
                <div className="row mb-4">
                    {loading ? (
                        <BlockPlaceholder
                            width={300}
                            height={246}
                            borderRadius={10}
                            status={true}
                            count={2}
                            className="m-0 ml-3"
                        />
                    ) : (
                        AllImages.slice(0, 2)?.map((image: IAlbumFiles) => {
                            return (
                                <ImageBlockLibraryPage
                                    key={keyGenerator(20)}
                                    image={image}
                                />
                            );
                        })
                    )}
                    {/*new products */}
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12 mb-xl-0 mb-2">
                        <div
                            className="content-box d-flex justify-content-center align-items-center trans"
                            style={{ width: '300px', height: '246px' }}>
                            <div className="more-fild text-center">
                                <p className="fs20 c-black f-myriadproreg">
                                    {albumCount > 2
                                        ? `+${albumCount - 2} More`
                                        : `${albumCount}`}
                                </p>
                                <Link
                                    to={`${DEF_URL.CREATE_BOOK}/${eventID}/${TAB_NAMES.DIGITAL}/${status}`}
                                    className="see-btn fs16 d-inline-block text-center f-myriadproreg trans">
                                    All
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/*new products */}
                </div>
            </div>
        </section>
    );
}

export default ContentSection;
