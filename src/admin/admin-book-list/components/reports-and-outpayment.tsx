import React, { useEffect, useState } from 'react';
import { GetTransactionsAdmin } from 'api/all-apis';
import {
    Avatar,
    Backdrop,
    CircularProgress,
    createStyles,
    Theme
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { keyGenerator } from 'utils/helpers';
import { Pagination } from '@material-ui/lab';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import MoreDetailsReportOutPayments from '../modal-details/report-outpayments-modal';

interface Column {
    id:
        | 'Publishers'
        | 'DateOfTransaction'
        | 'EarnedMoney'
        | 'TransactionStatus'
        | 'dropDown';
    label: any;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'Publishers', label: 'Publishers', minWidth: 110 },
    { id: 'DateOfTransaction', label: 'Date of Transaction', minWidth: 200 },
    { id: 'EarnedMoney', label: 'Earned Money', minWidth: 80 },
    {
        id: 'TransactionStatus',
        label: 'Transaction Status',
        minWidth: 100
    },
    {
        id: 'dropDown',
        label: '',
        minWidth: 5
    }
];
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 150
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        },
        root: {
            width: '100%',
            marginTop: 40
        },
        container: {
            maxHeight: 700
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff'
        }
    })
);

function ReportsOutPayments() {
    const classes = useStyles();

    const [rows, setRows] = useState<any[]>([]);
    const [pageLoading, setPageLoading] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const [moreDetails, setMoreDetails] = useState<{
        openClose: boolean;
        trans: ITransaction | null;
    }>({ openClose: false, trans: null });

    useEffect(() => {
        GetUsers();
    }, [page]);

    /**
     * Get users
     * @constructor
     */
    function GetUsers() {
        setPageLoading(true);
        const data: any = {
            'page[number]': page,
            'page[size]': 10,
            sort: '-createdAt',
            'filter[type]': 'out'
        };

        GetTransactionsAdmin(data)
            .then((res) => {
                const OutTransaction = res.data?.data?.items.map(
                    (transaction: ITransaction) => printTableInfo(transaction)
                );
                setRows(OutTransaction);
                setPages(res.data.data.pagination.pages);
                setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /**
     * Component for print more details button for table
     * @param trans
     * @constructor
     */
    function MoreDetailsCol({ trans }: { trans: ITransaction }) {
        function openModal() {
            setMoreDetails({
                openClose: true,
                trans
            });
        }
        return (
            <div className="d-flex justify-content-between align-items-center">
                <div className="position-relative">
                    <span className="more-details-btn" onClick={openModal}>
                        More Details
                    </span>
                </div>
            </div>
        );
    }

    /**
     * All Table user
     * @param trans
     */
    function printTableInfo(trans: ITransaction) {
        return {
            Publishers: 'Andranik Torgomyan',
            DateOfTransaction: moment(trans.createdAt).format('lll'),
            EarnedMoney: <b>${trans.total}</b>,
            TransactionStatus: trans.status,
            dropDown: <MoreDetailsCol trans={trans} />
        };
    }

    function User(user: UserInfoAdmin) {
        return (
            <div
                key={keyGenerator(20)}
                className="d-flex justify-content-start align-items-center">
                <Avatar
                    alt={user.firstName || ''}
                    className="mr-2"
                    src={user.avatarURL ? user.avatarURL : ''}>
                    {!user.avatarURL && user.firstName
                        ? user.firstName[0]?.toLocaleUpperCase()
                        : "'_'"}
                </Avatar>
                {user.firstName || 'No Name'}
            </div>
        );
    }

    const closeModalMoreDetails = () => {
        setMoreDetails({
            openClose: false,
            trans: null
        });
    };

    return (
        <>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            background: '#b12029',
                                            color: '#fff'
                                        }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={keyGenerator(20)}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}>
                                                    {column.format &&
                                                    typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {rows.length === 0 && (
                    <h1 className="no-result-h1">Transactions Not Found</h1>
                )}
                <div className="mt-4 d-flex justify-content-end">
                    <Pagination
                        count={pages}
                        variant="outlined"
                        color="primary"
                        className="pagination-admin"
                        onChange={(e: any, page: number) => setPage(page)}
                    />
                </div>
                <Backdrop className={classes.backdrop} open={pageLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Paper>
            <MoreDetailsReportOutPayments
                modal={moreDetails}
                close={closeModalMoreDetails}
            />
        </>
    );
}

export default ReportsOutPayments;
