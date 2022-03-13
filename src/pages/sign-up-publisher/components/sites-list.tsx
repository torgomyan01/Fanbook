import React from 'react';
import { keyGenerator } from 'utils/helpers';
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

interface IThisProps {
    name: string;
    remove: any;
}

const useStyles = makeStyles(() => ({
    lists: {
        paddingLeft: 0
    }
}));

function SitesList({ name, remove }: IThisProps) {
    const classes = useStyles();

    function startRemoveThisSite() {
        remove(name);
    }

    return (
        <ListItem key={keyGenerator(20)} className={classes.lists}>
            <ListItemAvatar>
                <Avatar>{name[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} />
            <ListItemSecondaryAction>
                <Tooltip title={`Delete ${name}`} id={'test'} placement="top">
                    <i
                        className="fas fa-trash c-red cursor-pointer"
                        onClick={startRemoveThisSite}
                    />
                </Tooltip>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default SitesList;
