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

const useStyles = makeStyles(() => ({
    lists: {
        paddingLeft: 0
    }
}));

interface IThisProps {
    site: {
        icon: any;
        name: string;
        serName: string;
    };
    startRemove: any;
}

function ListSocialNetworks({ site, startRemove }: IThisProps) {
    const classes = useStyles();

    function remove() {
        startRemove(site);
    }

    return (
        <ListItem key={keyGenerator(20)} className={classes.lists}>
            <ListItemAvatar>
                <Avatar>{site.icon}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={site.name} secondary={site.serName} />
            <ListItemSecondaryAction>
                <Tooltip title="Delete" id={'test'} placement="top">
                    <i
                        className="fas fa-trash c-red cursor-pointer"
                        onClick={remove}
                    />
                </Tooltip>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default ListSocialNetworks;
