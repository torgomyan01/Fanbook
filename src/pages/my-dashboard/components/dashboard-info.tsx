import React from 'react';
import { useSelector } from 'react-redux';
import BlockPlaceholder from 'features/block-placeholder';

function DashboardInfo() {
    const dashboardInfo = useSelector(
        (state: IMyDashboard) => state.MyDashboard.information
    );

    const loading = useSelector(
        (state: IMyDashboard) => state.MyDashboard.loading
    );

    return (
        <div className="report-box-proj report-box box">
            <ul className="report-list">
                <li className="report-item">
                    <span className="fs50 d-block mb-3">
                        {loading ? (
                            <BlockPlaceholder
                                width={50}
                                height={30}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0"
                            />
                        ) : (
                            dashboardInfo.ordersCount
                        )}
                    </span>
                    <span className="fs24 d-block f-omnesMedium">Orders</span>
                </li>
                <li className="report-item">
                    <span className="fs50 d-block mb-3">
                        {loading ? (
                            <BlockPlaceholder
                                width={50}
                                height={30}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0"
                            />
                        ) : (
                            <>${dashboardInfo.earned}</>
                        )}
                    </span>
                    <span className="fs24 d-block f-omnesMedium">Earned</span>
                </li>
                <li className="report-item">
                    <span className="fs50 d-block mb-3">
                        {loading ? (
                            <BlockPlaceholder
                                width={50}
                                height={30}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0"
                            />
                        ) : (
                            dashboardInfo.photosCount
                        )}
                    </span>
                    <span className="fs24 d-block f-omnesMedium">
                        Photos Uploaded
                    </span>
                </li>
            </ul>
            {/*{!this.publisher && (*/}
            {/*    <div className="text-right">*/}
            {/*        <Link to="#" className="fs21 c-red f-myriadproreg">*/}
            {/*            View Full Report*/}
            {/*            <FontAwesomeIcon*/}
            {/*                icon={faChevronRight}*/}
            {/*                className="ml-2"*/}
            {/*            />*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}

export default DashboardInfo;
