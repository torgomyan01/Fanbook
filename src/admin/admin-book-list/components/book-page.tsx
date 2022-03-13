import React, { ChangeEvent, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { GetAdminBook } from 'api/all-apis';
import moment from 'moment';
import {
    Avatar,
    Backdrop,
    CircularProgress,
    createStyles,
    FormControl,
    InputAdornment,
    InputLabel,
    ListSubheader,
    MenuItem,
    Select,
    TextField,
    Theme
} from '@material-ui/core';
import { keyGenerator, productTypes } from 'utils/helpers';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MoreDetailsBook from '../modal-details/book-modal';

interface Column {
    id:
        | 'BookName'
        | 'User'
        | 'Status'
        | 'Processed_on'
        | 'Created_on'
        | 'Last_Modified_on'
        | 'dropDown';
    label: any;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'BookName', label: 'Book Name', minWidth: 170 },
    { id: 'User', label: 'User', minWidth: 200 },
    {
        id: 'Status',
        label: 'Status',
        minWidth: 100
    },
    {
        id: 'Processed_on',
        label: 'Processed on',
        minWidth: 200
    },
    {
        id: 'Created_on',
        label: 'Created on',
        minWidth: 200
    },
    {
        id: 'Last_Modified_on',
        label: 'Last Modified on',
        minWidth: 200
    },
    {
        id: 'dropDown',
        label: 'View Details',
        minWidth: 50,
        align: 'right'
    }
];

export const BookUsers = (book: IBookInfo) => {
    const avatar = book.user.avatarURL ? book.user.avatarURL : '';
    return (
        <div
            key={keyGenerator(20)}
            className="d-flex justify-content-start align-items-center">
            <Avatar alt={book.user.firstName} className="mr-2" src={avatar}>
                {!book.user.avatarURL &&
                    book.user.firstName[0].toLocaleUpperCase()}
            </Avatar>
            {book.user.firstName}
        </div>
    );
};

export const PrintData = (data: string) => {
    return moment(data).format('MMM Do YYYY, h:mm a');
};

function PrintStatus(status: string) {
    return (
        <div
            key={keyGenerator(20)}
            className="d-flex justify-content-start align-items-center">
            <div className={`bound-for-status ${status}`} />
            {status}
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
            maxHeight: 500
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff'
        }
    })
);

export const sortingBook = {
    all: 'All',
    draft: 'Draft',
    publish: 'Publish',
    fans: 'Fans',
    publisher: 'Publisher'
};

function MoreDetails() {
    return (
        <div className="d-flex align-items-center justify-content-end">
            <i className="fas fa-external-link-alt mr-2 cursor-pointer" />
            <Dropdown>
                <Dropdown.Toggle
                    variant="link"
                    className="text-decoration-none">
                    <i className="fas fa-ellipsis-v c-black" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                        Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        Something else
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

const filterTypes = {
    status: 'status',
    created: 'created'
};

function BookPageAdmin() {
    const classes = useStyles();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [rows, setRows] = useState<any[]>([]);
    const [allBooks, setAllBooks] = useState<IBookInfo[]>([]);

    const [pageLoading, setPageLoading] = useState<boolean>(false);
    const [moreDetails, setMoreDetails] = useState<{
        openClose: boolean;
        book: IBookInfo | null;
    }>({
        openClose: false,
        book: null
    });

    function MoreDetailsCol({ data, book }: { data: string; book: IBookInfo }) {
        function openModal() {
            setMoreDetails({ openClose: true, book });
        }
        return (
            <div className="position-relative">
                {PrintData(data)}
                <span className="more-details-btn" onClick={openModal}>
                    More Details
                </span>
            </div>
        );
    }

    function printTableInfo(book: IBookInfo) {
        return {
            BookName: book.name,
            User: BookUsers(book),
            Status: PrintStatus(book.status),
            Processed_on: PrintData(book.createdAt),
            Created_on: PrintData(book.createdAt),
            Last_Modified_on: (
                <MoreDetailsCol data={book.updatedAt} book={book} />
            ),
            dropDown: <MoreDetails />
        };
    }

    useEffect(() => {
        setPageLoading(true);

        GetAdminBook({
            'page[number]': '1',
            'page[size]': '100',
            'append[0]': 'user',
            'append[1]': 'userEvent'
        })
            .then((res) => {
                const books = res.data.data.items;
                const bookInfo = books.map((book: IBookInfo) =>
                    printTableInfo(book)
                );
                setRows(bookInfo);
                setAllBooks(books);
                setPageLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userInfo]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [sorting, setSorting] = React.useState('');

    const changeGrouping = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSorting(event.target.value as string);
    };

    function filterProductsForStatus(filterName: string, type: string) {
        return allBooks
            .filter((book: IBookInfo) => {
                if (type === filterTypes.created) {
                    return book.type === filterName;
                } else if (type === filterTypes.status) {
                    return book.status === filterName;
                }
            })
            .map((book: IBookInfo) => printTableInfo(book));
    }

    useEffect(() => {
        switch (sorting) {
            case sortingBook.publish.toLowerCase():
                setRows(
                    filterProductsForStatus(
                        sortingBook.publish.toLowerCase(),
                        filterTypes.status
                    )
                );
                break;
            case sortingBook.draft.toLowerCase():
                setRows(
                    filterProductsForStatus(
                        sortingBook.draft.toLowerCase(),
                        filterTypes.status
                    )
                );
                break;
            case sortingBook.fans.toLowerCase():
                setRows(
                    filterProductsForStatus(
                        productTypes.user,
                        filterTypes.created
                    )
                );
                break;
            case sortingBook.publisher.toLowerCase():
                setRows(
                    filterProductsForStatus(
                        productTypes.official,
                        filterTypes.created
                    )
                );
                break;
            default:
                addAllToTable();
                break;
        }
    }, [sorting]);

    function searchProduct(e: ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        if (val !== '') {
            const searchingFilter = allBooks
                .filter((book: IBookInfo) =>
                    book.name.toLowerCase().includes(val.toLowerCase())
                )
                .map((book: IBookInfo) => printTableInfo(book));
            setRows(searchingFilter);
        } else {
            addAllToTable();
        }
    }

    function addAllToTable() {
        setRows(allBooks.map((book: IBookInfo) => printTableInfo(book)));
    }

    return (
        <>
            <div className="flex-between-box mb-3">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-select">
                        Sorting Books
                    </InputLabel>
                    <Select
                        value={sorting}
                        id="grouped-select"
                        onChange={changeGrouping}>
                        <MenuItem value={sortingBook.all.toLowerCase()}>
                            {sortingBook.all}
                        </MenuItem>
                        <ListSubheader>Status</ListSubheader>
                        <MenuItem value={sortingBook.draft.toLowerCase()}>
                            {sortingBook.draft}
                        </MenuItem>
                        <MenuItem value={sortingBook.publish.toLowerCase()}>
                            {sortingBook.publish}
                        </MenuItem>
                        <ListSubheader>Created By</ListSubheader>
                        <MenuItem value={sortingBook.fans.toLowerCase()}>
                            {sortingBook.fans}
                        </MenuItem>
                        <MenuItem value={sortingBook.publisher.toLowerCase()}>
                            {sortingBook.publisher}
                        </MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Search Book"
                    placeholder="e.g. 2019 Challenge"
                    onChange={searchProduct}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <i className="fas fa-search c-red" />
                            </InputAdornment>
                        )
                    }}
                />
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
                            {rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
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
                                                        typeof value ===
                                                            'number'
                                                            ? column.format(
                                                                  value
                                                              )
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
                <TablePagination
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <MoreDetailsBook
                    modal={moreDetails}
                    close={() =>
                        setMoreDetails({ openClose: false, book: null })
                    }
                />
                <Backdrop className={classes.backdrop} open={pageLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Paper>
        </>
    );
}

export default BookPageAdmin;
