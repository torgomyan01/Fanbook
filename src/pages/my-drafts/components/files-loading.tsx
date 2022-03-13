import React from 'react';
import BlockPlaceholder from 'features/block-placeholder';

function FilesLoading() {
    return (
        <div className="row mb-4 position-relative border-bottom pb-4">
            <div className="col-lg-2 col-md-4 col-sm-5">
                <BlockPlaceholder
                    width={110}
                    height={200}
                    borderRadius={5}
                    status={true}
                    count={1}
                    className="m-0 w-100"
                />
            </div>
            <div className="col-lg-10 col-md-8 col-sm-6 position-relative">
                <h1 className="c-red fs20 font-bold">
                    <BlockPlaceholder
                        width={300}
                        height={25}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0"
                    />
                </h1>
                <div className="c-gray">
                    <BlockPlaceholder
                        width="80%"
                        height={8}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0 d-block mt-1"
                    />
                    <BlockPlaceholder
                        width="75%"
                        height={8}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0 d-block mt-1"
                    />
                    <BlockPlaceholder
                        width="70%"
                        height={8}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0 d-block mt-1"
                    />
                    <BlockPlaceholder
                        width="65%"
                        height={8}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0 d-block mt-1"
                    />
                </div>
                <div className="mb-1">
                    <BlockPlaceholder
                        width={250}
                        height={16}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0 mt-1"
                    />
                </div>
                <div className="mb-1">
                    <BlockPlaceholder
                        width={210}
                        height={16}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0 mt-1"
                    />
                </div>
                <div className="mb-1">
                    <BlockPlaceholder
                        width={190}
                        height={16}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0 mt-1"
                    />
                </div>
            </div>
        </div>
    );
}

export default FilesLoading;
