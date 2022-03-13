import React from 'react';
import 'assets/css/admin-book-list.css';
import {
    AppBar,
    createStyles,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    makeStyles,
    Theme,
    Toolbar,
    useTheme
} from '@material-ui/core';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import { goToHome, isUserLogin, keyGenerator } from 'utils/helpers';
import MenuList from './components/menu-list';
import NavbarAdmin from './components/navbar';
import Content from './components/content';

export const MenuUrls = {
    users: 'users',
    books: 'books',
    orders: 'orders',
    transactions: 'Payment_Profiles',
    ReportsOutPayments: 'Report_And_Outpayments'
};

export const MenuAdmin = [
    {
        name: 'Users',
        url: MenuUrls.users,
        icon: <i className="far fa-user fs18 pl-2" />
    },
    // {
    //     name: 'Books',
    //     url: MenuUrls.books,
    //     icon: <i className="fas fa-book-open fs18 pl-2" />
    // },
    {
        name: 'Orders',
        url: MenuUrls.orders,
        icon: <i className="fas fa-shopping-cart fs18 pl-2" />
    },
    {
        name: 'Payment Profiles',
        url: MenuUrls.transactions,
        icon: <i className="fas fa-address-card fs18 pl-2" />
    },
    {
        name: 'Outpayments',
        url: MenuUrls.ReportsOutPayments,
        icon: <i className="fas fa-money-check-alt fs18 pl-2" />
    }
];

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: '100%'
        },
        appBar: {
            // zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            background: '#B12029',
            height: 64,
            padding: 0
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton: {
            marginRight: 36
        },
        hide: {
            display: 'none'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: 'hidden',
            width: theme.spacing(3) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1
            }
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            width: '100%'
        }
    })
);

function AdminBookList() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <>
            {isUserLogin((res: boolean) => {
                !res && goToHome();
            }) && (
                <div className={`${classes.root} admin__f`}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open
                        })}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open
                                })}>
                                <i className="fas fa-bars" />
                            </IconButton>
                            <NavbarAdmin />
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open
                            })
                        }}>
                        <div className={classes.toolbar}>
                            <IconButton
                                style={{ width: 50 }}
                                onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? (
                                    <i className="fas fa-bars" />
                                ) : (
                                    <i className="fas fa-times" />
                                )}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            {MenuAdmin.map((item) => (
                                <MenuList item={item} key={keyGenerator(20)} />
                            ))}
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Content />
                    </main>
                </div>
            )}
        </>
    );
}

export default AdminBookList;
