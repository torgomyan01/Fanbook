import React, { ChangeEvent, useEffect, useState } from 'react';
import { keyGenerator } from 'utils/helpers';
import {
    Avatar,
    Backdrop,
    CircularProgress,
    createStyles,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Theme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import moment from 'moment';
import { AdminSearchUser, GetAdminUsers } from 'api/all-apis';
import { Pagination } from '@material-ui/lab';
import MoreDetailsUser from '../modal-details/user-modal';

interface Column {
    id:
        | 'User'
        | 'Email'
        | 'Status'
        | 'Role'
        | 'Last_Login'
        | 'Date_Joined'
        | 'dropDown';
    label: any;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'User', label: 'User', minWidth: 110 },
    { id: 'Email', label: 'Email', minWidth: 200 },
    {
        id: 'Status',
        label: 'Status',
        minWidth: 100
    },
    {
        id: 'Role',
        label: 'Role',
        minWidth: 80
    },
    {
        id: 'Last_Login',
        label: 'Last Login',
        minWidth: 90
    },
    {
        id: 'Date_Joined',
        label: 'Date Joined',
        minWidth: 90
    },
    {
        id: 'dropDown',
        label: '',
        minWidth: 5
    }
];

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

export const sortingUsers = {
    all: 'All',
    active: 'Active',
    inactive: 'Inactive',
    fan: 'Fun',
    publisher: 'Publisher',
    admin: 'Admin',
    any: 'any'
};

function UsersBlockAdmin() {
    const classes = useStyles();

    const [rows, setRows] = useState<any[]>([]);
    const [pageLoading, setPageLoading] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [sorting, setSorting] = useState<string>('');

    const [forGrouping, setForGrouping] = useState<string>(sortingUsers.any);
    const [forSorting, setForSorting] = useState<string>('name');
    const [forActive, setForActive] = useState<boolean | null>(null);

    const [moreDetails, setMoreDetails] = useState<{
        openClose: boolean;
        user: UserInfoAdmin | null;
    }>({ openClose: false, user: null });

    useEffect(() => {
        GetUsers();
    }, [page, forGrouping, forSorting, forActive]);

    /**
     * Function to search for status user
     * @param event
     */
    const changeGrouping = (event: React.ChangeEvent<{ value: unknown }>) => {
        const val = event.target.value;
        setSorting(val as string);
        switch (val) {
            case sortingUsers.all.toLowerCase():
                setForGrouping(sortingUsers.all.toLowerCase());
                setForSorting('name');
                setForActive(null);
                break;
            case sortingUsers.fan.toLowerCase():
                setForGrouping(sortingUsers.fan.toLowerCase());
                setForSorting('name');
                setForActive(null);
                break;
            case sortingUsers.publisher.toLowerCase():
                setForGrouping(sortingUsers.publisher.toLowerCase());
                setForSorting('name');
                setForActive(null);
                break;
            case sortingUsers.admin.toLowerCase():
                setForGrouping(sortingUsers.admin.toLowerCase());
                setForSorting('name');
                setForActive(null);
                break;
            case sortingUsers.active.toLowerCase():
                setForSorting('name');
                setForGrouping(sortingUsers.all.toLowerCase());
                setForActive(true);
                break;
            case sortingUsers.inactive.toLowerCase():
                setForSorting('name');
                setForGrouping(sortingUsers.all.toLowerCase());
                setForActive(false);
                break;
        }
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
            sort: forSorting,
            'filter[group]': forGrouping
        };
        if (forActive !== null) {
            data['filter[isEnabled]'] = forActive;
        }

        GetAdminUsers(data).then((res) => {
            const users = res.data?.data?.items.map((user: UserInfoAdmin) =>
                printTableInfo(user)
            );
            setRows(users);
            setPages(res.data.data.pagination.pages);
            setPageLoading(false);
        });
    }

    /**
     * Component for print more details button for table
     * @param user
     * @constructor
     */
    function MoreDetailsCol({ user }: { user: UserInfoAdmin }) {
        function openModal() {
            setMoreDetails({
                openClose: true,
                user
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
     * This function printed user status
     * @param status
     * @constructor
     */
    function PrintStatus(status: boolean) {
        return (
            <div className="d-flex justify-content-start align-items-center">
                <div
                    className={`bound-for-status ${
                        status ? 'publish' : 'draft'
                    }`}
                />
                {status ? 'Active' : 'Inactive'}
            </div>
        );
    }

    /**
     * Printed User Roll
     * @param user
     * @constructor
     */
    function PrintRollUser(user: UserInfoAdmin) {
        return user.groups.length === 0
            ? 'FAN'
            : user.groups.toString().toUpperCase();
    }

    /**
     * All Table user
     * @param user
     */
    function printTableInfo(user: UserInfoAdmin) {
        return {
            User: User(user),
            Email: user.email,
            Status: PrintStatus(user.isEnabled),
            Role: PrintRollUser(user),
            Last_Login: user.lastLoginAt
                ? moment(user.lastLoginAt).format('lll')
                : '------',
            Date_Joined: user.createdAt
                ? moment(user.createdAt).format('lll')
                : '------',
            dropDown: <MoreDetailsCol user={user} />
        };
    }

    function userDelete() {
        setMoreDetails({
            openClose: false,
            user: null
        });
        GetUsers();
    }

    const [searchVal, setSearchVal] = useState<string>('');

    /**
     * For search user
     * @param e
     */
    function goSearchUser(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setPageLoading(true);
        setPages(0);
        AdminSearchUser({
            q: searchVal,
            'page[number]': 1,
            'page[size]': 100,
            sort: forSorting,
            'filter[group]': forGrouping
        })
            .then((res) => {
                const users = res.data?.data?.items.map((user: UserInfoAdmin) =>
                    printTableInfo(user)
                );
                setRows(users);
                setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="flex-between-box mb-3">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-select">
                        Filter Users By
                    </InputLabel>
                    <Select
                        value={sorting}
                        id="grouped-select"
                        onChange={changeGrouping}>
                        <MenuItem value={sortingUsers.all.toLowerCase()}>
                            {sortingUsers.all}
                        </MenuItem>
                        <MenuItem value={sortingUsers.active.toLowerCase()}>
                            {sortingUsers.active}
                        </MenuItem>
                        <MenuItem value={sortingUsers.inactive.toLowerCase()}>
                            {sortingUsers.inactive}
                        </MenuItem>
                        <MenuItem value={sortingUsers.fan.toLowerCase()}>
                            {sortingUsers.fan}
                        </MenuItem>
                        <MenuItem value={sortingUsers.publisher.toLowerCase()}>
                            {sortingUsers.publisher}
                        </MenuItem>
                        <MenuItem value={sortingUsers.admin.toLowerCase()}>
                            {sortingUsers.admin}
                        </MenuItem>
                    </Select>
                </FormControl>
                <form
                    action="#"
                    className="d-flex justify-content-end align-items-end"
                    onSubmit={goSearchUser}>
                    <TextField
                        label="Search User"
                        placeholder="e.g. 2019 Challenge"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fas fa-search c-red" />
                                </InputAdornment>
                            )
                        }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSearchVal(e.target.value)
                        }
                    />
                    <button className="btn btn-danger bgc-red border-0 ml-2">
                        Go
                    </button>
                </form>
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
                    <h1 className="no-result-h1">User Not Found</h1>
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
            <MoreDetailsUser
                modal={moreDetails}
                close={() => {
                    setMoreDetails({
                        openClose: false,
                        user: null
                    });
                }}
                userDeleted={userDelete}
            />
        </>
    );
}

export default UsersBlockAdmin;
