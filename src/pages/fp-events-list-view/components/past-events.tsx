import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Events from './event';
import {
    createStyles,
    FormControl,
    FormHelperText,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Theme
} from '@material-ui/core';
import { keyGenerator } from 'utils/helpers';
import LoadingProcessEvent from './loading-process-event';
import { AllRequestsForMyEvents } from 'api/all-apis';
import { useSelector } from 'react-redux';
import MaskedInput from 'react-text-mask';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    })
);

const dates = {
    AllDates: 'All Dates',
    LastMonth: 'Last Month',
    Last6Months: 'Last 6 Months',
    LastYear: 'Last Year'
};

function PastEvent() {
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const toDay = moment().format();
    const selectDate: string[] = [
        dates.AllDates,
        dates.LastMonth,
        dates.Last6Months,
        dates.LastYear
    ];
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [selectingDateTo, setSelectingDateTo] = useState<string | null>(
        toDay
    );
    const [selectingDateFrom, setSelectingDateFrom] = useState<string | null>(
        null
    );

    const [events, setEvents] = useState<IEvent[]>([]);
    const [loadingProcess, setLoadingProcess] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        from: 0,
        limit: 0,
        page: 0,
        pages: 0,
        to: 0,
        total: 0
    });

    useEffect(() => {
        if (userInfo) {
            setLoadingProcess(true);
            AllRequestsForMyEvents({
                'page[number]': pageNumber,
                'page[size]': 10,
                sort: '-date',
                'append[0]': 'user',
                'append[1]': 'albums',
                'append[2]': 'files',
                'filter[userId]': userInfo.id,
                'filter[date][to]': selectingDateTo,
                'filter[date][from]': selectingDateFrom
            }).then((res) => {
                setPagination(res.data.data.pagination);
                setEvents(res.data.data.items);
                setLoadingProcess(false);
            });
        }
    }, [pageNumber, selectingDateTo, selectingDateFrom, userInfo]);

    function setPageInput(e: any) {
        const pageNum = Number(e.target.value);
        pageNum <= pagination.pages && setPageNumber(pageNum);
    }

    function minusPage() {
        setPageNumber(pageNumber - 1);
    }

    function plusPage() {
        setPageNumber(pageNumber + 1);
    }

    const classes = useStyles();
    const [data, setData] = React.useState('');
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setData(event.target.value as string);
    };

    return (
        <div className="event-block pt-0">
            <div className="event-header">
                <h2 className="event-header-title fix-past-events f-omnesMedium">
                    Past Events
                </h2>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                        <i className="icon-calendar mr-2" />
                        Select Dates
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={data}
                        onChange={handleChange}>
                        {selectDate.map((dateName: string) => {
                            return (
                                <MenuItem
                                    key={keyGenerator(30)}
                                    value={dateName}>
                                    {dateName}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <FormHelperText>
                        Choose dates for easy search
                    </FormHelperText>
                </FormControl>
            </div>
            {loadingProcess ? (
                <ul className="events-list">
                    <LoadingProcessEvent />
                    <LoadingProcessEvent />
                </ul>
            ) : (
                <>
                    {events.length > 0 ? (
                        <ul className="events-list">
                            {events.map((event: IEvent) => {
                                return (
                                    <Events
                                        key={keyGenerator(30)}
                                        event={event}
                                    />
                                );
                            })}
                        </ul>
                    ) : selectingDateTo ? (
                        <p className="empty-events">
                            We couldn{"'"}t find any events on your selected
                            dates. Please try again with different dates, or use
                            the search bar above.
                        </p>
                    ) : (
                        <p className="empty-events">
                            You don{"'"}t have any Past Events
                        </p>
                    )}
                </>
            )}

            {pagination.pages > 1 && (
                <div className="events-pagination">
                    <button
                        className="btn btn-pagination"
                        onClick={minusPage}
                        disabled={pagination.page === 1}
                        id="btn-prev">
                        <i className="icon-step-arrow-left" />
                    </button>
                    <div className="events-pagination-pages">
                        <MaskedInput
                            mask={[/\d/, /\d/]}
                            placeholderChar={'\u2000'}
                            showMask
                            value={pageNumber}
                            onChange={setPageInput}
                        />
                        <p className="d-flex">
                            /
                            <span className="events-pages-number ml-2">
                                {pagination.pages}
                            </span>
                        </p>
                    </div>
                    <button
                        className="btn btn-pagination"
                        id="btn-next"
                        disabled={pagination.page >= pagination.pages}
                        onClick={plusPage}>
                        <i className="icon-step-arrow-right" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default PastEvent;
