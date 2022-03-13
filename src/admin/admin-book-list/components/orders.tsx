import React, { useEffect, useState } from 'react';
import { GetOrdersAdmin } from 'api/all-apis';
import moment from 'moment';
import { keyGenerator, setMessageUser, textCrop } from 'utils/helpers';
import {
    Avatar,
    Backdrop,
    CircularProgress,
    createStyles,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Theme,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { Pagination } from '@material-ui/lab';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { UM } from 'utils/user-messages';
import { useDispatch } from 'react-redux';
import MoreDetailsOrder from '../modal-details/order-modal';
import { orderFilter } from 'admin/consts';

interface Column {
    id:
        | 'User'
        | 'OrderID'
        | 'OrderStatus'
        | 'CreatedOn'
        | 'Total'
        | 'AbilityToDelete';
    label: any;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'User', label: 'User', minWidth: 200 },
    { id: 'OrderID', label: 'Order ID', minWidth: 110 },
    {
        id: 'OrderStatus',
        label: 'Order Status',
        minWidth: 100
    },
    {
        id: 'CreatedOn',
        label: 'Created on',
        minWidth: 90
    },
    {
        id: 'Total',
        label: 'Total',
        minWidth: 30
    },
    {
        id: 'AbilityToDelete',
        label: '',
        minWidth: 5
    }
];

function User(user: UserInfo) {
    const userName = `${user?.firstName || 'First Name'} ${
        user?.lastName || 'Last Name'
    }`;
    return (
        <div
            key={keyGenerator(20)}
            className="d-flex justify-content-start align-items-center">
            <Avatar
                alt={userName}
                className="mr-2"
                src={user?.avatarURL || undefined}>
                {userName[0]?.toUpperCase()}
            </Avatar>
            {userName}
        </div>
    );
}

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
            width: '100%'
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

function Orders() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [rows, setRows] = useState<any[]>([]);
    const [pageLoading, setPageLoading] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [sorting, setSorting] = useState<string>(orderFilter[0].key);

    const [moreDetails, setMoreDetails] = useState<{
        openClose: boolean;
        order: IOrder | null;
    }>({ openClose: false, order: null });

    useEffect(() => {
        GetUsers();
    }, [page, sorting]);

    /**
     * Function to search for status user
     * @param event
     */
    const changeGrouping = (event: React.ChangeEvent<{ value: unknown }>) => {
        const val = event.target.value;
        setSorting(val as string);
    };

    /**
     * Get users
     * @constructor
     */
    function GetUsers() {
        setPageLoading(true);
        const data: any = {
            'page[number]': page,
            'page[size]': 8,
            sort: '-createdAt',
            'filter[status]': sorting,
            'append[0]': 'user'
        };

        GetOrdersAdmin(data)
            .then((res) => {
                const orders = res.data?.data?.items.map((order: IOrder) =>
                    printTableInfo(order)
                );
                setRows(orders);
                setPages(res.data.data.pagination.pages);
                setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /**
     * Component for print more details button for table
     * @param order
     * @constructor
     */
    function MoreDetailsCol({ order }: { order: IOrder }) {
        function openModal() {
            setMoreDetails({
                openClose: true,
                order
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

    function PrintOrderId(id: string) {
        return (
            <Tooltip title="Copy ID" placement="top">
                <CopyToClipboard
                    text={id}
                    onCopy={() => dispatch(setMessageUser(UM.COPIED))}>
                    <span style={{ cursor: 'pointer' }}>
                        {textCrop(id, 15)}
                    </span>
                </CopyToClipboard>
            </Tooltip>
        );
    }
    /**
     * All Table user
     * @param order
     */
    function printTableInfo(order: IOrder) {
        return {
            User: User(order.user),
            OrderID: PrintOrderId(order.id),
            OrderStatus: (
                <span style={{ textTransform: 'capitalize' }}>
                    {order.status}
                </span>
            ),
            CreatedOn: moment(order.createdAt).format('lll'),
            Total: <b>${order.total}</b>,
            AbilityToDelete: <MoreDetailsCol order={order} />
        };
    }

    return (
        <>
            <div className="flex-between-box mb-3">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-select">
                        Filter Order
                    </InputLabel>
                    <Select
                        value={sorting}
                        id="grouped-select"
                        onChange={changeGrouping}>
                        {orderFilter.map((filter) => (
                            <MenuItem key={keyGenerator(20)} value={filter.key}>
                                {filter.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
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
                    <h1 className="no-result-h1">Order Not Found</h1>
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
            <MoreDetailsOrder
                modal={moreDetails}
                close={() => {
                    setMoreDetails({
                        openClose: false,
                        order: null
                    });
                }}
            />
        </>
    );
}

export default Orders;
